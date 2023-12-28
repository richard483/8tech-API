import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Contract } from '@prisma/client';

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
  async get(id: any): Promise<Contract> {
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

  async updatePaymentId(id: string, paymentId: string): Promise<any> {
    return this.prisma.contract.update({
      where: {
        id,
      },
      data: {
        paymentId,
      },
    });
  }
}
