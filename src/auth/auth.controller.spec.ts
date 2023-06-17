import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { AuthGuard } from './auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: DeepMocked<AuthService>;
  let authGuard: DeepMocked<AuthGuard>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, AuthGuard],
      controllers: [AuthController],
    })
      .useMocker(createMock)
      .compile();
    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
    authGuard = module.get(AuthGuard);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
