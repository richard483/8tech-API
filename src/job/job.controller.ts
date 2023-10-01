import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JobService } from './job.service';
import { JobCreateDto } from './dto/job-create.dto';
import { Roles } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.enum';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  async createJob(@Res() res, @Body() job: JobCreateDto) {
    try {
      const response = await this.jobService.create(job);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }
}
