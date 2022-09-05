import { NestFactory } from '@nestjs/core';
import { DistributionModule } from './distribution.module';

async function bootstrap() {
  const app = await NestFactory.create(DistributionModule);
  app.setGlobalPrefix("distribution");
  await app.listen(3000);
}
bootstrap();
