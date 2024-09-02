import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @MessagePattern({ cmd: 'create_exercise' })
  create(@Payload() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @MessagePattern({ cmd: 'find_all_exercises' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.exercisesService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'find_one_exercise' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.exercisesService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_exercise' })
  update(@Payload() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.update(+updateExerciseDto.id, updateExerciseDto);
  }

  @MessagePattern({ cmd: 'remove_exercise' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.exercisesService.remove(id);
  }

  @MessagePattern({ cmd: 'related_exercises' })
  relatedExercises(@Payload('id', ParseIntPipe) id: number){
    return this.exercisesService.relatedExercises(id);
  }
}
