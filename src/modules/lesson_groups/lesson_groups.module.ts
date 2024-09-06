import { Module } from '@nestjs/common';
import { LessonGroupsService } from './lesson_groups.service';
import { LessonGroupsController } from './lesson_groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonGroup } from 'src/entities/lesson_group.entity';
import { TopicsModule } from '../topics/topics.module';

@Module({
  imports: [TypeOrmModule.forFeature([LessonGroup]), TopicsModule],
  controllers: [LessonGroupsController],
  providers: [LessonGroupsService],
  exports: [LessonGroupsService],
})
export class LessonGroupsModule {}
