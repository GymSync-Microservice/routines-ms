import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { PaginationDto } from 'src/common';
import { Genre } from './types/routines.types';

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
        totalPages: totalPages,
        currentPage: page,
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
    })

    if(!routine) {
      throw new NotFoundException(`No routine found with id ${id}`);
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

}
