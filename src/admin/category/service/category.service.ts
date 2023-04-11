import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../repository/category.repository';
import { CategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async getCategories() {
    return await this.categoryRepository.getCategories();
  }

  async getCategoryById(id: number) {
    return await this.categoryRepository.getCategoryById(id);
  }

  async createCategory(dto: CategoryDto) {
    return await this.categoryRepository.createCategory(dto);
  }

  async updateCategory(id: number, dto: CategoryDto) {
    return await this.categoryRepository.updateCategory(id, dto);
  }

  async deleteCategory(id: number) {
    return await this.categoryRepository.deleteCategory(id);
  }
}
