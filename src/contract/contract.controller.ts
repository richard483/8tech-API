import {
  Body,
  Controller,
  Post,
  Get,
  Res,
  UseGuards,
  StreamableFile,
  Header,
  Param,
  Redirect,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.enum';
import { ContractService } from './contract.service';
import { ContractCreateDto } from './dto/contract-create.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { ContractPaymentRequestCreateDto } from './dto/contract-payment_request-create.dto';
import {
  IContractPaymentRequest,
  IContractPayoutLink,
} from './interface/contract.interface';

@ApiTags('Contract')
@Controller('contract')
export class ContractController {
  constructor(private contractService: ContractService) {}

  @ApiBearerAuth()
  @Roles(Role.RECRUITER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('create')
  async createContract(@Res() res, @Body() contract: ContractCreateDto) {
    console.info('#ContractCreate request incoming with: ', contract);
    const response = await this.contractService.create(contract);
    return response;
  }

  //9432dae7-ba04-410a-a4ff-27d6da87ae63
  @Get('generate/:contractId')
  @ApiParam({ name: 'contractId', type: String })
  @Roles(Role.USER)
  @Header('Content-Type', 'application/pdf')
  async generateContract(
    @Res({ passthrough: true }) res,
    @Param() params: any,
  ) {
    console.info('#ContractGenerate request incoming with: ', params);
    const contractId = params.contractId;
    try {
      await this.contractService.generate(contractId);
      const file = createReadStream(
        join(process.cwd(), '/src/contract/temp/', `${params.contractId}.pdf`),
      );
      return await new StreamableFile(file);
    } finally {
      this.contractService.removeFile(contractId);
      console.log(
        '#generateContract removed residual file for contractId: ',
        contractId,
      );
    }
  }

  @ApiBearerAuth()
  @Post('paymentRequest')
  async createPaymentRequest(
    @Res() res,
    @Body() params: ContractPaymentRequestCreateDto,
  ) {
    console.info('#CreatePaymentRequest request incoming with: ', params);
    const response: IContractPaymentRequest =
      await this.contractService.createPaymentRequest(
        params.contractId,
        params.ewalletCode,
      );
    return response;
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'contractId', type: String })
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('payment-success/:contractId')
  @Redirect()
  async updateSuccessPaymentRequest(@Res() res, @Param() params: any) {
    console.info(
      '#UpdateSuccessPaymentRequest request incoming with: ',
      params,
    );
    await this.contractService.updatePaymentStatusSuccess(params.contractId);
    res.redirect('https://www.youtube.com/watch?v=46cuX1IeVpU');
  }

  @ApiBearerAuth()
  @Get('payoutLink/:contractId')
  @ApiParam({ name: 'contractId', type: String })
  async createPayoutLink(@Res() res, @Param() params: any) {
    console.info('#CreatePayoutLink request incoming with: ', params);
    const response: IContractPayoutLink =
      await this.contractService.createPayout(params.contractId);
    return response;
  }
}
