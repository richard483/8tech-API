import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { JobService } from './job.service';
import { JobCreateDto } from './dto/job-create.dto';
import { Roles } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.enum';
import { JobUpdateDto } from './dto/job-update.dto';

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
      console.error('#createJob error caused by: ', error);
      return res.status(error.status).json({ error: error.message });
    }
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'jobId', type: String })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('delete/:jobId')
  async deleteJob(@Res() res, @Param() params: any) {
    try {
      const response = await this.jobService.delete(params.jobId);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      console.error('#deleteJob error caused by: ', error);
      return res.status(error.status).json({ error: error.message });
    }
  }

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('update')
  async updateJob(@Res() res, @Body() job: JobUpdateDto) {
    try {
      const response = await this.jobService.update(job);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      console.error('#updateJob error caused by: ', error);
      return res.status(error.status).json({ error: error.message });
    }
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'jobId', type: String })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/:jobId')
  async getjob(@Res() res, @Param() params: any) {
    try {
      const response = await this.jobService.getById(params.jobId);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      console.error('#getJob error caused by: ', error);
      return res.status(error.status).json({ error: error.message });
    }
  }
}
