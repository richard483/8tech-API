import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { EWalletChannelCode } from 'xendit-node/payment_request/models';

export class ContractPaymentRequestCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly ewalletCode: EWalletChannelCode;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly contractId: string;
}
