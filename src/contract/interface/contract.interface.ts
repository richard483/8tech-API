export interface IContractPaymentRequest {
  paymentUrl: string;
  paymentMethod: string;
}

export interface IContractPayoutLink {
  amount: number;
  expiration: Date;
  email: string;
  payoutUrl: string;
}
