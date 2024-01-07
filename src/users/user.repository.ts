import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { pagination, returnablePaginated } from '../prisma/prisma.util';
import { UserFilterRequest } from './requests/user-filter.request';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  public model;
  private orderBy;
  private field;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.user;

    this.orderBy = {
      username: { username: 'asc' },
      '-username': { username: 'desc' },
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
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });
  }

  async findOnebyEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOnebyId(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOnebyUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async create(user: any): Promise<User> {
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

  async update(id: string, data: any): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async findManyByFieldAndSortBy(reqData: UserFilterRequest): Promise<any> {
    const result = this.prisma.user.findMany({
      ...pagination(reqData.page, reqData.size),
      where: this.field[reqData.field]
        ? this.field[reqData.field](reqData.keyword)
        : this.field['description'](reqData.keyword),
      orderBy: this.orderBy[reqData.sort] || this.orderBy['-createdAt'],
    });

    const total = this.prisma.user.count({
      where: this.field[reqData.field]
        ? this.field[reqData.field](reqData.keyword)
        : this.field['description'](reqData.keyword),
    });

    return Promise.all([result, total])
      .then((values) => {
        const [data, total] = values;
        return returnablePaginated(data, total, reqData.page, reqData.size);
      })
      .catch((e) => {
        console.log(
          '#UserRepository findManyByFieldAndSortBy error caused by: ',
          e,
        );
        throw new HttpException('INVALID_QUERY_REQUEST', 400);
      });
  }

  async updateUserGoogleStatus(email: string, value: boolean): Promise<User> {
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
