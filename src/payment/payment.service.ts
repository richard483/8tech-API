import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Xendit, XenditSdkError } from 'xendit-node';
import axios from 'axios';
import { randomUUID } from 'crypto';
import { PaymentRequestCreateDto } from './dto/payment-request-create.dto';
import { PayoutLinkCreateDto } from './dto/payout-link-create.dto';
import { IPaymentData, IPayoutLinkData } from './interface/payment.interface';
import { PaymentRequest } from 'xendit-node/payment_request/models';
import { PaymentRepository } from './payment.repository';
import { Payment, PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
  private xenditClient: Xendit;
  constructor(private paymentRepository: PaymentRepository) {
    this.xenditClient = new Xendit({
      secretKey: process.env.XENDIT_SECRET_KEY,
    });
  }

  async createPaymentRequest(
    paymentRequset: PaymentRequestCreateDto,
    contractId?: string,
  ): Promise<IPaymentData> {
    const totalAmount: number = Math.ceil(
      (100 + Number(`${process.env.BIAYA_APLIKASI}`)) *
        (paymentRequset.amount / 100),
    );
    const xenditPaymentRequest: PaymentRequest =
      await this.xenditClient.PaymentRequest.createPaymentRequest({
        data: {
          currency: 'IDR',
          amount: totalAmount,
          paymentMethod: {
            type: 'EWALLET',
            reusability: 'ONE_TIME_USE',
            ewallet: {
              channelCode: paymentRequset.ewalletChannelCode,
              channelProperties: {
                successReturnUrl: `${process.env.BACK_END_URL}/contract/payment-success/${contractId}`,
              },
            },
          },
        },
      }).catch((err: XenditSdkError) => {
        console.log(
          '#createPaymentRequest error caused by: ',
          err.errorMessage,
        );
        throw new HttpException(
          { payment: err.rawResponse.message },
          HttpStatus.BAD_REQUEST,
        );
      });
    const payment = await this.paymentRepository.create({
      paymentRequestId: xenditPaymentRequest.id,
    });

    return {
      id: payment.id,
      xenditPaymentRequest,
    };
  }

  async createPayoutLink(
    payoutRequest: PayoutLinkCreateDto,
    contractId?: string,
    paymentId?: string,
  ): Promise<IPayoutLinkData> {
    const payoutLinkResponse = await axios
      .post(
        `${process.env.XENDIT_URL}/payouts`,
        JSON.stringify({
          external_id: contractId || randomUUID(),
          amount: payoutRequest.amount,
          email: payoutRequest.email,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${process.env.XENDIT_AUTH}`,
            'Accept-Encoding': 'gzip, deflate, br',
          },
        },
      )
      .catch((err: any) => {
        console.log('#createPayoutLink error caused by: ', err.response.data);
        throw new HttpException(
          { payment: err.response.data },
          HttpStatus.BAD_REQUEST,
        );
      });

    if (paymentId) {
      await this.updatePayoutLink(paymentId, payoutLinkResponse.data.id);
    }

    return payoutLinkResponse.data;
  }

  async getPayoutLink(payoutLinkId: string): Promise<IPayoutLinkData> {
    const payoutLinkResponse = await axios
      .get(`${process.env.XENDIT_URL}/payouts/${payoutLinkId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.XENDIT_AUTH}`,
          'Accept-Encoding': 'gzip, deflate, br',
        },
      })
      .catch((err: any) => {
        console.log('#getPayoutLink error caused by: ', err);
        throw new HttpException({ payment: err }, HttpStatus.BAD_REQUEST);
      });

    return payoutLinkResponse.data;
  }

  async updatePaymentRequestId(
    id: string,
    paymentRequestId: string,
  ): Promise<Payment> {
    const payment = await this.paymentRepository.getById(id);
    if (!payment) {
      throw new HttpException(
        { payment: 'PAYMENT_NOT_FOUND' },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.paymentRepository.updatePaymentRequestId(
      id,
      paymentRequestId,
    );
  }

  async updatePayoutLink(
    paymentId: string,
    payoutLinkId: string,
  ): Promise<Payment> {
    const payment = await this.paymentRepository.getById(paymentId);
    if (!payment) {
      throw new HttpException(
        { payment: 'PAYMENT_NOT_FOUND' },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.paymentRepository.updatePayoutLinkId(
      paymentId,
      payoutLinkId,
    );
  }

  async getPaymentById(paymentId: string): Promise<Payment> {
    const payment = await this.paymentRepository.getById(paymentId);
    if (!payment) {
      throw new HttpException(
        { payment: 'PAYMENT_NOT_FOUND' },
        HttpStatus.NOT_FOUND,
      );
    }
    return payment;
  }

  async updatePaymentStatus(
    paymentId: string,
    status: PaymentStatus,
  ): Promise<void> {
    await this.paymentRepository.updatePaymentStatus(paymentId, status);
  }
}
