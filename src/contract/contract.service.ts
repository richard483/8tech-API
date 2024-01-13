import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ContractRepository } from './contract.repository';
import {
  IContract,
  IContractPaymentRequest,
  IContractPayoutLink,
} from './interface/contract.interface';
import { ContractHelper } from './contract.helper';
import { join } from 'path';
import { PaymentService } from '../payment/payment.service';
import {
  EWalletChannelCode,
  PaymentRequestStatus,
} from 'xendit-node/payment_request/models';
import { PaymentStatus } from '@prisma/client';
import Xendit, { XenditSdkError } from 'xendit-node';
import { IPayoutLinkData } from '../payment/interface/payment.interface';
@Injectable()
export class ContractService {
  private xenditClient: Xendit;

  constructor(
    private contractRepository: ContractRepository,
    private contractHelper: ContractHelper,
    private paymentService: PaymentService,
  ) {
    this.xenditClient = new Xendit({
      secretKey: process.env.XENDIT_SECRET_KEY,
    });
  }

  //#region Contract
  //Create Contract
  async create(user: any): Promise<IContract> {
    return this.contractRepository.create(user);
  }

  async generate(contractId) {
    try {
      await this.contractHelper.createPdf(
        await this.contractRepository.get(contractId),
      );
      console.log('#generate success');
    } catch (error) {
      console.log('#generate error caused by: ', error);
    }
  }

  //GetAll Contract by userId
  async getAllbyUserId(userId : string): Promise<IContract[]> {
    return await this.contractRepository.getAllbyUserId(userId);
  }

  //GetAll Contract by jobId
  async getAllbyJobId(jobId : string): Promise<IContract[]> {
    return await this.contractRepository.getAllbyJobId(jobId);
  }

  //Get Contract by contractId
  async getContractbyId(id : string): Promise<IContract>{
    return await this.contractRepository.get(id);
  }

  //Update Contract

  //#endregion

  //#region Payment
  //Create Payment Request
  async createPaymentRequest(
    contractId: string,
    ewalletChannelCode: EWalletChannelCode,
  ): Promise<IContractPaymentRequest> {
    const contract = await this.contractRepository.get(contractId);
    if (!contract) {
      throw new HttpException(
        { payment: 'CONTRACT_NOT_FOUND' },
        HttpStatus.NOT_FOUND,
      );
    }
    if (contract.paymentStatus === PaymentStatus.PAID) {
      throw new HttpException(
        { payment: 'ALREADY_PAID' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const paymentRequest = await this.paymentService.createPaymentRequest(
      {
        amount: contract.paymentRate,
        ewalletChannelCode: ewalletChannelCode,
      },
      contractId,
    );

    await this.contractRepository.updatePaymentRequestId(
      contractId,
      paymentRequest.id,
    );

    return {
      paymentUrl: paymentRequest.actions[0].url,
      paymentMethod: ewalletChannelCode.toString(),
    };
  }

  //Create Payout by contractId
  async createPayout(contractId: string): Promise<IContractPayoutLink> {
    const contract = await this.contractRepository.getWithUser(contractId);
    if (!contract) {
      throw new HttpException(
        { payment: 'CONTRACT_NOT_FOUND' },
        HttpStatus.NOT_FOUND,
      );
    }
    if (contract.payoutLinkId) {
      const payout: IPayoutLinkData = await this.paymentService.getPayoutLink(
        contract.payoutLinkId,
      );
      if (['PENDING', 'COMPLETED'].includes(payout.status)) {
        throw new HttpException(
          { payment: 'ALREADY_PAID' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (contract.paymentStatus !== PaymentStatus.PAID) {
      throw new HttpException(
        { payment: 'PAYMENT_NOT_COMPLETED' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const payoutLink: IPayoutLinkData =
      await this.paymentService.createPayoutLink(
        {
          amount: contract.paymentRate,
          email: contract.User.email,
        },
        contractId,
      );

    await this.contractRepository.updatePayoutLinkId(contractId, payoutLink.id);

    return {
      amount: payoutLink.amount,
      payoutUrl: payoutLink.payout_url,
      email: payoutLink.email,
      expiration: payoutLink.expiration_timestamp,
    };
  }

  //Update Payment Status by contractId
  async updatePaymentStatusSuccess(contractId: string) {
    try {
      const contract = await this.contractRepository.get(contractId);
      console.log('#updatePaymentStatusSuccess contract: ', contract);

      if (contract == null) {
        throw new HttpException({ payment: 'NOT_FOUND' }, HttpStatus.NOT_FOUND);
      }

      const paymentRequest =
        await this.xenditClient.PaymentRequest.getPaymentRequestByID({
          paymentRequestId: contract.paymentRequestId,
        });

      if (paymentRequest.status !== PaymentRequestStatus.Succeeded) {
        throw new HttpException(
          { payment: 'NOT_COMPLETED_YET' },
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.contractRepository.updatePaymentStatus(
        contractId,
        PaymentStatus.PAID,
      );
      return;
    } catch (error) {
      if (error instanceof XenditSdkError) {
        throw new HttpException(
          { payment: 'INVALID_PAYMENT_REQUEST' },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw error;
    }
  }
  //#endregion

  //#region File
  //Remove File by fileName
  removeFile(fileName) {
    this.contractHelper.removeFile(
      join(process.cwd(), '/src/contract/temp/', `${fileName}.pdf`),
    );
  }
  //#endregion
}
