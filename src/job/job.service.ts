import { Injectable } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { IJob } from './interface/job.interface';

@Injectable()
export class JobService {
  constructor(private jobRepository: JobRepository) {}

  async create(job: any): Promise<IJob> {
    return this.jobRepository.create(job);
  }

  async delete(jobId: any): Promise<IJob> {
    return this.jobRepository.create(jobId);
  }
}
