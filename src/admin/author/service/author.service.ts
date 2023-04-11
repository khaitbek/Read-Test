import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorRepository } from '../repository/author.repository';
import { AuthorDto } from '../dto/create.author.dto';
import { UpdateAuthorDto } from '../dto/update.author.dto';
import { PaginationDto } from '@utils/pagination.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,
  ) {}

  async getAuthor(name: string) {
    return await this.authorRepository.getAuthorByName(name);
  }

  async createAuthor(dto: AuthorDto) {
    return await this.authorRepository.createAuthor(dto);
  }

  async updateAuthor(id: number, dto: UpdateAuthorDto) {
    return await this.authorRepository.updateAuthor(id, dto);
  }

  async deleteAuthor(id: number) {
    return await this.authorRepository.deleteAuthor(id);
  }

  async getAuthorById(id: number) {
    return await this.authorRepository.getAuthorById(id);
  }

  async getAuthors(pagination: PaginationDto) {
    return await this.authorRepository.getAuthors(pagination);
  }
}
