import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JobUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly title?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly companyId?: string;
}
