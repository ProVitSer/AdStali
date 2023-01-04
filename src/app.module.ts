import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import configuration from '@app/config/config.provides';
import { AdModule } from './ad/ad.module';
import { UtilsService } from './utils/utils.service';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    LoggerModule,
    AdModule,
  ],
  controllers: [],
  providers: [UtilsService],
  exports: [ConfigModule],
})
export class AppModule {}
