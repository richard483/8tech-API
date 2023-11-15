import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractService } from './contract.service';
import { ContractRepository } from './contract.repository';
import { ContractController } from './contract.controller';
import { ContractHelper } from './contract.helper';

@Module({
  providers: [
    ContractService,
    ContractHelper,
    PrismaService,
    ContractRepository,
  ],
  exports: [ContractService],
  controllers: [ContractController],
})
export class ContractModule {}
