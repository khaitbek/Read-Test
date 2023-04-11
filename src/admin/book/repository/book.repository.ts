import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { BookEntity } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '@utils/pagination.dto';
import { BaseResponse } from '@utils/base.response';
import { getStatusCode } from '@utils/helper';
import { HttpStatus } from '@nestjs/common';
import { NewBookDto } from '../dto/newBook.dto';
import { ImageEntity } from '../entities/image.entity';
import { UpdateBookDto } from '../dto/updateBook.dto';
import { dataSource } from '@utils/dataSource';

@CustomRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {
  async getBooks(
    dto?: PaginationDto,
  ): Promise<BaseResponse<{ data: BookEntity[]; total: number }>> {
    try {
      const [bookEntities, total] = await this.findAndCount({
        ...dto,
        relations: {
          category: true,
          author: true,
          image: true,
        },
      });

      return {
        status: HttpStatus.OK,
        data: { data: bookEntities, total },
        msg: 'OK',
      };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async getBookById(id: number): Promise<BaseResponse<BookEntity>> {
    try {
      const bookEntity = await this.findOne({
        where: { id },
        relations: {
          category: true,
          image: true,
          author: true,
        },
      });

      if (!bookEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The book is not found',
        };
      }

      return { status: HttpStatus.OK, data: bookEntity, msg: 'OK' };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async getBookByTitle(title: string): Promise<BaseResponse<BookEntity>> {
    try {
      const bookEntity = await this.findOne({
        where: { title },
        relations: {
          category: true,
          image: true,
          author: true,
        },
      });

      if (!bookEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The book is not found',
        };
      }

      return { status: HttpStatus.OK, data: bookEntity, msg: 'OK' };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async createBook(
    dto: NewBookDto,
    filename: string,
  ): Promise<BaseResponse<BookEntity>> {
    const queryRunner = dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const bookEntity = await queryRunner.manager.findOneBy(BookEntity, {
        title: dto.title,
      });

      if (bookEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The book is already created',
        };
      }

      const imageEntity = await queryRunner.manager.save(ImageEntity, {
        img: filename,
      });

      const newBookEntity = await queryRunner.manager.save(BookEntity, {
        title: dto.title,
        author: {
          id: dto.authorId,
        },
        image: {
          id: imageEntity.id,
        },
        category: {
          id: dto.categoryId,
        },
        count: dto.count,
        desc: dto.desc,
        year: dto.year,
        rating: dto.rating,
        pages: dto.pages,
        price: dto.price,
      });

      await queryRunner.commitTransaction();

      return {
        status: HttpStatus.CREATED,
        data: newBookEntity,
        msg: 'CREATED',
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return { status: getStatusCode(err), data: null, msg: err.message };
    } finally {
      await queryRunner.release();
    }
  }

  async updateBook(
    id: number,
    dto: UpdateBookDto,
  ): Promise<BaseResponse<BookEntity>> {
    try {
      const bookEntity = await this.findOneBy({
        id,
      });

      if (!bookEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The book is not found',
        };
      }

      bookEntity.desc = dto.desc;
      bookEntity.price = dto.price;
      bookEntity.count = dto.count;
      bookEntity.rating = dto.rating;

      await this.save(bookEntity);
      return { status: HttpStatus.OK, data: bookEntity, msg: 'UPDATED' };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async deleteBook(id: number): Promise<BaseResponse<null>> {
    try {
      const bookEntity = await this.findOneBy({ id });

      if (!bookEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The book is not found',
        };
      }

      await this.softDelete({ id });
      return { status: HttpStatus.OK, data: null, msg: 'DELETED' };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }
}
