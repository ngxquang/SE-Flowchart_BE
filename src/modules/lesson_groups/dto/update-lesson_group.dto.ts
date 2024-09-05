import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonGroupDto } from './create-lesson_group.dto';

export class UpdateLessonGroupDto extends PartialType(CreateLessonGroupDto) {}
