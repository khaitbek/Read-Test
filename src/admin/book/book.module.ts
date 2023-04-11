import { Module } from '@nestjs/common';
import { BookController } from './controller/book.controller';
import { BookService } from './service/book.service';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { BookRepository } from './repository/book.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BookRepository])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
