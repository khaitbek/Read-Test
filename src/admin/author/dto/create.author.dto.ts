import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthorDto {
  @ApiProperty({ description: 'author name', type: String, required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Date of birth of author',
    type: Date,
    required: true,
  })
  @IsNotEmpty()
  @Transform((data) => {
    try {
      return new Date(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Date of death of author',
    type: Date,
    required: false,
  })
  @IsOptional()
  @Transform((data) => {
    try {
      return new Date(data.value);
    } catch (err) {
      return data.value;
    }
  })
  @IsDate()
  dateOfDeath?: Date;

  @ApiProperty({ description: 'about author', type: String, required: true })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'author image link',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;
}
