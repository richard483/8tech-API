import { ApiProperty } from '@nestjs/swagger';

export class UserFilterRequest {
  @ApiProperty()
  readonly field?: string;

  @ApiProperty()
  readonly keyword?: string;

  @ApiProperty()
  readonly sort?: string;
}
