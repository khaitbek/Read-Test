import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '@admin/book/entities/image.entity';
import { CronService } from './cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  providers: [CronService],
  controllers: [],
})
export class CronModule {}
