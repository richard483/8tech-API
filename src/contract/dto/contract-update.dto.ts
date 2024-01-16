import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ContractUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({
    message: 'MUST_NOT_BE_EMPTY',
  })
  readonly id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly userId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly jobId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly paymentId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  readonly paymentRate: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly template?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly status?: string;

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
