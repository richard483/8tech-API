import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../../auth/roles/role.enum';

export class UserUpdateRequest {
  @ApiProperty()
  @IsNotEmpty({
    message: 'MUST_NOT_BE_EMPTY',
  })
  readonly id: string;

  @ApiProperty()
  @IsEmail()
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
  @IsString()
  @IsOptional()
  readonly portofolio: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly profilePicture: string;
}

export class UserUpdateRequestMe {
  @ApiProperty()
  @IsEmail()
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
  @IsString()
  @IsOptional()
  readonly portofolio: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly profilePicture: string;
}
