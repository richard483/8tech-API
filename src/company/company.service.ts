import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { CompanyCreateDto } from './dto/company-create.dto';
import { CompanyUpdateDto } from './dto/company-update.dto';
import { Company } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private companyRepository: CompanyRepository) {}

  async create(company: CompanyCreateDto): Promise<Company> {
    return this.companyRepository.create(company);
  }

  async update(company: CompanyUpdateDto): Promise<Company> {
    const { id, ...data } = company;
    return this.companyRepository.update(id, data);
  }

  async get(companyId: string): Promise<Company> {
    return this.companyRepository.get(companyId);
  }
}
