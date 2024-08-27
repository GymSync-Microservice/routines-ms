import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-db.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaDbModule {}
