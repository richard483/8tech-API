import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ContractService } from '../contract.service';
import { ContractRepository } from '../contract.repository';
import { IContract } from '../interface/contract.interface';

describe('ContractService', () => {
  let service: ContractService;
  let reposiotry: DeepMocked<ContractRepository>;
  let contractMock: IContract;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractService, ContractRepository],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<ContractService>(ContractService);
    reposiotry = module.get(ContractRepository);
    contractMock = {
      id: 'randomId',
      userId: 'randomUserId',
      jobId: 'randomJobId',
      title: 'deez noot',
      description: 'this is description about job that is created for test',
      template: 'template',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create success', async () => {
    const createContractDto = {
      userId: 'randomUserId',
      jobId: 'randomJobId',
      title: 'deez noot',
      description: 'this is description about job that is created for test',
      template: 'template',
    };
    const createSpy = jest
      .spyOn(reposiotry, 'create')
      .mockResolvedValue(contractMock);

    const res = await service.create(createContractDto);

    expect(createSpy).toBeCalledTimes(1);
    expect(createSpy).toBeCalledWith(createContractDto);
    expect(res).toEqual(contractMock);

    createSpy.mockRestore();
  });
});
