import { IsNotEmpty } from 'class-validator';

export class ADDto  {
    @IsNotEmpty()
    user: string;
    
    @IsNotEmpty()
    group: string;

    @IsNotEmpty()
    dateTo: string;
}