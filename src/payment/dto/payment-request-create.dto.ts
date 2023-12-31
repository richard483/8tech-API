import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { EWalletChannelCode } from 'xendit-node/payment_request/models';

export class PaymentRequestCreateDto {
  @ApiProperty()
  readonly type?: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty()
  @IsNotEmpty()
  readonly ewalletChannelCode: EWalletChannelCode;
}
