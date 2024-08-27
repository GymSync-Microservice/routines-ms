import { Module } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';

@Module({
  controllers: [RoutinesController],
  providers: [RoutinesService],
  imports: [PrismaDbModule],
})
export class RoutinesModule {}
