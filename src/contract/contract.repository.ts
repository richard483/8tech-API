import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
