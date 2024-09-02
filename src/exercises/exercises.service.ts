import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ExercisesService extends PrismaClient {

  private readonly logger = new Logger('ExercisesService');

  constructor(private prisma: PrismaService) {
    super();
  }

  create(createExerciseDto: CreateExerciseDto) {
    return this.exercise.create({
      data: createExerciseDto,
    })
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const totalPages = await this.exercise.count();
    const lastPage = Math.ceil(totalPages / limit);

    return {
      metadata: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
      data: await this.exercise.findMany({
        take: limit,
        skip: limit * (page - 1),
      })
    }
    

  }

  async findOne(id: number) {
   const exercise = await this.exercise.findUnique({
      where: {
        id: id,
      },
      include: {
        muscle_exercise: {
          include: {
            muscle: true,
          }
        }
      }
    })

    if(!exercise) {
      throw new RpcException({
        message: `exercise not found with id ${id}`,
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return exercise;
  }

  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    const {id: _, ...data} = updateExerciseDto;

    await this.findOne(id);

    return this.exercise.update({
      data: data,
      where: {
        id: id,
      },
    })
  }

  async remove(id: number) {

    await this.findOne(id);

    console.log(id);

    return this.exercise.delete({
      where: {
        id: id,
      },
    })
  }

  async relatedExercises(exerciseId: number){

    const exerciseWithMuscles = await this.exercise.findUnique({
      where: { id: exerciseId },
      include: {
        muscle_exercise: {
          include: {
            muscle: true,  // Obtener los músculos relacionados
          },
        },
      },
    });
  
    // Extraer los IDs de los músculos relacionados
    const muscleIds = exerciseWithMuscles.muscle_exercise.map((me) => me.muscle_id);
  
    // Paso 2: Obtener otros ejercicios que entrenen los mismos músculos
    const relatedExercises = await this.exercise.findMany({
      where: {
        muscle_exercise: {
          some: {
            muscle_id: {
              in: muscleIds,  // Filtrar por los mismos músculos
            },
          },
        },
        id: {
          not: exerciseId,  // Excluir el ejercicio original
        },
      },
      include: {
        muscle_exercise: {
          include: {
            muscle: true,  // Incluir información de los músculos si es necesario
          },
        },
      },
    });
  
    return relatedExercises;
  }
}
