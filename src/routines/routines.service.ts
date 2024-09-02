import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { PaginationDto } from 'src/common';
import { Genre } from './types/routines.types';
import { RpcException } from '@nestjs/microservices';
import { AddExerciseToRoutineDto } from './dto/add-exercise-to-routine.dto';

@Injectable()
export class RoutinesService extends PrismaClient {

  private readonly logger = new Logger('RoutinesService');

  constructor(private prisma: PrismaService) {
    super();
  }

  create(createRoutineDto: CreateRoutineDto) {
    return this.routine.create({
      data: createRoutineDto,
    })
  }

  findAllForClients(){
    return this.routine.findMany({
      where: {
        show: true,
      }
    }); 
  }

  async findAll( paginationDto: PaginationDto, genre: Genre = Genre.MALE ) {
    const { page, limit } = paginationDto;

    const totalPages = await this.routine.count();
    const lastPage = Math.ceil(totalPages / limit);

    return {
      metadata: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
      data: await this.routine.findMany({
        take: limit,
        skip: limit * (page - 1),
      })
    }
  }

  async findOne(id: number) {
    const routine = await this.routine.findUnique({
      where: {
        id: id,
      },
      include: {
        routine_exercise: {
          include: {
            exercise: true,
          }
        },
      }
    })

    if(!routine) {
      throw new RpcException({
        message: `routine not found with id ${id}`,
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return routine;
  }

  async update(id: number, updateRoutineDto: UpdateRoutineDto) {

    const {id: _, ...data} = updateRoutineDto;

    await this.findOne(id);

    return this.routine.update({
      data: data,
      where: {
        id: id,
      },
    })
  }

  async addExerciseToRoutine(addExerciseToRoutineDto: AddExerciseToRoutineDto){

    const {exercise_id, routine_id} = addExerciseToRoutineDto;

    return this.routine_excercise.create({
      data: {
        exercise_id: exercise_id,
        routine_id: routine_id,
      }
    })

  }

  async removeExerciseFromRoutine(addExerciseToRoutineDto: AddExerciseToRoutineDto){
    const {exercise_id, routine_id} = addExerciseToRoutineDto;

    const routineExercise = await this.routine_excercise.findFirst({
      where: {
        exercise_id,
        routine_id,
      },
    });

    if(!routineExercise){
      throw new RpcException({
        message: `routineExercise no record found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return this.routine_excercise.delete({
      where: {
        id: routineExercise.id,
      },
    });
  }

  

}
