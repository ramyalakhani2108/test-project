import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // to prevent accepting any other params which is not specified into dots and it doesn't stop the req,
      forbidNonWhitelisted: true, //stops processing further if property is not whitelisted
      transform: true, // transforms the object into dto class object
      transformOptions: {
        enableImplicitConversion: true, //validation pipe will take care of implicit conversion type so you dont have to write @Type everywhere
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
