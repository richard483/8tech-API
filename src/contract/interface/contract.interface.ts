import { ContractStatus, PaymentStatus } from '@prisma/client';

export interface IContract {
  id: string;
  userId: string;
  jobId: string;
  title: string;
  description: string;
  template: string;
  paymentRate: number;
  paymentRequestId?: string;
  paymentStatus: string | PaymentStatus;
  payoutLinkId?: string;
  status: string | ContractStatus;
  createdAt: Date;
  updatedAt: Date;
}

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
