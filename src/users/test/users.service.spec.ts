import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UserRepository } from '../user.repository';
import { HttpException } from '@nestjs/common';
import { DeepMocked, createMock } from '@golevelup/ts-jest';

describe('UsersService', () => {
  let service: UsersService;
  let reposiotry: DeepMocked<UserRepository>;
  let userMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UserRepository],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<UsersService>(UsersService);
    reposiotry = module.get(UserRepository);
    userMock = {
      id: '1',
      userName: 'test',
      email: 'email@email.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: ['MEMBER'],
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne success', async () => {
    const findOneSpy = jest
      .spyOn(reposiotry, 'findOnebyEmailPassword')
      .mockResolvedValue(userMock);

    const res = await service.findOne({
      email: 'email@email.com',
      password: 'test',
    });

    expect(res).toEqual(userMock);
    expect(findOneSpy).toBeCalledTimes(1);

    findOneSpy.mockRestore();
  });

  it('findOne success null', async () => {
    const findOneSpy = jest
      .spyOn(reposiotry, 'findOnebyEmailPassword')
      .mockResolvedValue(null);

    const res = await service.findOne({
      email: 'email@email.com',
      password: 'test',
    });

    expect(res).toEqual(null);
    expect(findOneSpy).toBeCalledTimes(1);
    expect(findOneSpy).toBeCalledWith('email@email.com', 'test');

    findOneSpy.mockRestore();
  });

  it('create success', async () => {
    const findOneSpy = jest
      .spyOn(reposiotry, 'findOneByEmail')
      .mockResolvedValue(null);

    const createSpy = jest
      .spyOn(reposiotry, 'create')
      .mockResolvedValue(userMock);

    const res = await service.create(userMock);

    expect(findOneSpy).toBeCalledTimes(1);
    expect(findOneSpy).toBeCalledWith(userMock.email);
    expect(createSpy).toBeCalledTimes(1);
    expect(createSpy).toBeCalledWith(userMock);
    expect(res).toEqual(userMock);

    findOneSpy.mockRestore();
    createSpy.mockRestore();
  });

  it('create fail email already used', async () => {
    const findOneSpy = jest
      .spyOn(reposiotry, 'findOneByEmail')
      .mockResolvedValue(userMock);

    const createSpy = jest.spyOn(reposiotry, 'create');

    try {
      await service.create(userMock);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toEqual('EMAIL_ALREADY_USED');
    }

    expect(findOneSpy).toHaveBeenCalledTimes(1);
    expect(findOneSpy).toHaveBeenCalledWith(userMock.email);
    expect(createSpy).not.toHaveBeenCalled();

    findOneSpy.mockRestore();
    createSpy.mockRestore();
  });
});
