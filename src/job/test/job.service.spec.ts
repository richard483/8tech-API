import { Test, TestingModule } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { JobService } from '../job.service';
import { JobRepository } from '../job.repository';
import { JobUpdateDto } from '../dto/job-update.dto';
import { JobVacancy } from '@prisma/client';

describe('JobService', () => {
  let service: JobService;
  let reposiotry: DeepMocked<JobRepository>;
  let jobMock: JobVacancy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobService, JobRepository],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<JobService>(JobService);
    reposiotry = module.get(JobRepository);
    jobMock = {
      id: 'randomId',
      title: 'deez noot',
      description: 'this is description about job that is created for test',
      createdAt: new Date(),
      updatedAt: new Date(),
      companyId: 'randomCompanyId',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create success', async () => {
    const createJobDto = {
      title: 'test',
      description: 'test',
      companyId: 'test',
    };
    const createSpy = jest
      .spyOn(reposiotry, 'create')
      .mockResolvedValue(jobMock);

    const res = await service.create(createJobDto);

    expect(createSpy).toBeCalledTimes(1);
    expect(createSpy).toBeCalledWith(createJobDto);
    expect(res).toEqual(jobMock);

    createSpy.mockRestore();
  });
  it('delete success', async () => {
    const deleteSpy = jest
      .spyOn(reposiotry, 'delete')
      .mockResolvedValue(jobMock);

    const res = await service.delete('randomId');

    expect(deleteSpy).toBeCalledTimes(1);
    expect(deleteSpy).toBeCalledWith('randomId');
    expect(res).toEqual(jobMock);

    deleteSpy.mockRestore();
  });
  it('update success', async () => {
    const jobUpdateDtoMock: JobUpdateDto = {
      id: 'randomIdDesu',
      title: 'deez noot',
      description: 'this is description about job that is created for test',
      companyId: 'randomCompanyId',
    };
    const updateSpy = jest
      .spyOn(reposiotry, 'update')
      .mockResolvedValue(jobMock);

    const res = await service.update(jobUpdateDtoMock);

    expect(updateSpy).toBeCalledTimes(1);
    const { id, ...jobData } = jobUpdateDtoMock;
    expect(updateSpy).toBeCalledWith(id, jobData);
    expect(res).toEqual(jobMock);

    updateSpy.mockRestore();
  });
  it('get success', async () => {
    const getSpy = jest.spyOn(reposiotry, 'getById').mockResolvedValue(jobMock);

    const res = await service.getById('randomId');

    expect(getSpy).toBeCalledTimes(1);
    expect(getSpy).toBeCalledWith('randomId');
    expect(res).toEqual(jobMock);

    getSpy.mockRestore();
  });
});
