import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RatingCreateDto } from './dto/rating-create.dto';

@Injectable()
export class RatingRepository {
  public model;

  constructor(private prisma: PrismaService) {
    this.model = this.prisma.rating;
  }

  async create(rating: RatingCreateDto): Promise<any> {
    return this.prisma.rating.create({
      data: rating,
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
}
