import { LoggerService } from '@app/logger/logger.service';
import { LowdbService } from '@app/lowdb/lowdb.service';
import { ADInfo } from '@app/lowdb/types/interfaces';
import { Injectable } from '@nestjs/common';
import { QueryRequest } from './types/interfaces';
const { execSync } = require('child_process');
import { v1 as uuid } from 'uuid'
import * as moment from 'moment';

@Injectable()
export class ApiService {
    constructor(
        private readonly lowdb: LowdbService,
        private readonly log: LoggerService
    ){}

    public async addADUserToGroup(data: QueryRequest){
        try{
            const stdout = execSync(`Add-ADGroupMember "${data.group}" ${data.user}`, { 'shell': 'powershell' }).toString();
            await this.addQueryInfo(data);
            return stdout;
        }catch(e){
           this.log.error(e);
           throw e;
        }
    }

    public async deleteADUserToGroup(data: ADInfo){
        try{
            const stdout = execSync(`Remove-ADGroupMember -Confirm:$false -Identity "${data.group}" -Member ${data.user}`, { 'shell': 'powershell' }).toString();
            return stdout;
        }catch(e){
           this.log.error(e);
           throw e;
        }
    }

    private async addQueryInfo(data: QueryRequest){
        const info: ADInfo = {
            id: uuid(),
            startDate: moment().format('YYYY-MM-DD'),
            endDate: data.dateTo,
            user: data.user,
            group: data.group
        }

        return await this.lowdb.insert(info, 'activeDirectory')
    }

}
