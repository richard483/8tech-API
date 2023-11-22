import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserFilterRequest {
  @ApiProperty()
  @IsEmail()
  readonly field: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly keyword: string;

  @ApiProperty()
  @IsString()
  readonly sort: string;
}
