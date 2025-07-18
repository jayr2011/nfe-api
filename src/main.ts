import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.setBaseViewsDir(resolve('./views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('API NFE')
    .setDescription('API for managing NFE operations')
    .setVersion('1.0')
    .addTag('nfe')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
