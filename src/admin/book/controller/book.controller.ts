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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '@utils/multer.conf';
import { FilePipeBuilder } from '@utils/filePipeBuilder';
import { NewBookDto } from '../dto/newBook.dto';
import { BookService } from '../service/book.service';
import { JwtGuard } from '@auth/guard/jwt.guard';
import { PaginationDto } from '@utils/pagination.dto';
import { Response } from 'express';
import { UpdateBookDto } from '../dto/updateBook.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiCreatedResponse({ description: 'New book' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  async createBook(
    @UploadedFile(FilePipeBuilder) file: Express.Multer.File,
    @Body() dto: NewBookDto,
    @Res() res: Response,
  ) {
    const response = await this.bookService.createBook(file.filename, dto);
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: 'Book' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiQuery({ name: 'skip', type: Number, required: false })
  @ApiQuery({ name: 'take', type: Number, required: false })
  @Get('/all')
  async getBooks(@Query() query: PaginationDto, @Res() res: Response) {
    const response = await this.bookService.getBooks(query);
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: 'Found book' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiParam({ name: 'id', description: 'book id', required: true })
  @Get(':id')
  async getBookById(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const response = await this.bookService.getBookById(id);
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: 'Found book' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiQuery({ name: 'title', description: 'book title', required: true })
  @Get()
  async getBookByTitle(@Query('title') title: string, @Res() res: Response) {
    const response = await this.bookService.getBookByTitle(title);
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: 'Updated book' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiParam({ name: 'id', description: 'book id', required: true })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookDto,
    @Res() res: Response,
  ) {
    const response = await this.bookService.updateBook(id, dto);
    res.status(response.status).json(response);
  }

  @ApiOkResponse({ description: 'Deleted book' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Unknown server error' })
  @ApiParam({ name: 'id', description: 'book id', required: true })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteBook(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const response = await this.bookService.deleteBook(id);
    res.status(response.status).json(response);
  }
}
