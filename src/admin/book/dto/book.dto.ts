import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class BookDto {
  @IsOptional()
  @Transform((data) => {
    try {
      return +data.value;
    } catch (err) {
      return data.value;
    }
  })
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string;
}
