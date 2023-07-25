import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  providers: [UsersService, PrismaService, UserRepository],
  exports: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
