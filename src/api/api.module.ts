import { LoggerModule } from '@app/logger/logger.module';
import { LowdbModule } from '@app/lowdb/lowdb.module';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [LoggerModule, LowdbModule],
  controllers: [ApiController],
  providers: [ApiService],
  exports:[ApiService]
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes(ApiController);
  }
}
