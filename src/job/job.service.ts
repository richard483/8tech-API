import { Injectable } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { IJob } from './interface/job.interface';
import { JobCreateDto } from './dto/job-create.dto';
import { JobUpdateDto } from './dto/job-update.dto';

@Injectable()
export class JobService {
  constructor(private jobRepository: JobRepository) {}

  async create(job: JobCreateDto): Promise<IJob> {
    return this.jobRepository.create(job);
  }

  async delete(jobId: string): Promise<IJob> {
    return this.jobRepository.delete(jobId);
  }

  async update(job: JobUpdateDto): Promise<IJob> {
    const { id, ...jobData } = job;
    return this.jobRepository.update(id, jobData);
  }

  async getById(jobId: string): Promise<IJob> {
    return this.jobRepository.getById(jobId);
  }
}
