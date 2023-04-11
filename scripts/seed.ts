import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SeedService } from '../src/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seedService = app.get(SeedService);

  await seedService.perform();
  await app.close();
}

bootstrap()
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  .then(() => {})
  .catch((e) => {
    console.log(e);
  });
