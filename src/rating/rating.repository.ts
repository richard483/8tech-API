import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RatingRepository {
  public model;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.rating;
  }

  async create(rating: any): Promise<any> {
    return this.prisma.rating
      .create({
        data: rating,
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      });
  }

  async update(ratingId: string, data: any): Promise<any> {
    return this.prisma.rating.update({
      where: {
        id: ratingId,
      },
      data,
    });
  }

  async averageCount(userId: string): Promise<any> {
    return this.prisma.rating.aggregate({
      _avg: {
        ratingOf10: true,
      },
      _count: {
        ratingOf10: true,
      },
      where: {
        userId,
      },
    });
  }
}
