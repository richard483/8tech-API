import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { pagination, returnablePaginated } from '../prisma/prisma.util';
import { UserFilterRequestDto } from './dto/user-filter.dto';
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

  async findManyByFieldAndSortBy(reqData: UserFilterRequestDto): Promise<any> {
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

  async getAppliedJob(
    userId: string,
    page: number,
    size: number,
  ): Promise<any> {
    let res;

    try {
      res = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          contract: {
            ...pagination(page, size),
            include: {
              jobVacancy: true,
              payment: true,
            },
            orderBy: {
              updatedAt: 'asc',
            },
          },
          _count: {
            select: {
              contract: true,
            },
          },
        },
      });
    } catch (e) {
      throw new HttpException({ prisma: e.message }, HttpStatus.BAD_REQUEST);
    }

    const jobList = res?.contract.map((contract) => {
      return {
        ...contract.jobVacancy,
        contractId: contract.id,
        contractStatus: contract.status,
        paymentStatus: contract.payment?.paymentStatus,
      };
    });
    const total = res?._count.contract;
    return returnablePaginated(jobList, total, page, size);
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
