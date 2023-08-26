import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserRepository {
  public model;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.user;
  }

  async findOnebyEmailPassword(
    email: string,
    password: string,
  ): Promise<IUser | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
  }

  async findOnebyEmail(email: string): Promise<IUser | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(user: any): Promise<IUser> {
    return this.prisma.user.create({
      data: user,
    });
  }
}
