import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDto } from './create-exercise.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {

  @IsNumber()
  @IsPositive()
  id: number;

}
