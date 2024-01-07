import { Injectable } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { JobCreateDto } from './dto/job-create.dto';
import { JobUpdateDto } from './dto/job-update.dto';
import { JobVacancy } from '@prisma/client';
import { JobFilterRequest } from './dto/job-filter.request';

@Injectable()
export class JobService {
  constructor(private jobRepository: JobRepository) {}

  async create(job: JobCreateDto): Promise<JobVacancy> {
    return this.jobRepository.create(job);
  }

  async delete(jobId: string): Promise<JobVacancy> {
    return this.jobRepository.delete(jobId);
  }

  async update(job: JobUpdateDto): Promise<JobVacancy> {
    const { id, ...jobData } = job;
    return this.jobRepository.update(id, jobData);
  }

  async getById(jobId: string): Promise<JobVacancy> {
    return this.jobRepository.getById(jobId);
  }

  async findManyByList(data: JobFilterRequest): Promise<JobVacancy[] | null> {
    return this.jobRepository.findManyByFieldAndSortBy(data);
  }
}
