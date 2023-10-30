import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractService } from './contract.service';
import { ContractRepository } from './contract.repository';
import { ContractController } from './contract.controller';

@Module({
  providers: [ContractService, PrismaService, ContractRepository],
  exports: [ContractService],
  controllers: [ContractController],
})
export class ContractModule {}
