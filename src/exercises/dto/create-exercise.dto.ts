import { IsNotEmpty, IsNumber, IsString, Min, MinLength } from 'class-validator';


export class CreateExerciseDto {
  
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @Min(1)
  sets: number;
  
  @IsNumber()
  @Min(1)
  reps: number;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  @MinLength(5)
  image_url: string;
  
  @IsString()
  @MinLength(5)
  video_url: string;

}
