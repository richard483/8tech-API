import { Test, TestingModule } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { CanActivate, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../../auth/roles/role.guard';
import { JobController } from '../job.controller';
import { JobService } from '../job.service';
import { IJob } from '../interface/job.interface';

describe('JobController', () => {
  let controller: JobController;
  let jobService: DeepMocked<JobService>;
  const mockFailGuard: CanActivate = {
    canActivate: jest.fn().mockReturnValue(true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobService],
      controllers: [JobController],
    })
      .useMocker(createMock)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockFailGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockFailGuard)
      .compile();
    controller = module.get<JobController>(JobController);
    jobService = module.get(JobService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('craeteJob success', async () => {
    const createJobDto = {
      title: 'test',
      description: 'test',
      companyId: 'test',
    };

    const mockJob: IJob = {
      id: 'randomId',
      title: 'deez noot',
      description: 'this is description about job that is created for test',
      createdAt: new Date(),
      updatedAt: new Date(),
      companyId: 'randomCompanyId',
    };

    const createSpy = jest
      .spyOn(jobService, 'create')
      .mockResolvedValue(mockJob);

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockJob);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const res = await controller.createJob(mockRes, createJobDto);

    expect(createSpy).toBeCalledWith(createJobDto);
    expect(res).toEqual(mockJob);

    createSpy.mockRestore();
  });
  it('craeteJob fail error', async () => {
    const mockResponse = {
      status: HttpStatus.I_AM_A_TEAPOT,
      message: 'GENERAL_ERROR',
    };

    const createSpy = jest
      .spyOn(jobService, 'create')
      .mockRejectedValue(mockResponse);

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const res = await controller.createJob(mockRes, null);

    expect(createSpy).toBeCalledWith(null);
    expect(res).toEqual(mockResponse);

    createSpy.mockRestore();
  });

  it('deleteJob success', async () => {
    const mockJob: IJob = {
      id: 'randomId',
      title: 'deez noot',
      description: 'this is description about job that is created for test',
      createdAt: new Date(),
      updatedAt: new Date(),
      companyId: 'randomCompanyId',
    };

    const deleteSpy = jest
      .spyOn(jobService, 'delete')
      .mockResolvedValue(mockJob);

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockJob);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const res = await controller.deleteJob(mockRes, {
      jobId: 'randomId',
    });

    expect(deleteSpy).toBeCalledWith('randomId');
    expect(res).toEqual(mockJob);

    deleteSpy.mockRestore();
  });
  it('deleteJob fail error', async () => {
    const mockResponse = {
      status: HttpStatus.I_AM_A_TEAPOT,
      message: 'GENERAL_ERROR',
    };

    const deleteSpy = jest
      .spyOn(jobService, 'delete')
      .mockRejectedValue(mockResponse);

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const res = await controller.deleteJob(mockRes, {
      jobId: null,
    });

    expect(deleteSpy).toBeCalledWith(null);
    expect(res).toEqual(mockResponse);

    deleteSpy.mockRestore();
  });
});
