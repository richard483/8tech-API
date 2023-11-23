import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserRepository {
  public model;
  private orderBy;
  private field;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.user;

    this.orderBy = {
      userName: { name: 'asc' },
      '-userName': { name: 'desc' },
      createdAt: { createdAt: 'asc' },
      '-createdAt': { createdAt: 'desc' },
      description: { description: 'asc' },
      '-description': { description: 'desc' },
      previousWorkplace: {
        previousWorkplaceCount: 'asc',
      },
      '-previousWorkplace': {
        previousWorkplaceCount: 'desc',
      },
      ratings: { ratingsAvg: 'asc' },
      '-ratings': {
        ratingsAvg: 'desc',
      },
    };

    this.field = {
      description(keyword: string) {
        return {
          description: {
            contains: keyword || '',
          },
        };
      },
      previousWorkplaceId(keyword: string) {
        return {
          previousWorkplaceId: {
            has: keyword || '',
          },
        };
      },
    };
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
    const data = {
      ...user,
      previousWorkplaceCount: user.previousWorkplaceId?.length,
      ratingsAvg:
        user.ratings
          ?.map((rating) => rating.ratingOf10)
          .reduce((a, b) => a + b, 0) / user.ratings?.length,
    };
    return this.prisma.user.create({
      data,
    });
  }

  async findManyByFieldAndSortBy(
    field: string,
    keyword: string,
    sort: string,
  ): Promise<IUser[] | null> {
    return this.prisma.user.findMany({
      where: field
        ? this.field[field](keyword)
        : this.field['description'](keyword),
      orderBy: this.orderBy[sort] || this.orderBy['-createdAt'],
    });
  }

  async updateUserGoogleStatus(email: string, value: boolean): Promise<IUser> {
    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        hasGoogleAccount: value,
      },
    });
  }
}
