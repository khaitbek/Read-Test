import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class NewBookDto {
  @ApiProperty({ description: 'book tittle', type: String, required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'book price', type: Number, required: true })
  @IsNotEmpty()
  @Transform((data) => {
    try {
      return Number(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'book description',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  desc: string;

  @ApiProperty({ description: 'book pages', type: Number, required: true })
  @IsNotEmpty()
  @Transform((data) => {
    try {
      return Number(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  pages: number;

  @ApiProperty({ description: 'book rating', type: Number, required: true })
  @IsNotEmpty()
  @Transform((data) => {
    try {
      return Number(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  rating: number;

  @ApiProperty({ description: 'book count', type: Number, required: true })
  @IsNotEmpty()
  @Transform((data) => {
    try {
      return Number(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  count: number;

  @ApiProperty({
    description: 'book published year',
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @Transform((data) => {
    try {
      return Number(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'book category id',
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @Transform((data) => {
    try {
      return Number(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ description: 'book author id', type: Number, required: true })
  @IsNotEmpty()
  @Transform((data) => {
    try {
      return Number(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  authorId: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
