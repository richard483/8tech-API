import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Payment, PaymentStatus } from '@prisma/client';
import { PaymentCreateDto } from './dto/payment-create.dto';

@Injectable()
export class PaymentRepository {
  public model;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.payment;
  }

  async create(data: PaymentCreateDto): Promise<Payment> {
    return this.model.create({
      data,
    });
  }

  async getById(id: string): Promise<Payment> {
    return this.model.findUnique({
      where: {
        id,
      },
    });
  }

  async updatePaymentRequestId(
    id: string,
    paymentRequestId: string,
  ): Promise<Payment> {
    return this.model.update({
      where: {
        id,
      },
      data: {
        paymentRequestId,
      },
    });
  }
  async updatePaymentStatus(
    id: string,
    paymentStatus: PaymentStatus,
  ): Promise<Payment> {
    return this.model.update({
      where: {
        id,
      },
      data: {
        paymentStatus,
      },
    });
  }

  async updatePayoutLinkId(id: string, payoutLinkId: string): Promise<Payment> {
    return this.model.update({
      where: {
        id,
      },
      data: {
        payoutLinkId,
      },
    });
  }
}
