import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AdService } from './ad.service';
import { AdController } from './ad.controller';
import { LoggerModule } from '@app/logger/logger.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [LoggerModule],
  providers: [AdService],
  controllers: [AdController],
})
export class AdModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes(AdController);
  }
}
