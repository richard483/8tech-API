import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { Role } from '../auth/roles/role.enum';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UserRepository } from './user.repository';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private userRepository: UserRepository,
  ) {}

  private readonly users = [
    {
      id: faker.datatype.uuid(),
      userName: 'John',
      password: 'changeme',
      role: Role.ADMIN,
    },
    {
      userId: faker.datatype.uuid(),
      userName: 'Maria',
      password: 'guess',
      role: Role.USER,
    },
  ];

  // async findOne(user: any): Promise<User | null> {
  //   return this.prisma.user.findUnique({
  //     where: {
  //       email: user.email,
  //       password: user.password,
  //     },
  //   });
  // }

  async findOne(user: any): Promise<User | null> {
    return this.userRepository.findOneWithEmailPassword(user);
  }

  // async findOne(user: any): Promise<User | undefined> {
  //   return this.users.find(
  //     (u) => u.userName == user.userName && u.password == user.password,
  //   );
  // }

  async create(user: any): Promise<User> {
    return this.userRepository.create(user);
  }

  // async create(user: any): Promise<User> {
  //   return this.prisma.user.create({
  //     data: user,
  //   });
  // }
}
