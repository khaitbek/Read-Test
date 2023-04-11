import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ description: 'book name', type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;
}
