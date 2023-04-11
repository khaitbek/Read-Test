import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseSwagger {
  @ApiProperty()
  status: number;

  @ApiProperty()
  data: string;

  @ApiProperty()
  msg: string;
}
