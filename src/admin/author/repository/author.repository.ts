import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { AuthorEntity } from '../entities/author.entity';
import { ILike, Repository } from 'typeorm';
import { AuthorDto } from '../dto/create.author.dto';
import { BaseResponse } from '@utils/base.response';
import { HttpStatus } from '@nestjs/common';
import { getStatusCode } from '@utils/helper';
import { UpdateAuthorDto } from '../dto/update.author.dto';
import { PaginationDto } from '@utils/pagination.dto';

@CustomRepository(AuthorEntity)
export class AuthorRepository extends Repository<AuthorEntity> {
  async getAuthorByName(
    name: string,
  ): Promise<
    BaseResponse<{ data: AuthorEntity | AuthorEntity[]; total: number }>
  > {
    try {
      const likeOperator = ILike(`%${name}%`);
      const [authorEntities, total] = await this.findAndCount({
        where: {
          name: likeOperator,
        },
      });

      return {
        status: HttpStatus.OK,
        data: { data: authorEntities, total },
        msg: 'OK',
      };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async createAuthor(dto: AuthorDto): Promise<BaseResponse<AuthorEntity>> {
    try {
      const authorEntity = await this.findOneBy({
        name: dto.name,
        dateOfBirth: dto.dateOfBirth,
      });

      if (authorEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The author already exists',
        };
      }

      const newAuthorEntity = await AuthorEntity.create({
        ...dto,
      });

      await AuthorEntity.save(newAuthorEntity);

      return {
        status: HttpStatus.CREATED,
        data: newAuthorEntity,
        msg: 'CREATED',
      };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async updateAuthor(
    id: number,
    dto: UpdateAuthorDto,
  ): Promise<BaseResponse<AuthorEntity>> {
    try {
      const authorEntity = await this.findOneBy({ id });

      if (!authorEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The author is not found',
        };
      }

      authorEntity.name = dto.name;
      authorEntity.dateOfBirth = dto.dateOfBirth;
      authorEntity.dateOfDeath = dto.dateOfDeath;
      authorEntity.description = dto.description;
      authorEntity.image = dto.image;
      await this.save(authorEntity);

      return { status: HttpStatus.OK, data: authorEntity, msg: 'UPDATED' };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async deleteAuthor(id: number): Promise<BaseResponse<null>> {
    try {
      const authorEntity = await this.findOneBy({ id });

      if (!authorEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The author is not found',
        };
      }

      await this.softDelete({
        id: id,
      });

      return { status: HttpStatus.OK, data: null, msg: 'DELETED' };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async getAuthorById(id: number): Promise<BaseResponse<AuthorEntity>> {
    try {
      const authorEntity = await this.findOneBy({ id });

      if (!authorEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The author is not found',
        };
      }

      return { status: HttpStatus.OK, data: authorEntity, msg: 'OK' };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async getAuthors(
    pagination: PaginationDto,
  ): Promise<BaseResponse<{ data: AuthorEntity[]; total: number }>> {
    try {
      const [authorEntities, total] = await this.findAndCount({
        ...pagination,
      });

      return {
        status: HttpStatus.OK,
        data: { data: authorEntities, total },
        msg: 'OK',
      };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }
}
