import { Module } from '@nestjs/common';
import { LessonTypesService } from './lesson_types.service';
import { LessonTypesController } from './lesson_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonType } from 'src/entities/lesson_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonType])],
  controllers: [LessonTypesController],
  providers: [LessonTypesService],
  exports: [LessonTypesService],
})
export class LessonTypesModule {}
