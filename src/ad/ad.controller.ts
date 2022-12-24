import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdService } from './ad.service';
import { Response } from 'express';
import { ADDto } from './dto/ad.gto';

@Controller('ad')
export class AdController {
  constructor(private readonly adService: AdService) {}

  @UsePipes(ValidationPipe)
  @Put()
  async updateADUser(
    @Body() body: ADDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      await this.adService.updateADUser(body);
      return res.status(HttpStatus.OK).json({ result: true });
    } catch (e) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ result: false, error: e.message });
    }
  }

  @Get()
  async getAdUsers(@Res() res: Response): Promise<Response> {
    try {
      const adUsers = await this.adService.getAdUsers();
      return res.status(HttpStatus.OK).json({ result: true, data: adUsers });
    } catch (e) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ result: false, error: e.message });
    }
  }
}
