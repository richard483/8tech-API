import { Test, TestingModule } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { CanActivate, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../../auth/roles/role.guard';
import { ContractController } from '../contract.controller';
import { ContractService } from '../contract.service';
import { IContract } from '../interface/contract.interface';
import * as fs from 'fs';
import * as path from 'path';
import { ContractStatus, PaymentStatus } from '@prisma/client';

describe('ContractController', () => {
  let controller: ContractController;
  let contractService: DeepMocked<ContractService>;
  const mockFailGuard: CanActivate = {
    canActivate: jest.fn().mockReturnValue(true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractService],
      controllers: [ContractController],
    })
      .useMocker(createMock)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockFailGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockFailGuard)
      .compile();
    controller = module.get<ContractController>(ContractController);
    contractService = module.get(ContractService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createContract success', async () => {
    const createContractDto = {
      userId: 'randomUserId',
      jobId: 'randomJobId',
      title: 'deez noot',
      description: 'this is description about job that is created for test',
      template: 'template',
      paymentRate: 100000,
    };

    const mockContract: IContract = {
      id: 'randomId',
      userId: 'randomUserId',
      jobId: 'randomJobId',
      title: 'deez noot',
      description: 'this is description about job that is created for test',
      template: 'template',
      paymentRate: 100000,
      status: ContractStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createSpy = jest
      .spyOn(contractService, 'create')
      .mockResolvedValue(mockContract);

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockContract);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const res = await controller.createContract(mockRes, createContractDto);

    expect(createSpy).toBeCalledWith(createContractDto);
    expect(res).toEqual(mockContract);

    createSpy.mockRestore();
  });
  it('craeteContract fail error', async () => {
    const mockResponse = {
      status: HttpStatus.I_AM_A_TEAPOT,
      message: 'GENERAL_ERROR',
    };

    const createSpy = jest
      .spyOn(contractService, 'create')
      .mockRejectedValue(mockResponse);

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    try {
      await controller.createContract(mockRes, null);
    } catch (e) {
      expect(createSpy).toBeCalledWith(null);
      expect(e).toEqual(mockResponse);

      createSpy.mockRestore();
    }
  });

  it('generateContract success', async () => {
    const joinSpy = jest
      .spyOn(path, 'join')
      .mockImplementation((args1, args2, args3) => args1 + args2 + args3);
    const generateSpy = jest.spyOn(contractService, 'generate');

    const statusSpy = jest.fn().mockReturnThis();
    const createReadStreamSpy = jest
      .spyOn(fs, 'createReadStream')
      .mockReturnValue(null);
    const jsonSpy = jest.fn().mockReturnValue(true);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    try {
      await controller.generateContract(mockRes, {
        contractId: 'randomId',
      });
    } catch (e) {
      expect(generateSpy).toBeCalledWith('randomId');
      expect(createReadStreamSpy).toBeCalledWith(
        process.cwd() + '/src/contract/temp/' + `randomId.pdf`,
      );

      generateSpy.mockRestore();
      createReadStreamSpy.mockRestore();
      joinSpy.mockRestore();
    }
  });
});
