import { Injectable } from '@nestjs/common';
import { RatingRepository } from './rating.repository';
import { RatingCreateDto } from './dto/rating-create.dto';
import { RatingUpdateDto } from './dto/rating-update.dto';
import { ContractRepository } from '../contract/contract.repository';
import { Rating } from '@prisma/client';

@Injectable()
export class RatingService {
  constructor(
    private ratingRepository: RatingRepository,
    private contractRepository: ContractRepository,
  ) {}

  async create(rating: RatingCreateDto): Promise<Rating> {
    const { contractId, ...data } = rating;
    const res = await this.ratingRepository.create(data);
    if (contractId) {
      this.contractRepository.update(contractId, {
        ratingId: res.id,
      });
    }
    return res;
  }

  async update(rating: RatingUpdateDto): Promise<Rating> {
    const { id, ...data } = rating;
    return this.ratingRepository.update(id, data);
  }

  async userRatingAverageCount(userId: string): Promise<any> {
    return this.ratingRepository.averageCount(userId);
  }
}
