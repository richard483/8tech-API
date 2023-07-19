import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: DeepMocked<AuthService>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
    })
      .useMocker(createMock)
      .compile();
    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login success', async () => {
    const mockResponse = {
      user: {
        id: '1',
        userName: 'test',
        email: 'email@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: ['MEMBER'],
      },
      token: 'token',
    };

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    jest.spyOn(authService, 'login').mockResolvedValue(mockResponse);

    const response = await controller.signIn(mockRes, null);

    expect(response).toEqual(mockResponse);
    expect(statusSpy).toBeCalledWith(HttpStatus.OK);
    expect(jsonSpy).toBeCalledWith(mockResponse);
  });
});
