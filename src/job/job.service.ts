import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JobRepository } from './job.repository';
import { JobCreateDto } from './dto/job-create.dto';
import { JobUpdateDto } from './dto/job-update.dto';
import { Contract, JobVacancy } from '@prisma/client';
import { JobFilterRequest } from './dto/job-filter.request';
import { ContractService } from '../contract/contract.service';

@Injectable()
export class JobService {
  constructor(
    private jobRepository: JobRepository,
    private contractService: ContractService,
  ) {}

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

  async applyJob(userId: string, jobId: string): Promise<Contract> {
    const job: JobVacancy = await this.jobRepository.getById(jobId);
    if (!job) {
      throw new HttpException({ jobId: 'NOT_FOUND' }, HttpStatus.I_AM_A_TEAPOT);
    }
    return this.contractService
      .create({
        userId,
        jobId,
        title: job.title + ' for ' + userId,
        description:
          'Contract for the following job description: ' + job.description,
      })
      .catch((error) => {
        throw new HttpException(
          { prisma: error.message },
          HttpStatus.I_AM_A_TEAPOT,
        );
      });
  }

  async applicantsList(
    jobId: string,
    page: number,
    size: number,
  ): Promise<any> {
    return this.jobRepository.getApplicantsById(jobId, page, size);
  }
}
