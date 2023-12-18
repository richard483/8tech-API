import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Xendit, XenditSdkError } from 'xendit-node';
import axios from 'axios';
import { randomUUID } from 'crypto';
import { PaymentRequestCreateDto } from './dto/payment-request-create.dto';
import { PayoutLinkCreateDto } from './dto/payout-link-create.dto';
import { IPayoutLinkData } from './interface/payment.interface';

@Injectable()
export class PaymentService {
  private xenditClient: Xendit;
  constructor() {
    this.xenditClient = new Xendit({
      secretKey: process.env.XENDIT_SECRET_KEY,
    });
  }

  async createPaymentRequest(
    paymentRequset: PaymentRequestCreateDto,
    contractId?: string,
  ): Promise<any> {
    return await this.xenditClient.PaymentRequest.createPaymentRequest({
      data: {
        currency: 'IDR',
        amount: paymentRequset.amount,
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
      console.log('#createPaymentRequest error caused by: ', err.errorMessage);
      throw new HttpException(
        { payment: err.rawResponse.message },
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async createPayoutLink(
    payoutRequest: PayoutLinkCreateDto,
    contractId?: string,
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
        console.log('#createPayoutLink error caused by: ', err);
        throw new HttpException({ payment: err }, HttpStatus.BAD_REQUEST);
      });

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
}
