import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaymentCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly paymentRequestId: string;
}
