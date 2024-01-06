import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CompanyCreateDto } from './dto/company-create.dto';
import { Roles } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.enum';
import { CompanyUpdateDto } from './dto/company-update.dto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  async createCompany(@Res() res, @Body() data: CompanyCreateDto) {
    const response = await this.companyService.create(data);
    return response;
  }

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('update')
  async updateCompany(@Res() res, @Body() data: CompanyUpdateDto) {
    const response = await this.companyService.update(data);
    return response;
  }
}
