import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CompanyCreateDto } from './dto/company-create.dto';
import { CompanyUpdateDto } from './dto/company-update.dto';
import { Roles } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.enum';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('create')
  async createCompany(@Res() res, @Body() data: CompanyCreateDto) {
    const response = await this.companyService.create(data);
    return response;
  }

  @Post('update')
  @Roles(Role.RECRUITER, Role.RECRUITER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updateCompany(@Res() res, @Body() data: CompanyUpdateDto) {
    const response = await this.companyService.update(data);
    return response;
  }

  @Get('info/:companyId')
  @ApiParam({ name: 'companyId', type: String })
  async getInfo(@Res() res, @Param() params: any) {
    const response = await this.companyService.get(params.companyId);
    return response;
  }
}
