import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RatingService } from './rating.service';
import { RatingCreateDto } from './dto/rating-create.dto';
import { Roles } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.enum';
import { RatingUpdateDto } from './dto/rating-update.dto';

@ApiTags('Rating')
@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  async createRating(@Res() res, @Body() data: RatingCreateDto) {
    try {
      console.log(
        `#createRating request incoming with res: ${res} and data: ${data}`,
      );
      const response = await this.ratingService.create(data);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      console.error('#createJob error caused by: ', error);
      return res.status(error.status).json({ error: error.message });
    }
  }

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('update')
  async updateRating(@Res() res, @Body() data: RatingUpdateDto) {
    try {
      const response = await this.ratingService.update(data);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      console.error('#updateJob error caused by: ', error);
      return res.status(error.status).json({ error: error.message });
    }
  }
}
