import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService],
  imports: [PrismaDbModule],
})
export class ExercisesModule {}
