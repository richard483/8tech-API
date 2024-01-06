import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { PrismaService } from '../prisma/prisma.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';

@Module({
  providers: [CompanyService, PrismaService, CompanyRepository],
  exports: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
