import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { CanActivate, HttpStatus } from '@nestjs/common';
import { RoleGuard } from '../roles/role.guard';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GoogleGuard } from '../google/google.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: DeepMocked<AuthService>;
  const mockFailGuard: CanActivate = {
    canActivate: jest.fn().mockReturnValue(true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
    })
      .useMocker(createMock)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockFailGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockFailGuard)
      .overrideGuard(GoogleGuard)
      .useValue(mockFailGuard)
      .compile();
    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  afterEach(() => {
    jest.resetAllMocks();
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
        hasGoogleAccount: false,
      },
      token: 'token',
    };

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const loginSpy = jest
      .spyOn(authService, 'login')
      .mockResolvedValue(mockResponse);

    const response = await controller.signIn(mockRes, null);

    expect(response).toEqual(mockResponse);
    expect(statusSpy).toBeCalledWith(HttpStatus.OK);
    expect(jsonSpy).toBeCalledWith(mockResponse);
    expect(loginSpy).toBeCalledTimes(1);
    statusSpy.mockRestore();
    jsonSpy.mockRestore();
    loginSpy.mockRestore();
  });

  it('login error', async () => {
    const mockResponse = {
      status: HttpStatus.BAD_REQUEST,
      message: 'ERROR_BAD_REQUEST',
    };

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const loginSpy = jest
      .spyOn(authService, 'login')
      .mockRejectedValue(mockResponse);

    const response = await controller.signIn(mockRes, null);

    expect(response).toEqual(mockResponse);
    expect(statusSpy).toBeCalledWith(HttpStatus.BAD_REQUEST);
    expect(jsonSpy).toBeCalledWith({
      error: mockResponse.message,
    });
    expect(loginSpy).toBeCalledTimes(1);
    statusSpy.mockRestore();
    jsonSpy.mockRestore();
    loginSpy.mockRestore();
  });

  it('getProfileInfo', async () => {
    const user = {
      id: '1',
      userName: 'test',
      email: 'email@email.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: ['MEMBER'],
    };
    const mockReq = {
      user,
    };

    const response = await controller.getProfileInfo(mockReq);

    expect(response).toEqual(user);
  });

  it('googleRedirectLogin success', async () => {
    const mockResponse = {
      user: {
        id: '1',
        userName: 'test',
        email: 'email@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: ['MEMBER'],
        hasGoogleAccount: false,
      },
      token: 'token',
    };

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const googleLoginSpy = jest
      .spyOn(authService, 'googleLogin')
      .mockResolvedValue(mockResponse);

    const response = await controller.googleAuthRedirect(null, mockRes);

    expect(response).toEqual(mockResponse);
    expect(statusSpy).toBeCalledWith(HttpStatus.OK);
    expect(jsonSpy).toBeCalledWith(mockResponse);
    expect(googleLoginSpy).toBeCalledTimes(1);
    statusSpy.mockRestore();
    jsonSpy.mockRestore();
    googleLoginSpy.mockRestore();
  });

  it('googleRedirectLogin error', async () => {
    const mockResponse = {
      status: HttpStatus.BAD_REQUEST,
      message: 'ERROR_BAD_REQUEST',
    };

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const loginSpy = jest
      .spyOn(authService, 'googleLogin')
      .mockRejectedValue(mockResponse);

    const response = await controller.googleAuthRedirect(null, mockRes);

    expect(response).toEqual(mockResponse);
    expect(statusSpy).toBeCalledWith(HttpStatus.BAD_REQUEST);
    expect(jsonSpy).toBeCalledWith({
      error: mockResponse.message,
    });
    expect(loginSpy).toBeCalledTimes(1);
    statusSpy.mockRestore();
    jsonSpy.mockRestore();
    loginSpy.mockRestore();
  });
});
