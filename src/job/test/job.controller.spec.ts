import { Test, TestingModule } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { CanActivate, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../../auth/roles/role.guard';
import { JobController } from '../job.controller';
import { JobService } from '../job.service';
import { JobVacancy } from '@prisma/client';

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

    const mockJob: JobVacancy = {
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

    try {
      await controller.createJob(mockRes, null);
    } catch (e) {
      expect(createSpy).toBeCalledWith(null);
      expect(e).toEqual(mockResponse);

      createSpy.mockRestore();
    }
  });

  it('deleteJob success', async () => {
    const mockJob: JobVacancy = {
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

    try {
      await controller.deleteJob(mockRes, {
        jobId: null,
      });
    } catch (e) {
      expect(deleteSpy).toBeCalledWith(null);
      expect(e).toEqual(mockResponse);

      deleteSpy.mockRestore();
    }
  });
  it('updateJob success', async () => {
    const mockJob: JobVacancy = {
      id: 'randomId',
      title: 'deez noot',
      description: 'this is description about job that is created for test',
      createdAt: new Date(),
      updatedAt: new Date(),
      companyId: 'randomCompanyId',
    };

    const updateSpy = jest
      .spyOn(jobService, 'update')
      .mockResolvedValue(mockJob);

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockJob);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const res = await controller.updateJob(mockRes, {
      id: 'randomId',
    });

    expect(updateSpy).toBeCalledWith({
      id: 'randomId',
    });
    expect(res).toEqual(mockJob);

    updateSpy.mockRestore();
  });
  it('updateJob fail error', async () => {
    const mockResponse = {
      status: HttpStatus.I_AM_A_TEAPOT,
      message: 'GENERAL_ERROR',
    };

    const updateSpy = jest
      .spyOn(jobService, 'update')
      .mockRejectedValue(mockResponse);

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    try {
      await controller.updateJob(mockRes, {
        id: null,
      });
    } catch (e) {
      expect(updateSpy).toBeCalledWith({
        id: null,
      });
      expect(e).toEqual(mockResponse);

      updateSpy.mockRestore();
    }
  });
  it('getJob success', async () => {
    const mockJob: JobVacancy = {
      id: 'randomId',
      title: 'deez noot',
      description: 'this is description about job that is created for test',
      createdAt: new Date(),
      updatedAt: new Date(),
      companyId: 'randomCompanyId',
    };

    const getJobSpy = jest
      .spyOn(jobService, 'getById')
      .mockResolvedValue(mockJob);

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockJob);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const res = await controller.getjob(mockRes, {
      jobId: 'randomId',
    });

    expect(getJobSpy).toBeCalledWith('randomId');
    expect(res).toEqual(mockJob);

    getJobSpy.mockRestore();
  });
  it('getJob fail error', async () => {
    const mockResponse = {
      status: HttpStatus.I_AM_A_TEAPOT,
      message: 'GENERAL_ERROR',
    };

    const getJobSpy = jest
      .spyOn(jobService, 'getById')
      .mockRejectedValue(mockResponse);

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    try {
      await controller.getjob(mockRes, {
        jobId: null,
      });
    } catch (e) {
      expect(getJobSpy).toBeCalledWith(null);
      expect(e).toEqual(mockResponse);

      getJobSpy.mockRestore();
    }
  });
});
