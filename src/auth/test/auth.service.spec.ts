import { Test, TestingModule } from '@nestjs/testing';

import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { HttpException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IGoogleUser } from '../interface/auth.interface';
import { Role } from '../roles/role.enum';
import { compare, genSaltSync, hashSync } from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: DeepMocked<UsersService>;
  let jwtService: JwtService;

  let mockAuthenticateDto: any;
  let mockUser: any;
  let googleUserData: IGoogleUser;
  let mockRegisterRequest: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UsersService);
    jwtService = module.get(JwtService);

    mockUser = {
      id: '1',
      username: 'test',
      firstName: 'test',
      lastName: 'test',
      email: 'email@email.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: ['USER'],
      password: 'password',
      hasGoogleAccount: false,
    };

    mockAuthenticateDto = {
      user: mockUser,
      token: null,
    };

    googleUserData = {
      email: 'email@email.com',
      firstName: 'firstName',
      lastName: 'lastName',
      picture: 'picture',
      _accessToken: 'accessToken',
    };

    mockRegisterRequest = {
      email: 'email@email.com',
      password: 'password',
      username: 'username',
      firstName: 'test',
      lastName: 'test',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validateUser success', async () => {
    const findOneSpy = jest
      .spyOn(userService, 'findOne')
      .mockResolvedValue(mockUser);

    (compare as jest.Mock) = jest.fn().mockResolvedValue(true);

    const res = await service.validateUser({
      email: 'test',
      password: 'password',
    });

    const { password, ...result } = mockUser;
    expect(res).toEqual({ user: result });
    expect(findOneSpy).toBeCalledTimes(1);

    findOneSpy.mockRestore();
  });

  it('validateUser fail not found', async () => {
    const findOneSpy = jest
      .spyOn(userService, 'findOne')
      .mockResolvedValue(null);

    try {
      await service.validateUser({
        email: 'test',
        password: 'password',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Http Exception');
    }

    expect(findOneSpy).toBeCalledTimes(1);

    findOneSpy.mockRestore();
  });

  it('validateUser fail wrong password', async () => {
    const findOneSpy = jest
      .spyOn(userService, 'findOne')
      .mockResolvedValue(mockUser);

    (compare as jest.Mock) = jest.fn().mockResolvedValue(false);

    try {
      await service.validateUser({
        email: 'test',
        password: 'password',
      });
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Http Exception');
    }

    expect(findOneSpy).toBeCalledTimes(1);

    findOneSpy.mockRestore();
  });

  it('login success', async () => {
    const authenticateDto = {
      email: 'test',
      password: 'password',
    };

    const cookieSpy = jest.fn();

    const resMock = {
      cookie: cookieSpy,
    };

    const validateUserSpy = jest
      .spyOn(service, 'validateUser')
      .mockResolvedValue(mockAuthenticateDto);

    const signSpy = jest.spyOn(jwtService, 'sign').mockReturnValue('token');

    const res = await service.login(authenticateDto, resMock);

    expect(signSpy).toBeCalledTimes(1);
    expect(signSpy).toBeCalledWith(mockAuthenticateDto);
    expect(validateUserSpy).toBeCalledTimes(1);
    expect(validateUserSpy).toBeCalledWith(authenticateDto);
    expect(cookieSpy).toBeCalledTimes(1);
    expect(cookieSpy).toBeCalledWith('EToken', 'token');

    mockAuthenticateDto.token = 'token';

    expect(res).toEqual(mockAuthenticateDto);

    validateUserSpy.mockRestore();
    signSpy.mockRestore();
    cookieSpy.mockRestore();
  });

  it('register success', async () => {
    (genSaltSync as jest.Mock) = jest.fn().mockReturnValue('salt');
    (hashSync as jest.Mock) = jest.fn().mockReturnValue('hashedPassword');
    const userCreateSpy = jest
      .spyOn(userService, 'create')
      .mockResolvedValue(mockUser);
    mockRegisterRequest.password = 'password123';
    expect(await service.register(mockRegisterRequest)).toEqual(mockUser);
    expect(userCreateSpy).toBeCalledTimes(1);

    userCreateSpy.mockRestore();
  });

  it('register failed invalid password', async () => {
    (genSaltSync as jest.Mock) = jest.fn().mockReturnValue('salt');
    (hashSync as jest.Mock) = jest.fn().mockReturnValue('hashedPassword');

    try {
      await service.register(mockRegisterRequest);
    } catch (e) {
      console.log('#register failed invalid password', e);
      expect(e).toBeInstanceOf(HttpException);
      expect(e.message).toBe('Http Exception');
    }
  });

  it('googleLogin success', async () => {
    const req = {
      user: {
        ...googleUserData,
      },
    };

    const findOneByEmailSpy = jest
      .spyOn(userService, 'findOneByEmail')
      .mockResolvedValue(mockUser);

    const signSpy = jest.spyOn(jwtService, 'sign').mockReturnValue('token');
    const cookieSpy = jest.fn();

    const res = {
      cookie: cookieSpy,
    };

    const response = await service.googleLogin(req, res);

    expect(findOneByEmailSpy).toBeCalledWith(googleUserData.email);
    expect(cookieSpy).toBeCalledTimes(1);
    expect(cookieSpy).toBeCalledWith('EToken', 'token');
    expect(signSpy).toBeCalledTimes(1);

    mockAuthenticateDto.token = 'token';

    expect(response).toEqual(mockAuthenticateDto);

    signSpy.mockRestore();
    findOneByEmailSpy.mockRestore();
  });

  it('googleLogin invalid google account', async () => {
    const req = {
      user: undefined,
    };
    const res = {};

    try {
      await service.googleLogin(req, res);
    } catch (e) {
      expect(e).toBeInstanceOf(UnauthorizedException);
      expect(e.message).toBe('INVALID_CREDENTIALS');
    }
  });

  it('googleLogin register with google account success', async () => {
    const req = {
      user: {
        ...googleUserData,
      },
    };

    const findOneByEmailSpy = jest
      .spyOn(userService, 'findOneByEmail')
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(mockUser);

    const createUserSpy = jest
      .spyOn(userService, 'create')
      .mockResolvedValueOnce(mockUser);

    const signSpy = jest.spyOn(jwtService, 'sign').mockReturnValueOnce('token');
    const cookieSpy = jest.fn();

    const res = {
      cookie: cookieSpy,
    };

    const response = await service.googleLogin(req, res);

    expect(findOneByEmailSpy).toBeCalledWith(googleUserData.email);
    expect(cookieSpy).toBeCalledTimes(1);
    expect(cookieSpy).toBeCalledWith('EToken', 'token');
    expect(signSpy).toBeCalledTimes(1);
    expect(createUserSpy).toBeCalledWith({
      email: mockUser.email,
      username: googleUserData.firstName + ' ' + googleUserData.lastName,
      firstName: googleUserData.firstName,
      lastName: googleUserData.lastName,
      roles: [Role.USER],
      hasGoogleAccount: true,
    });

    mockAuthenticateDto.token = 'token';

    expect(response).toEqual(mockAuthenticateDto);

    signSpy.mockRestore();
    findOneByEmailSpy.mockRestore();
  });
});
