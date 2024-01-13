import { PaymentRequest } from 'xendit-node/payment_request/models';
import { PayoutStatusEnum } from 'xendit-node/payout/models';

export interface IPayoutLinkData {
  id: string;
  external_id: string;
  amount: number;
  merchant_name: string;
  status: PayoutStatusEnum;
  expiration_timestamp: Date;
  created: Date;
  email: string;
  payout_url: string;
}

export interface IPaymentData {
  id: string;
  xenditPaymentRequest: PaymentRequest;
}
