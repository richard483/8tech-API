import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractService } from './contract.service';
import { ContractRepository } from './contract.repository';
import { ContractController } from './contract.controller';
import { ContractHelper } from './contract.helper';
import { PaymentService } from '../payment/payment.service';
import { PaymentRepository } from '../payment/payment.repository';

@Module({
  providers: [
    ContractService,
    ContractHelper,
    PrismaService,
    ContractRepository,
    PaymentService,
    PaymentRepository,
  ],
  exports: [ContractService],
  controllers: [ContractController],
})
export class ContractModule {}
