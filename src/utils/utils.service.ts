import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  static getFilterRegexp(array: string[], regexp: RegExp): string[] {
    const nameArray = array.filter((a: string) => {
      return regexp.test(a);
    });
    return nameArray;
  }

  static formatArray(array: string[], regexp: RegExp): string[] {
    const adUsers = array.map((a) => {
      return a.replace(regexp, `$1`);
    });
    return adUsers;
  }
}
