import { IsNumber, IsPositive } from 'class-validator';


export class AddExerciseToRoutineDto {

  @IsNumber()
  @IsPositive()
  exercise_id: number;

  @IsNumber()
  @IsPositive()
  routine_id: number;

}