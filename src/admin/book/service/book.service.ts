import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from '../repository/book.repository';
import { NewBookDto } from '../dto/newBook.dto';
import { PaginationDto } from '@utils/pagination.dto';
import { UpdateBookDto } from '../dto/updateBook.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async getBooks(dto: PaginationDto) {
    return await this.bookRepository.getBooks(dto);
  }

  async getBookById(id: number) {
    return await this.bookRepository.getBookById(id);
  }

  async getBookByTitle(title: string) {
    return await this.bookRepository.getBookByTitle(title);
  }

  async createBook(filename: string, dto: NewBookDto) {
    return await this.bookRepository.createBook(dto, filename);
  }

  async updateBook(id: number, dto: UpdateBookDto) {
    return await this.bookRepository.updateBook(id, dto);
  }

  async deleteBook(id: number) {
    return await this.bookRepository.deleteBook(id);
  }
}
