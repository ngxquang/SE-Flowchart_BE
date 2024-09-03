import { Module } from '@nestjs/common';
import { LessonGroupsService } from './lesson_groups.service';
import { LessonGroupsController } from './lesson_groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonGroup } from 'src/entities/lesson_group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonGroup])],
  controllers: [LessonGroupsController],
  providers: [LessonGroupsService],
})
export class LessonGroupsModule {}
