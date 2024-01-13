import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateRequestDto {
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
  readonly password: string;
}
