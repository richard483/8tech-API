import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompanyCreateDto } from './dto/company-create.dto';
import { Company } from '@prisma/client';

@Injectable()
export class CompanyRepository {
  public model;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.company;
  }

  async create(company: CompanyCreateDto): Promise<Company> {
    return this.prisma.company.create({
      data: company,
    });
  }

  async update(companyId: string, data: any): Promise<Company> {
    return this.prisma.company.update({
      where: {
        id: companyId,
      },
      data,
    });
  }
}
