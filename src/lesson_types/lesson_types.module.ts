import { Module } from '@nestjs/common';
import { LessonTypesService } from './lesson_types.service';
import { LessonTypesController } from './lesson_types.controller';

@Module({
  controllers: [LessonTypesController],
  providers: [LessonTypesService],
})
export class LessonTypesModule {}
