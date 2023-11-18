import { Test, TestingModule } from '@nestjs/testing';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { CanActivate, HttpStatus } from '@nestjs/common';
import { UserController } from '../user.controller';
import { UsersService } from '../users.service';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../../auth/roles/role.guard';

describe('AuthController', () => {
  let controller: UserController;
  let userService: DeepMocked<UsersService>;
  const mockFailGuard: CanActivate = {
    canActivate: jest.fn().mockReturnValue(true),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      controllers: [UserController],
    })
      .useMocker(createMock)
      .overrideGuard(JwtAuthGuard)
      .useValue(mockFailGuard)
      .overrideGuard(RoleGuard)
      .useValue(mockFailGuard)
      .compile();
    controller = module.get<UserController>(UserController);
    userService = module.get(UsersService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createAdmin success', async () => {
    const mockUserCreateDto = {
      email: 'email@email.com',
      userName: 'test',
      password: 'password',
      roles: ['MEMBER'],
    };

    const mockUser = {
      id: '1',
      userName: 'test',
      email: 'email',
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: ['MEMBER'],
      hasGoogleAccount: false,
      description: 'desc',
    };

    const createSpy = jest
      .spyOn(userService, 'create')
      .mockResolvedValue(mockUser);

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockUser);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const res = await controller.createAdmin(mockRes, mockUserCreateDto);

    expect(createSpy).toBeCalledWith(mockUserCreateDto);
    expect(res).toEqual(mockUser);

    createSpy.mockRestore();
  });

  it('createAdmin success error', async () => {
    const mockResponse = {
      status: HttpStatus.I_AM_A_TEAPOT,
      message: 'GENERAL_ERROR',
    };

    const createSpy = jest
      .spyOn(userService, 'create')
      .mockRejectedValue(mockResponse);

    const statusSpy = jest.fn().mockReturnThis();
    const jsonSpy = jest.fn().mockReturnValue(mockResponse);

    const mockRes = {
      status: statusSpy,
      json: jsonSpy,
    };

    const res = await controller.createAdmin(mockRes, null);

    expect(createSpy).toBeCalledWith(null);
    expect(res).toEqual(mockResponse);

    createSpy.mockRestore();
  });
});
