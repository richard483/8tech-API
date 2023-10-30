import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JobUpdateDto } from './dto/job-update.dto';
import { JobCreateDto } from './dto/job-create.dto';

@Injectable()
export class JobRepository {
  public model;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.jobVacancy;
  }

  async create(job: JobCreateDto): Promise<any> {
    return this.prisma.jobVacancy.create({
      data: job,
    });
  }

  async delete(jobId: string): Promise<any> {
    return this.prisma.jobVacancy.delete({
      where: {
        id: jobId,
      },
    });
  }

  async update(jobId: string, job: JobUpdateDto): Promise<any> {
    return this.prisma.jobVacancy.update({
      where: {
        id: jobId,
      },
      data: job,
    });
  }

  async getById(jobId: string): Promise<any> {
    return this.prisma.jobVacancy.findUnique({
      where: {
        id: jobId,
      },
    });
  }
}
