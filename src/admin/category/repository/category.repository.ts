import { CustomRepository } from '@dec/typeorm-ex.decorator';
import { CategoryEntity } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { BaseResponse } from '@utils/base.response';
import { getStatusCode } from '@utils/helper';
import { HttpStatus } from '@nestjs/common';
import { CategoryDto } from '../dto/category.dto';

@CustomRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
  async getCategories(): Promise<
    BaseResponse<{ data: CategoryEntity[]; total: number }>
  > {
    try {
      const [categoryEntities, total] = await this.findAndCount();
      return {
        status: HttpStatus.OK,
        data: { data: categoryEntities, total },
        msg: 'OK',
      };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async getCategoryById(id: number): Promise<BaseResponse<CategoryEntity>> {
    try {
      const categoryEntity = await this.findOneBy({ id });

      if (!categoryEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The category is not found',
        };
      }

      return { status: HttpStatus.OK, data: categoryEntity, msg: 'OK' };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async createCategory(
    dto: CategoryDto,
  ): Promise<BaseResponse<CategoryEntity>> {
    try {
      const categoryEntity = await this.findOneBy({ name: dto.name });

      if (categoryEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The category is already created',
        };
      }

      const newCategoryEntity = await this.create({
        name: dto.name,
      });
      await this.save(newCategoryEntity);

      return {
        status: HttpStatus.CREATED,
        data: newCategoryEntity,
        msg: 'CREATED',
      };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async updateCategory(
    id: number,
    dto: CategoryDto,
  ): Promise<BaseResponse<CategoryEntity>> {
    try {
      const categoryEntity = await this.findOneBy({ id });

      if (!categoryEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The category is not found',
        };
      }

      categoryEntity.name = dto.name;
      await categoryEntity.save();

      return { status: HttpStatus.OK, data: categoryEntity, msg: 'UPDATED' };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }

  async deleteCategory(id: number): Promise<BaseResponse<null>> {
    try {
      const categoryEntity = await this.findOneBy({ id });

      if (!categoryEntity) {
        return {
          status: HttpStatus.BAD_REQUEST,
          data: null,
          msg: 'The category is not found',
        };
      }
      await categoryEntity.softRemove();

      return { status: HttpStatus.OK, data: null, msg: 'DELETED' };
    } catch (err) {
      return { status: getStatusCode(err), data: null, msg: err.message };
    }
  }
}
