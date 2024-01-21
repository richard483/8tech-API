import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { pagination, returnablePaginated } from '../prisma/prisma.util';
import { PrismaService } from '../prisma/prisma.service';
import { Contract } from '@prisma/client';

@Injectable()
export class ContractRepository {
  public model;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.contract;
  }

  async create(contract: any): Promise<Contract> {
    return this.prisma.contract.create({
      data: contract,
    });
  }

  async update(id: string, contract: any): Promise<Contract> {
    return this.prisma.contract.update({
      data: contract,
      where: {
        id,
      },
    });
  }

  async getAllbyUserId(userId: string): Promise<Contract[]> {
    return this.prisma.contract.findMany({
      where: {
        userId,
      },
    });
  }

  async getAllbyJobId(jobId: string): Promise<Contract[]> {
    return this.prisma.contract.findMany({
      where: {
        jobId,
      },
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
        user: true,
      },
    });
  }

  async updatePaymentId(id: string, paymentId: string): Promise<Contract> {
    return this.prisma.contract.update({
      where: {
        id,
      },
      data: {
        paymentId,
      },
    });
  }

  async delete(id: any): Promise<Contract> {
    return this.prisma.contract.delete({
      where: {
        id,
      },
    });
  }

  async getContractListByCompanyId(
    companyId: string,
    page: number,
    size: number,
  ): Promise<any> {
    let res;

    try {
      res = await this.prisma.contract.findMany({
        where: {
          jobVacancy: {
            company: {
              id: companyId,
            },
          },
        },
        include: {
          payment: true,
          jobVacancy: true,
        },
        ...pagination(page, size),
      });
    } catch (e) {
      throw new HttpException({ prisma: e.message }, HttpStatus.BAD_REQUEST);
    }
    return returnablePaginated(res, res.length, page, size);
  }
}
