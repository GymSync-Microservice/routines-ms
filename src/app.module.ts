import { Module } from '@nestjs/common';
import { RoutinesModule } from './routines/routines.module';
import { PrismaDbModule } from './prisma-db/prisma-db.module';
import { ExercisesModule } from './exercises/exercises.module';

@Module({
  imports: [RoutinesModule, PrismaDbModule, ExercisesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
