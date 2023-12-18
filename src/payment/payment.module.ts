import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentController } from './payment.controller';

@Module({
  providers: [PaymentService, PrismaService],
  exports: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
