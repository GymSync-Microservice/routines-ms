import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { Days, Genre } from '../types/routines.types';


export class CreateRoutineDto {

  @IsString()
  public name: string;

  @IsBoolean()
  public show: boolean;

  @IsEnum(Genre)
  public genre: Genre;
  
  @IsEnum(Days)
  public day: Days; 

}
