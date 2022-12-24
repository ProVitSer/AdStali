import { IsNotEmpty } from 'class-validator';
import { AdActionTypes } from '../types/enum';

export class ADDto {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  action: AdActionTypes;
}
