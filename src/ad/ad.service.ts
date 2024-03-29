import { LoggerService } from '@app/logger/logger.service';
import { Injectable } from '@nestjs/common';
import {
  AD_ADD_ERROR,
  AD_DELETE_ERROR,
  AD_GET_USERS_ERROR,
  AD_GROUP,
  REGEXP_AD_NAME,
  REGEXP_AD_UERNAME,
} from './ad.consts';
import { ADDto } from './dto/ad.gto';
import { AdActionTypes } from './types/enum';
import { exec, ExecException } from 'child_process';
import { UtilsService } from '@app/utils/utils.service';

@Injectable()
export class AdService {
  constructor(private readonly log: LoggerService) {}

  public async updateADUser(data: ADDto) {
    try {
      const { action, user } = data;
      switch (action) {
        case AdActionTypes.add:
          return await this.addADUserToGroup(user);
        case AdActionTypes.delete:
          return await this.deleteADUserToGroup(user);
        default:
          break;
      }
    } catch (e) {
      this.log.error(e);
      throw e;
    }
  }

  private async addADUserToGroup(user: string) {
    return new Promise((resolve, reject) => {
      try {
        exec(
          `Add-ADGroupMember "${AD_GROUP}" "${user}"`,
          { shell: 'powershell', encoding: 'utf8' },
          (error: ExecException | null, stdout: string) => {
            if (error !== null)
              reject(`${AD_ADD_ERROR} для пользователя ${user}`);
            resolve({});
          },
        );
      } catch (e) {
        this.log.error(e);
        reject(`${AD_ADD_ERROR} для пользователя ${e}`);
      }
    });
  }
  private async deleteADUserToGroup(user: string) {
    return new Promise((resolve, reject) => {
      try {
        exec(
          `Remove-ADGroupMember -Confirm:$false -Identity "${AD_GROUP}" -Member ${user}`,
          { shell: 'powershell', encoding: 'utf8' },
          (error: ExecException | null, stdout: string) => {
            if (error !== null)
              reject(`${AD_DELETE_ERROR} для пользователя ${user}`);
            resolve({});
          },
        );
      } catch (e) {
        reject(`${AD_DELETE_ERROR} ${e}`);
      }
    });
  }

  public async getAdUsers() {
    return new Promise((resolve, reject) => {
      try {
        exec(
          `chcp 65001`,
          { encoding: 'utf8' },
          (error: ExecException | null) => {
            if (error) {
              this.log.error(String(error));
              reject({
                message: AD_GET_USERS_ERROR,
              });
            }
            exec(
              `Get-ADGroupmember ${AD_GROUP}`,
              { shell: 'powershell', encoding: 'binary' },
              (error: ExecException | null, stdout: string) => {
                if (error) {
                  this.log.error(String(error));
                  reject({
                    message: AD_GET_USERS_ERROR,
                  });
                }
                const outArray = stdout.split('\n');
                const filterOut = UtilsService.getFilterRegexp(
                  outArray,
                  REGEXP_AD_NAME,
                );
                const formatAdUsers = UtilsService.formatArray(
                  filterOut,
                  REGEXP_AD_UERNAME,
                );
                resolve(formatAdUsers);
              },
            );
          },
        );
      } catch (e) {
        reject(`${AD_GET_USERS_ERROR} ${e}`);
      }
    });
  }
}
