import { ApiProperty } from '@nestjs/swagger';

export class JobFilterRequest {
  @ApiProperty()
  readonly field?: string;

  @ApiProperty()
  readonly keyword?: string;

  @ApiProperty()
  readonly sort?: string;

  @ApiProperty()
  readonly page?: number;

  @ApiProperty()
  readonly size?: number;
}
