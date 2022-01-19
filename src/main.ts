import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from '@app/config/config.provides';
import { BadRequestException, HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const config = new ConfigService(configuration());
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((error) => {
            return {
                message: `Поле ${error.property} имеет некорректно значение ${error.value}.`,
            }
        })
        return new HttpException(messages[0], HttpStatus.BAD_REQUEST);
         
    }
  }));
  await app.listen(config.get('appPort'));
}
bootstrap();
