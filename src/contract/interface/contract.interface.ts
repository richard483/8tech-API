import { Bank } from '../enum/bank.enum';
import { ContractStatus } from '../enum/contract-status.enum';

export interface IContract {
  id: string;
  userId: string;
  jobId: string;
  title: string;
  description: string;
  template: string;
  paymentRate: number;
  bankName?: string | Bank;
  bankAccountName?: string;
  bankAccountNumber?: number;
  status: string | ContractStatus;
  createdAt: Date;
  updatedAt: Date;
}
