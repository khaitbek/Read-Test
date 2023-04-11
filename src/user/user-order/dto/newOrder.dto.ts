import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class NewOrderDto {
  @ApiProperty({
    description: 'user name',
    type: String,
    required: true,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @ApiProperty({ description: 'user email', type: String, required: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'user phone number',
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({ description: 'book id', type: Number, required: true })
  @IsNotEmpty()
  @Transform((data) => {
    try {
      return Number(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  bookId: number;

  @ApiProperty({ description: 'user location', type: String, required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @Transform((data) => {
    try {
      return Boolean(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsBoolean()
  isActive: boolean;
}
