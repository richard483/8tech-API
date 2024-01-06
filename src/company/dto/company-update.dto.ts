import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CompanyUpdateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly profilePicture: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description: string;
}
