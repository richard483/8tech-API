import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';

@Module({
  providers: [PaymentService, PrismaService, PaymentRepository],
  exports: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
