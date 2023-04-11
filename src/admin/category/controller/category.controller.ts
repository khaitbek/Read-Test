import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CategoryService } from '../service/category.service';
import { JwtGuard } from '@auth/guard/jwt.guard';
import { CategoryDto } from '../dto/category.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOkResponse({ description: 'Book categories' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @Get()
  async getCategories(@Res() res: Response) {
    const response = await this.categoryService.getCategories();
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: 'Book category' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiParam({ name: 'id', type: Number, required: true })
  @Get(':id')
  async getCategoryById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const response = await this.categoryService.getCategoryById(id);
    res.status(response.status).json(response);
  }

  @ApiCreatedResponse({ description: 'New category' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async createCategory(@Body() dto: CategoryDto, @Res() res: Response) {
    const response = await this.categoryService.createCategory(dto);
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: 'Update category' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, required: true })
  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CategoryDto,
    @Res() res: Response,
  ) {
    const response = await this.categoryService.updateCategory(id, dto);
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: 'Delete category' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, required: true })
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const response = await this.categoryService.deleteCategory(id);
    res.status(response.status).json(response);
  }
}
