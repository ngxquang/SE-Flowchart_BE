import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from 'src/entities/lesson.entity';
import { LessonGroupsModule } from '../lesson_groups/lesson_groups.module';
import { LessonTypesModule } from '../lesson_types/lesson_types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson]),
    LessonGroupsModule,
    LessonTypesModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
