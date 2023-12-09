import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Bank } from '../../contract/enum/bank.enum';

export class ContractCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly jobId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly paymentRate: number;

  @ApiProperty({ enum: Bank })
  @IsNotEmpty()
  @IsString()
  readonly bankName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly bankAccountName?: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly bankAccountNumber?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly template: string;
}
