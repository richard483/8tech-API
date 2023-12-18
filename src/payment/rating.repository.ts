import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RatingRepository {
  public model;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.rating;
  }

  async update(ratingId: string, data: any): Promise<any> {
    return this.prisma.rating.update({
      where: {
        id: ratingId,
      },
      data,
    });
  }
}
