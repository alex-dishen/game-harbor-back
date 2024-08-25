import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { EnvVariable } from './shared/types/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger ------- Start -------
  const config = new DocumentBuilder()
    .setTitle('Game Harbor')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  // Swagger ------- End -------

  app.use(cookieParser(process.env[EnvVariable.COOKIE_SECRET]));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
