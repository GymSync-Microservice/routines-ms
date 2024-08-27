import { PartialType } from '@nestjs/mapped-types';
import { CreateRoutineDto } from './create-routine.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateRoutineDto extends PartialType(CreateRoutineDto) {

  @IsNumber()
  @IsPositive()
  id: number;

}
