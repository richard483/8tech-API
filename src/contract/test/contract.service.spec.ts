import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ContractHelper } from '../contract.helper';
import { ContractService } from '../contract.service';
import { ContractRepository } from '../contract.repository';
import { IContract } from '../interface/contract.interface';
import * as path from 'path';

describe('ContractService', () => {
  let service: ContractService;
  let reposiotry: DeepMocked<ContractRepository>;
  let helper: DeepMocked<ContractHelper>;
  let contractMock: IContract;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractService, ContractRepository, ContractHelper],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<ContractService>(ContractService);
    reposiotry = module.get(ContractRepository);
    helper = module.get(ContractHelper);
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

  it('generate success', async () => {
    const getSpy = jest
      .spyOn(reposiotry, 'get')
      .mockResolvedValue(contractMock);

    const helperSpy = jest.spyOn(helper, 'createPdf').mockResolvedValue(null);

    await service.generate('randomId');

    expect(getSpy).toBeCalledTimes(1);
    expect(getSpy).toBeCalledWith('randomId');
    expect(helperSpy).toBeCalledTimes(1);
    expect(helperSpy).toBeCalledWith(contractMock);

    getSpy.mockRestore();
    helperSpy.mockRestore();
  });

  it('generate fail', async () => {
    const getSpy = jest
      .spyOn(reposiotry, 'get')
      .mockRejectedValue(contractMock);

    const helperSpy = jest.spyOn(helper, 'createPdf');

    await service.generate('randomId');

    expect(getSpy).toBeCalledTimes(1);
    expect(getSpy).toBeCalledWith('randomId');
    expect(helperSpy).not.toBeCalled();

    getSpy.mockRestore();
    helperSpy.mockRestore();
  });
});
