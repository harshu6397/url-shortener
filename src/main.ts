import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { validationConfig } from './config/validation.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use the validation configuration in the global validation pipe
  app.useGlobalPipes(new ValidationPipe(validationConfig));

  // Apply Global Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Apply Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Apply Swagger
  setupSwagger(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
