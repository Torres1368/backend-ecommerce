import { APP_FILTER, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //validacion de los decoradores DTO
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  //end validacion decoradores DTO

  //swagger para la documentacion 
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  //-------------end-----------------------
  // Aplica el filtro globalmente
  app.useGlobalFilters(new HttpExceptionFilter());
  //prefijo 
  app.setGlobalPrefix('api')
  //

  //para permitir las solicitud del navegador al backend 
  app.enableCors();
  //-----end
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
