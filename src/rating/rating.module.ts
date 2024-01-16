import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { PrismaService } from '../prisma/prisma.service';
import { RatingController } from './rating.controller';
import { RatingRepository } from './rating.repository';
import { ContractRepository } from '../contract/contract.repository';

@Module({
  providers: [
    RatingService,
    PrismaService,
    RatingRepository,
    ContractRepository,
  ],
  exports: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
