import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type User = any;

@Injectable()
export class UserRepository {
  public model;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.user;
  }

  async findOneWithEmailPassword(user: any): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email: user.email,
        password: user.password,
      },
    });
  }

  async create(user: any): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }
}
