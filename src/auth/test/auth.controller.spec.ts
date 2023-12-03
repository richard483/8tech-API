import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { CanActivate, HttpStatus } from '@nestjs/common';
import { RoleGuard } from '../roles/role.guard';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { GoogleGuard } from '../google/google.guard';

const mockIAuthSuccessResponse = {
  user: {
    id: '1',
    username: 'test',
    firstName: 'test',
    lastName: 'test',
    email: 'email@email.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    roles: ['MEMBER'],
    hasGoogleAccount: false,
    description: 'desc',
  },
  token: 'token',
};

const mockBadRequestResponse = {
  status: HttpStatus.BAD_REQUEST,
  message: 'ERROR_BAD_REQUEST',
};

const mockIUserResponse = {
  id: '1',
  username: 'test',
  firstName: 'test',
  lastName: 'test',
  email: 'email@email.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  roles: ['MEMBER'],
  hasGoogleAccount: false,
  description: 'desc',
};

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
    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockIAuthSuccessResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const loginSpy = jest
      .spyOn(authService, 'login')
      .mockResolvedValue(mockIAuthSuccessResponse);

    const response = await controller.signIn(mockRes, null);

    expect(response).toEqual(mockIAuthSuccessResponse);
    expect(loginSpy).toBeCalledTimes(1);
    statusSpy.mockRestore();
    jsonSpy.mockRestore();
    loginSpy.mockRestore();
  });

  it('login error', async () => {
    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockBadRequestResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const loginSpy = jest
      .spyOn(authService, 'login')
      .mockRejectedValue(mockBadRequestResponse);

    try {
      await controller.signIn(mockRes, null);
    } catch (e) {
      expect(e).toEqual(mockBadRequestResponse);
      expect(loginSpy).toBeCalledTimes(1);
      statusSpy.mockRestore();
      jsonSpy.mockRestore();
      loginSpy.mockRestore();
    }
  });

  it('register success', async () => {
    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockIUserResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const registerSpy = jest
      .spyOn(authService, 'register')
      .mockResolvedValue(mockIUserResponse);

    const response = await controller.signUp(mockRes, null);

    expect(response).toEqual(mockIUserResponse);
    expect(registerSpy).toBeCalledTimes(1);
    statusSpy.mockRestore();
    jsonSpy.mockRestore();
    registerSpy.mockRestore();
  });

  it('register error', async () => {
    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockBadRequestResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const registerSpy = jest
      .spyOn(authService, 'register')
      .mockRejectedValue(mockBadRequestResponse);

    try {
      await controller.signUp(mockRes, null);
    } catch (e) {
      expect(e).toEqual(mockBadRequestResponse);
      expect(registerSpy).toBeCalledTimes(1);
      statusSpy.mockRestore();
      jsonSpy.mockRestore();
      registerSpy.mockRestore();
    }
  });

  it('getProfileInfo', async () => {
    const mockReq = {
      user: mockIUserResponse,
    };
    const jsonSpy = jest.fn().mockReturnValue(mockIUserResponse);
    const statusSpy = jest.fn().mockReturnValue({ json: jsonSpy });
    const mockRes = {
      status: statusSpy,
    };

    const response = await controller.getProfileInfo(mockReq, mockRes);

    expect(response).toEqual(mockIUserResponse);
  });

  it('googleRedirectLogin success', async () => {
    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockIAuthSuccessResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const googleLoginSpy = jest
      .spyOn(authService, 'googleLogin')
      .mockResolvedValue(mockIAuthSuccessResponse);

    const response = await controller.googleAuthRedirect(null, mockRes);

    expect(response).toEqual(mockIAuthSuccessResponse);
    expect(googleLoginSpy).toBeCalledTimes(1);
    statusSpy.mockRestore();
    jsonSpy.mockRestore();
    googleLoginSpy.mockRestore();
  });

  it('googleRedirectLogin error', async () => {
    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockBadRequestResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const loginSpy = jest
      .spyOn(authService, 'googleLogin')
      .mockRejectedValue(mockBadRequestResponse);

    try {
      await controller.googleAuthRedirect(null, mockRes);
    } catch (e) {
      expect(e).toEqual(mockBadRequestResponse);
      expect(loginSpy).toBeCalledTimes(1);
      statusSpy.mockRestore();
      jsonSpy.mockRestore();
      loginSpy.mockRestore();
    }
  });

  it('google placeholder', async () => {
    const response = await controller.googleAuth();

    expect(response).toBeUndefined();
  });
});
