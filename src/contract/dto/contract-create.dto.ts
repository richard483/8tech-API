import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsNumber()
  readonly paymentRate: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly paymentId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly template?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly customField?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly workSubmission?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly ratingId?: string;
}
