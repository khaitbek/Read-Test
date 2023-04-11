import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthorService } from '../service/author.service';
import { JwtGuard } from '@auth/guard/jwt.guard';
import { AuthorDto } from '../dto/create.author.dto';
import { UpdateAuthorDto } from '../dto/update.author.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationDto } from '@utils/pagination.dto';

@ApiTags('author')
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOkResponse({ description: 'Authors' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiQuery({ name: 'skip', type: Number, required: false })
  @ApiQuery({ name: 'take', type: Number, required: false })
  @Get('/all')
  async getAuthors(@Query() query: PaginationDto, @Res() res: Response) {
    const response = await this.authorService.getAuthors(query);
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: 'Found author' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server info' })
  @ApiQuery({
    name: 'name',
    type: String,
    description: 'Author name',
    required: true,
  })
  @Get()
  async getAuthor(@Query('name') name: string, @Res() res: Response) {
    const response = await this.authorService.getAuthor(name);
    res.status(response.status).json(response);
  }

  @ApiCreatedResponse({ description: 'New author' })
  @ApiForbiddenResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async createAuthor(@Body() dto: AuthorDto, @Res() res: Response) {
    const response = await this.authorService.createAuthor(dto);
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: "Update author's credentials" })
  @ApiForbiddenResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'id', type: Number, required: true })
  @UseGuards(JwtGuard)
  @Patch()
  async updateAuthor(
    @Query('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAuthorDto,
    @Res() res: Response,
  ) {
    const response = await this.authorService.updateAuthor(id, dto);
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: "Delete author's credentials" })
  @ApiForbiddenResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiBearerAuth()
  @ApiQuery({ name: 'id', type: Number, required: true })
  @UseGuards(JwtGuard)
  @Delete()
  async deleteAuthor(
    @Query('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const response = await this.authorService.deleteAuthor(id);
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: "Author's credentials" })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiParam({ name: 'id', type: Number, required: true })
  @Get(':id')
  async getAuthorById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const response = await this.authorService.getAuthorById(id);
    res.status(response.status).json(response);
  }
}
