import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({
    description: 'left record number',
    required: false,
    default: 0,
  })
  @IsOptional()
  @Transform((data) => {
    try {
      return Number(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  skip?: number = 0;

  @ApiProperty({
    description: 'take record number',
    required: false,
    default: 10,
  })
  @IsOptional()
  @Transform((data) => {
    try {
      return Number(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  take?: number = 10;
}
