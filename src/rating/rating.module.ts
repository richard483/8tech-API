import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { PrismaService } from '../prisma/prisma.service';
import { RatingController } from './rating.controller';
import { RatingRepository } from './rating.repository';

@Module({
  providers: [RatingService, PrismaService, RatingRepository],
  exports: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
