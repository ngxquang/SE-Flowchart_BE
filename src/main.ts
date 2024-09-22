import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { AllExceptionsFilter } from './common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('server is running');
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3001);
}
bootstrap();
