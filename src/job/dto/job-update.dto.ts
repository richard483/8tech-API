import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class JobUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly id?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly companyId?: string;
}
