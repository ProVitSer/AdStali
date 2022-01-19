import { ApiModule } from '@app/api/api.module';
import { LoggerModule } from '@app/logger/logger.module';
import { LowdbModule } from '@app/lowdb/lowdb.module';
import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';

@Module({
  imports: [LoggerModule,LowdbModule, ApiModule],
  providers: [SyncService]
})
export class SyncModule {}
