import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('routines')
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @MessagePattern({ cmd: 'create_routine' })
  create(@Payload() createRoutineDto: CreateRoutineDto) {
    return this.routinesService.create(createRoutineDto);
  }

  
  @MessagePattern({ cmd: 'find_all_routines' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.routinesService.findAll( paginationDto );
  }

  @MessagePattern({ cmd: 'find_all_routines_for_clients' })
  findAllForClients(){
    return this.routinesService.findAllForClients();
  }

  @MessagePattern({ cmd: 'find_one_routine' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.routinesService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_routine' })
  update(@Payload() updateRoutineDto: UpdateRoutineDto) {
    return this.routinesService.update(updateRoutineDto.id, updateRoutineDto);
  }
  
}
