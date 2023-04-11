import { PartialType } from '@nestjs/swagger';
import { AuthorDto } from '@admin/author/dto/create.author.dto';

export class UpdateAuthorDto extends PartialType(AuthorDto) {}
