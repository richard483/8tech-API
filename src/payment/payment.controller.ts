import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { Roles } from '../auth/roles/role.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';
import { Role } from '../auth/roles/role.enum';
import { PaymentRequestCreateDto } from './dto/payment-request-create.dto';
import { PayoutLinkCreateDto } from './dto/payout-link-create.dto';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('createPaymentRequest')
  async createPaymentRequest(
    @Res() res,
    @Body() data: PaymentRequestCreateDto,
  ) {
    console.log('#createPaymentRequest request incoming with data: ', data);
    const response = await this.paymentService.createPaymentRequest(data);
    return response;
  }

  @ApiBearerAuth()
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('createPayoutLink')
  async createPayoutLink(@Res() res, @Body() data: PayoutLinkCreateDto) {
    console.log('#createPayoutLink request incoming with data: ', data);
    const response = await this.paymentService.createPayoutLink(data);
    return response;
  }
}
