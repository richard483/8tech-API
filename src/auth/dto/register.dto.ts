import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class RegisterRequestDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'MUST_NOT_BE_EMPTY',
  })
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
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'INVALID_PASSWORD',
  })
  @IsNotEmpty({
    message: 'MUST_NOT_BE_EMPTY',
  })
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'MUST_NOT_BE_EMPTY',
  })
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'MUST_NOT_BE_EMPTY',
  })
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'MUST_NOT_BE_EMPTY',
  })
  readonly lastName: string;

  @ApiProperty()
  @IsOptional()
  readonly isRecruiter: boolean;

  @ApiProperty()
  @IsOptional()
  readonly companyId: string;
}
