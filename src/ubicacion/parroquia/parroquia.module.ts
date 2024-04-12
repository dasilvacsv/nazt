import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParroquiaService } from './parroquia.service';
import { ParroquiaController } from './parroquia.controller';
import { Parroquia } from '../entities/parroquia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parroquia])],
  providers: [ParroquiaService],
  controllers: [ParroquiaController],
})
export class ParroquiaModule {}
