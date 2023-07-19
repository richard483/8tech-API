import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UserRepository } from '../user.repository';
import { PrismaService } from '../../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let reposiotry: UserRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UserRepository, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    reposiotry = module.get<UserRepository>(UserRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
