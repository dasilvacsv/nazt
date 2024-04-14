import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger Documentacion
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('CIFF WEBAPP')
    .setDescription('Complejo Industrial Fabrica de Fabricas')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('documentacion', app, document);
  const configService = app.get(ConfigService);
  const ORIGIN = configService.get<string>('ORIGIN');
  app.enableCors({
    origin: 'http://localhost:5173',  
    credentials: true, 
  });
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
