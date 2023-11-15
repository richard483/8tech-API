import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IContract } from './interface/contract.interface';

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
}
