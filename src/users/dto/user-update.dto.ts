import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../../auth/roles/role.enum';

export class UserUpdateRequestDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'MUST_NOT_BE_EMPTY',
  })
  readonly id: string;

  @ApiProperty()
  @IsEmail(
    {
      allow_display_name: false,
    },
    {
      message: 'INVALID_EMAIL',
    },
  )
  @IsOptional()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly lastName: string;

  @ApiProperty({ isArray: true, enum: Role })
  readonly roles: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({})
  readonly previousWorkplace: any;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly companyId: string;

  @ApiProperty()
  @IsOptional()
  readonly portfolio: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly profilePicture: string;
}

export class UserUpdateRequestMeDto {
  @ApiProperty()
  @IsEmail(
    {
      allow_display_name: false,
    },
    {
      message: 'INVALID_EMAIL',
    },
  )
  @IsOptional()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly lastName: string;

  @ApiProperty({ isArray: true, enum: Role })
  readonly roles: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({})
  readonly previousWorkplace: any;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly companyId: string;

  @ApiProperty()
  @IsOptional()
  readonly portfolio: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly profilePicture: string;
}
