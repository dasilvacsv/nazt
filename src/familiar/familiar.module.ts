import { Module } from '@nestjs/common';
import { FamiliarService } from './familiar.service';
import { FamiliarController } from './familiar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Familiar } from './entities/familiar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Familiar])],
  exports: [FamiliarService],
  controllers: [FamiliarController],
  providers: [FamiliarService],
})
export class FamiliarModule {}
