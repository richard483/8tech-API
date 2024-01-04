import {
  Body,
  Controller,
  Get,
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
import { JobFilterRequest } from './dto/job-filter.request';

@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  async createJob(@Res() res, @Body() job: JobCreateDto) {
    console.log(
      `#createJob request incoming with res: ${res} and data: ${job}`,
    );
    const response = await this.jobService.create(job);
    return response;
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'jobId', type: String })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('delete/:jobId')
  async deleteJob(@Res() res, @Param() params: any) {
    console.log(
      `#deleteJob request incoming with res: ${res} and params: ${params}`,
    );
    const response = await this.jobService.delete(params.jobId);
    return response;
  }

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('update')
  async updateJob(@Res() res, @Body() job: JobUpdateDto) {
    const response = await this.jobService.update(job);
    return response;
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'jobId', type: String })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/:jobId')
  async getjob(@Res() res, @Param() params: any) {
    const response = await this.jobService.getById(params.jobId);
    return response;
  }

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('filter')
  async filter(@Res() res, @Body() data: JobFilterRequest) {
    const response = await this.jobService.findManyByList(data);
    return response;
  }
}
