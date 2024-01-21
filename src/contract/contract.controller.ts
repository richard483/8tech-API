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
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
import { Contract } from '@prisma/client';
import { ContractUpdateDto } from './dto/contract-update.dto';

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

  @ApiBearerAuth()
  @Roles(Role.RECRUITER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('update')
  async updateContract(@Res() res, @Body() data: ContractUpdateDto) {
    console.info('#ContractUpdate request incoming with: ', data);
    const { id, ...contract } = data;
    const response = await this.contractService.update(id, contract);
    return response;
  }

  @Get('generate/:contractId')
  @ApiParam({ name: 'contractId', type: String })
  @Roles(Role.RECRUITER)
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
  @Get('userId/:userId')
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiParam({ name: 'userId', type: String })
  async getAllbyUserId(@Res() res, @Param('userId') userId: string) {
    console.info('#getAllbyUserId request incoming with: ', userId);
    const response: Contract[] = await this.contractService.getAllbyUserId(
      userId,
    );
    return response;
  }

  @ApiBearerAuth()
  @Get('jobId/:jobId')
  @Roles(Role.RECRUITER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiParam({ name: 'jobId', type: String })
  async getAllbyJobId(@Res() res, @Param('jobId') jobId: string) {
    console.info('#getAllbyJobId request incoming with: ', jobId);
    const response: Contract[] = await this.contractService.getAllbyJobId(
      jobId,
    );
    return response;
  }

  @ApiBearerAuth()
  @Get('Id/:Id')
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiParam({ name: 'Id', type: String })
  async getContractbyId(@Res() res, @Param('Id') Id: string) {
    console.info('#getContractbyId request incoming with: ', Id);
    const response: Contract = await this.contractService.getContractbyId(Id);
    return response;
  }

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
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
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('payoutLink/:contractId')
  @ApiParam({ name: 'contractId', type: String })
  async createPayoutLink(@Res() res, @Param() params: any) {
    console.info('#CreatePayoutLink request incoming with: ', params);
    const response: IContractPayoutLink =
      await this.contractService.createPayout(params.contractId);
    return response;
  }

  @Roles(Role.RECRUITER)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBody({
    type: Object,
    description: 'it receive page, size like this: {page: 1, size: 5}',
  })
  @ApiResponse({
    description:
      'it will return  paginated contract that include the job vacancy info & payment',
  })
  @Post('recruiterContractList')
  async getRecruiterContractList(@Req() req, @Body() data: any) {
    console.info('#getRecruiterContractList request incoming with: ', data);
    const response = await this.contractService.getContractByCompanyId(
      req.user.companyId,
      data.page,
      data.size,
    );
    return response;
  }
}
