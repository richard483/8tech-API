import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserHelper } from './user.helper';
import { CompanyRepository } from '../company/company.repository';

@Module({
  providers: [
    UsersService,
    PrismaService,
    UserRepository,
    UserHelper,
    CompanyRepository,
  ],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
