import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@user/user/user.module';
import { SeedModule } from './seed/seed.module';
import { AuthModule } from '@auth/auth.module';
import { configuration } from '@utils/config';
import { AuthorModule } from '@admin/author/author.module';
import { BookModule } from '@admin/book/book.module';
import { CategoryModule } from '@admin/category/category.module';
import { dataSource } from '@utils/dataSource';
import { DataSource } from 'typeorm';
import { AdminOrderModule } from '@admin/admin-order/admin-order.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(configuration.getTypeOrmConfig()),
    ScheduleModule.forRoot(),
    CronModule,
    UserModule,
    SeedModule,
    AuthModule,
    AuthorModule,
    BookModule,
    CategoryModule,
    AdminOrderModule,
  ],
  controllers: [],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        const logger = new Logger('DataSource');
        try {
          await dataSource.initialize();
          logger.log('Data Source has been initialized');
          return dataSource;
        } catch (e) {
          console.log(e);
          logger.error('Error during Data Source initialization', e);
        }
      },
    },
  ],
})
export class AppModule {}
