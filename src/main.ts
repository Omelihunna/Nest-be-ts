import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTimeoutInterceptor } from './api-timeout.interceptor';
import helmet from 'helmet';
import { ZodExceptionFilter } from './zod-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // app.set('query parser', 'extended');
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.enableCors();
  app.useGlobalFilters(new ZodExceptionFilter())
  const configService = app.get(ConfigService);
  // const port: string = configService.get<string>('PORT') as string;  
  app.useGlobalInterceptors(new ApiTimeoutInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Session Backend')
    .setDescription('The Session API Description')
    .setVersion('1.0')
    .addTag('session')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT ?? 3230);
}
bootstrap();