import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readdirSync, unlinkSync } from 'fs';
import { join } from 'path';
import { ImageEntity } from '@admin/book/entities/image.entity';
import { Repository } from 'typeorm';
import * as process from 'process';
import { Cron } from '@nestjs/schedule';

const logger = new Logger('CronService');
@Injectable()
export class CronService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageEntity: Repository<ImageEntity>,
  ) {}

  @Cron('0 0 23 */3 * *')
  async unlinkUnusedFiles(): Promise<void> {
    logger.log('Cron service started...');
    try {
      const directoryPath = join(process.cwd(), 'public');
      const files: string[] = readdirSync(directoryPath);
      const images: string[] = [];

      const imageEntities = await this.imageEntity.find({
        select: ['img'],
      });

      for (const image of imageEntities) {
        images.push(image.img);
      }

      for (const file of files) {
        if (!images.includes(file)) {
          unlinkSync(join(directoryPath, file));
        }
      }

      logger.log('Cron service finished...');
    } catch (err) {
      logger.error(err);
    }
  }
}
