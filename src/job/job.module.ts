import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { PrismaService } from '../prisma/prisma.service';
import { JobController } from './job.controller';
import { JobRepository } from './job.repository';

@Module({
  providers: [JobService, PrismaService, JobRepository],
  exports: [JobService],
  controllers: [JobController],
})
export class ContractModule {}
