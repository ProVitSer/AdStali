import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import configuration from '@app/config/config.provides';
import { LowdbModule } from './lowdb/lowdb.module';
import { ApiModule } from './api/api.module';
import { LoggerService } from './logger/logger.service';
import { SyncModule } from './sync/sync.module';
import { ApiService } from './api/api.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), LoggerModule, LowdbModule, ApiModule, SyncModule],
  controllers: [AppController],
  providers: [AppService, LoggerService, ApiService],
  exports: [ConfigModule]
})
export class AppModule {}
