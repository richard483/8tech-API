import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Res,
  UseGuards,
  StreamableFile,
  Header,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.enum';
import { ContractService } from './contract.service';
import { ContractCreateDto } from './dto/contract-create.dto';
import { createReadStream } from 'fs';
import { join } from 'path';

@ApiTags('Contract')
@Controller('contract')
export class ContractController {
  constructor(private contractService: ContractService) {}

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  async createContract(@Res() res, @Body() contract: ContractCreateDto) {
    try {
      const response = await this.contractService.create(contract);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      return res.status(error.status).json({ error: error.message });
    }
  }

  //9432dae7-ba04-410a-a4ff-27d6da87ae63
  @Get('generate/:contractId')
  @Roles(Role.USER)
  @Header('Content-Type', 'application/pdf')
  async generateContract(
    @Res({ passthrough: true }) res,
    @Param() params: any,
  ) {
    const contractId = params.contractId;
    try {
      await this.contractService.generate(contractId);
      const file = createReadStream(
        join(process.cwd(), '/src/contract/temp/', `${params.contractId}.pdf`),
      );
      return await new StreamableFile(file);
    } catch (error) {
      console.error('#generateContract error caused by: ', error);
      return res.status(error.status).json({ error: error.message });
    } finally {
      this.contractService.removeFile(contractId);
      console.log(
        '#generateContract removed residual file for contractId: ',
        contractId,
      );
    }
  }
}
