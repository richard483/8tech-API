import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../auth/roles/role.enum';

export class UserCreateRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail(
    {
      allow_display_name: false,
    },
    {
      message: 'INVALID_EMAIL',
    },
  )
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ enum: Role })
  @IsArray()
  readonly roles?: string[];
}
