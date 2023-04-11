import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({
    description: 'book description',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  desc?: string;

  @ApiProperty({ description: 'book price', type: Number, required: false })
  @IsOptional()
  @Transform((data) => {
    try {
      return Number(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  price?: number;

  @ApiProperty({ description: 'book count', type: Number, required: false })
  @IsOptional()
  @Transform((data) => {
    try {
      return Number(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  count?: number;

  @ApiProperty({ description: 'book rating', type: Number, required: false })
  @IsOptional()
  @Transform((data) => {
    try {
      return Number(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  rating?: number;
}
