import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CompanyCreateDto } from './dto/company-create.dto';
import { CompanyUpdateDto } from './dto/company-update.dto';

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
  async updateCompany(@Res() res, @Body() data: CompanyUpdateDto) {
    const response = await this.companyService.update(data);
    return response;
  }
}
