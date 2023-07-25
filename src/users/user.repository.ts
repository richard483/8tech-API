import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  public model;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.user;
  }

  async findOnebyEmailPassword(
    email: string,
    password: string,
  ): Promise<any | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
  }

  async findOneByEmail(email: string): Promise<any | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(user: any): Promise<any> {
    return this.prisma.user.create({
      data: user,
    });
  }
}
