import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { PrismaService } from '../prisma/prisma.service';
import { JobController } from './job.controller';
import { JobRepository } from './job.repository';
import { ContractService } from '../contract/contract.service';
import { ContractRepository } from '../contract/contract.repository';
import { ContractHelper } from '../contract/contract.helper';
import { PaymentService } from '../payment/payment.service';
import { PaymentRepository } from '../payment/payment.repository';

@Module({
  providers: [
    JobService,
    PrismaService,
    JobRepository,
    ContractService,
    ContractRepository,
    ContractHelper,
    PaymentService,
    PaymentRepository,
  ],
  exports: [JobService],
  controllers: [JobController],
})
export class JobModule {}
