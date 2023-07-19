import { Test, TestingModule } from '@nestjs/testing';

import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: DeepMocked<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
