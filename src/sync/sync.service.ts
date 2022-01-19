import { ApiService } from '@app/api/api.service';
import { LoggerService } from '@app/logger/logger.service';
import { LowdbService } from '@app/lowdb/lowdb.service';
import { ADInfo } from '@app/lowdb/types/interfaces';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment';

@Injectable()
export class SyncService {
    constructor(
        private readonly log: LoggerService,
        private readonly lowdb: LowdbService,
        private readonly service: ApiService
    ){}

    onApplicationBootstrap() {}

    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async updateADUsers(){
        const result = await this.getADUsersForUpdateToday();
        await this.deleteADUser(result)
    }


    private async getADUsersForUpdateToday(): Promise<ADInfo[]>{
        return await this.lowdb.findByEndDate(moment().format('YYYY-MM-DD'), 'activeDirectory')
    }

    private async deleteADUser(data: ADInfo[]){
        return await Promise.all( data.map( async (user: ADInfo) => {
            await this.service.deleteADUserToGroup(user);
            await this.lowdb.delete(user.id, 'activeDirectory')
        }))

    }
    
}
