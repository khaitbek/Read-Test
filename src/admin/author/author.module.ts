import { Module } from '@nestjs/common';
import { AuthorController } from './controller/author.controller';
import { AuthorService } from './service/author.service';
import { TypeOrmExModule } from '@dec/typeorm-ex.module';
import { AuthorRepository } from './repository/author.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([AuthorRepository])],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
