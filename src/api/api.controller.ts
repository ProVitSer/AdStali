import { LoggerService } from '@app/logger/logger.service';
import { Controller, Inject, Post, Res, Req, Body, Query, } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiService } from './api.service';
import { ADDto } from './dto/ad.gto';

@Controller()
export class ApiController {

    constructor(
        private readonly log: LoggerService,
        private readonly service: ApiService
    ) { }

    @Post('ad*')
    async updateADUser(
        @Req() req: Request,
        @Query() query: ADDto,
        @Res() res: Response
    ): Promise<Response>{
        try{
            await this.service.addADUserToGroup(query);
            return res.status(200).json({message: 'Данные по пользователю успешно изменены'})
        }catch(e){
            res.status(503).json({message: `Проблемы с обновлением пользоватлея в AD ${e}`})
        }
    }

}
