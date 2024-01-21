import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ContractRepository } from './contract.repository';
import {
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
import { Contract, Payment, PaymentStatus } from '@prisma/client';
import Xendit, { XenditSdkError } from 'xendit-node';
import {
  IPaymentData,
  IPayoutLinkData,
} from '../payment/interface/payment.interface';
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
  async create(data: any): Promise<Contract> {
    return this.contractRepository.create(data);
  }

  async update(id: string, data: any): Promise<Contract> {
    return this.contractRepository.update(id, data);
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
  async getAllbyUserId(userId: string): Promise<Contract[]> {
    return await this.contractRepository.getAllbyUserId(userId);
  }

  //GetAll Contract by jobId
  async getAllbyJobId(jobId: string): Promise<Contract[]> {
    return await this.contractRepository.getAllbyJobId(jobId);
  }

  //Get Contract by contractId
  async getContractbyId(id: string): Promise<Contract> {
    return await this.contractRepository.get(id);
  }

  async getContractByCompanyId(
    companyId: string,
    page: number,
    size: number,
  ): Promise<any> {
    return await this.contractRepository.getContractListByCompanyId(
      companyId,
      page,
      size,
    );
  }

  //Update Contract

  //#endregion

  //#region Payment
  //Create Payment Request
  async createPaymentRequest(
    contractId: string,
    ewalletChannelCode: EWalletChannelCode,
  ): Promise<IContractPaymentRequest> {
    const contract: Contract = await this.contractRepository.get(contractId);
    if (!contract) {
      throw new HttpException(
        { payment: 'CONTRACT_NOT_FOUND' },
        HttpStatus.NOT_FOUND,
      );
    }
    if (contract.paymentId) {
      const payment: Payment = await this.paymentService.getPaymentById(
        contract.paymentId,
      );
      if (payment.paymentStatus === PaymentStatus.PAID) {
        throw new HttpException(
          { payment: 'ALREADY_PAID' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const paymentData: IPaymentData =
      await this.paymentService.createPaymentRequest(
        {
          amount: contract.paymentRate,
          ewalletChannelCode: ewalletChannelCode,
        },
        contractId,
      );

    await this.contractRepository.updatePaymentId(contract.id, paymentData.id);

    return {
      paymentUrl: paymentData.xenditPaymentRequest.actions[0].url,
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
    const payment = await this.paymentService.getPaymentById(
      contract.paymentId,
    );
    if (!payment) {
      throw new HttpException(
        { payment: 'PAYMENT_NOT_FOUND' },
        HttpStatus.NOT_FOUND,
      );
    }

    if (payment.payoutLinkId) {
      const payout: IPayoutLinkData = await this.paymentService.getPayoutLink(
        payment.payoutLinkId,
      );
      if (['PENDING', 'COMPLETED'].includes(payout.status)) {
        throw new HttpException(
          { payment: 'ALREADY_PAID' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (payment.paymentStatus !== PaymentStatus.PAID) {
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
        contract.paymentId,
      );

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
      const contract: Contract = await this.contractRepository.get(contractId);
      console.log('#updatePaymentStatusSuccess contract: ', contract);

      if (contract == null) {
        throw new HttpException({ payment: 'NOT_FOUND' }, HttpStatus.NOT_FOUND);
      }

      const payment: Payment = await this.paymentService.getPaymentById(
        contract.paymentId,
      );

      if (payment == null) {
        throw new HttpException({ payment: 'NOT_FOUND' }, HttpStatus.NOT_FOUND);
      }

      const paymentRequest =
        await this.xenditClient.PaymentRequest.getPaymentRequestByID({
          paymentRequestId: payment.paymentRequestId,
        });

      if (paymentRequest.status !== PaymentRequestStatus.Succeeded) {
        throw new HttpException(
          { payment: 'NOT_COMPLETED_YET' },
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.paymentService.updatePaymentStatus(
        payment.id,
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
