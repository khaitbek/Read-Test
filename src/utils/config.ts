import { join } from 'path';
import * as process from 'process';
import { DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configuration = {
  isProduction: false,
  port: process.env['PORT'],
  getDataSourceConfig(): DataSourceOptions {
    return {
      type: 'postgres' as any,
      host: process.env['DB_HOST'] || 'localhost',
      port: parseInt(process.env['DB_PORT']) || 5432,
      url: 'postgresql://postgres:ea6f2e11ea6f2e@db.utfpyqxksmjpdqhrbaec.supabase.co:5432/postgres',
      entities: [join(__dirname, `../**/entities/**.entity.{ts,js}`)],
      synchronize: true,
    };
  },

  getTypeOrmConfig(): TypeOrmModuleOptions {
    const ormConfig: TypeOrmModuleOptions = {
      type: 'postgres',
      host: process.env['DB_HOST'],
      port: parseInt(process.env['DB_PORT']),
      username: process.env['DB_USERNAME'],
      password: process.env['DB_PASSWORD'],
      database: process.env['DB_DATABASE'],
      entities: [join(__dirname, `../**/entities/**.entity.{ts,js}`)],
      synchronize: true,
      logging: false,
      url: 'postgresql://postgres:ea6f2e11ea6f2e@db.utfpyqxksmjpdqhrbaec.supabase.co:5432/postgres',
    };

    // WARNING!!! Don't change to TRUE in PRODUCTION
    // if TRUE auto changed DB by Entity model
    // if (configuration.isProduction) {
    //   ormConfig.synchronize = false;
    // }
    return ormConfig;
  },
};
