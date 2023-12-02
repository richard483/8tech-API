import { Injectable } from '@nestjs/common';
import { RatingRepository } from './rating.repository';
import { IRating } from './interface/rating.interface';
import { RatingCreateDto } from './dto/rating-create.dto';
import { RatingUpdateDto } from './dto/rating-update.dto';

@Injectable()
export class RatingService {
  constructor(private ratingRepository: RatingRepository) {}

  async create(rating: RatingCreateDto): Promise<IRating> {
    return this.ratingRepository.create(rating);
  }

  async update(rating: RatingUpdateDto): Promise<IRating> {
    const { id, ...data } = rating;
    return this.ratingRepository.update(id, data);
  }
}
