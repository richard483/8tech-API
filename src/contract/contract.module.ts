import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractService } from './contract.service';
import { ContractRepository } from './contract.repository';
import { ContractController } from './contract.controller';
import { ContractHelper } from './contract.helper';
import { PaymentService } from '../payment/payment.service';

@Module({
  providers: [
    ContractService,
    ContractHelper,
    PrismaService,
    ContractRepository,
    PaymentService,
  ],
  exports: [ContractService],
  controllers: [ContractController],
})
export class ContractModule {}
