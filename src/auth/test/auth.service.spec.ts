import { Test, TestingModule } from '@nestjs/testing';

import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: DeepMocked<UsersService>;
  let jwtService: JwtService;

  let mockAuthenticateDto: any;

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
        roles: ['MEMBER'],
        password: 'password',
      },
      token: null,
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

    const validateUserSpy = jest
      .spyOn(service, 'validateUser')
      .mockResolvedValue(mockAuthenticateDto);

    const signSpy = jest.spyOn(jwtService, 'sign').mockReturnValue('token');

    const res = await service.login(authenticateDto);

    expect(signSpy).toBeCalledTimes(1);
    expect(signSpy).toBeCalledWith(mockAuthenticateDto);
    expect(validateUserSpy).toBeCalledTimes(1);
    expect(validateUserSpy).toBeCalledWith(authenticateDto);

    mockAuthenticateDto.token = 'token';

    expect(res).toEqual(mockAuthenticateDto);

    validateUserSpy.mockRestore();
    signSpy.mockRestore();
  });
});
