import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { AllExceptionsFilter } from './common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('server is running');
  app.enableCors({
    origin: 'http://localhost:3000', // Cho phép domain cụ thể
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Phương thức HTTP được phép
    credentials: true, // Cho phép gửi cookies với request
  });
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3001);
}
bootstrap();
