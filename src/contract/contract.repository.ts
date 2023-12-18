import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IContract } from './interface/contract.interface';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class ContractRepository {
  public model;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.contract;
  }

  async create(contract: any): Promise<any> {
    return this.prisma.contract.create({
      data: contract,
    });
  }
  async get(id: any): Promise<IContract> {
    return this.prisma.contract.findUnique({
      where: {
        id,
      },
    });
  }
  async getWithUser(id: any): Promise<any> {
    return this.prisma.contract.findUnique({
      where: {
        id,
      },
      include: {
        User: true,
      },
    });
  }
  async updatePaymentRequestId(
    id: string,
    paymentRequestId: string,
  ): Promise<IContract> {
    return this.prisma.contract.update({
      where: {
        id,
      },
      data: {
        paymentRequestId,
      },
    });
  }
  async updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus,
  ): Promise<IContract> {
    return this.prisma.contract.update({
      where: {
        id,
      },
      data: {
        paymentStatus,
      },
    });
  }

  async updatePayoutLinkId(
    id: string,
    payoutLinkId: string,
  ): Promise<IContract> {
    return this.prisma.contract.update({
      where: {
        id,
      },
      data: {
        payoutLinkId,
      },
    });
  }
}
