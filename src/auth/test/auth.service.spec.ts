import { Test, TestingModule } from '@nestjs/testing';

import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IGoogleUser } from '../interface/auth.interface';
import { Role } from '../roles/role.enum';

describe('AuthService', () => {
  let service: AuthService;
  let userService: DeepMocked<UsersService>;
  let jwtService: JwtService;

  let mockAuthenticateDto: any;
  let googleUserData: IGoogleUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UsersService);
    jwtService = module.get(JwtService);

    mockAuthenticateDto = {
      user: {
        id: '1',
        userName: 'test',
        email: 'email@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: ['USER'],
        password: 'password',
        hasGoogleAccount: false,
      },
      token: null,
    };

    googleUserData = {
      email: 'email@email.com',
      firstName: 'firstName',
      lastName: 'lastName',
      picture: 'picture',
      _accessToken: 'accessToken',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validateUser success', async () => {
    const findOneSpy = jest
      .spyOn(userService, 'findOne')
      .mockResolvedValue(mockAuthenticateDto.user);

    const res = await service.validateUser({
      email: 'test',
      password: 'password',
    });

    const { password, ...result } = mockAuthenticateDto.user;
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
      expect(e).toBeInstanceOf(UnauthorizedException);
      expect(e.message).toBe('INVALID_CREDENTIALS');
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

  it('googleLogin success', async () => {
    const req = {
      user: {
        ...googleUserData,
      },
    };

    const findOneByEmailSpy = jest
      .spyOn(userService, 'findOneByEmail')
      .mockResolvedValue(mockAuthenticateDto.user);

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
      .mockResolvedValueOnce(mockAuthenticateDto.user);

    const createUserSpy = jest
      .spyOn(userService, 'create')
      .mockResolvedValueOnce(mockAuthenticateDto.user);

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
      email: mockAuthenticateDto.user.email,
      userName: googleUserData.firstName + ' ' + googleUserData.lastName,
      roles: [Role.USER],
      hasGoogleAccount: true,
    });

    mockAuthenticateDto.token = 'token';

    expect(response).toEqual(mockAuthenticateDto);

    signSpy.mockRestore();
    findOneByEmailSpy.mockRestore();
  });
});
