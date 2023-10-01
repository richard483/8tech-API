import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobRepository {
  public model;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.jobVacancy;
  }

  async create(job: any): Promise<any> {
    return this.prisma.jobVacancy.create({
      data: job,
    });
  }
}
