import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configuration } from '@utils/config';
import { join } from 'path';
import * as process from 'process';

const logger = new Logger('Main');
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Read City')
    .setDescription('ReadCity API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useStaticAssets(join(process.cwd(), 'public'));

  await app.listen(8080);
}
bootstrap()
  .then(() => {
    logger.log(`Service is running at [${configuration.port || 3000}]`);
  })
  .catch((err) => {
    logger.error(err);
  });
