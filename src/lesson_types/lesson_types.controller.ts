import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { LessonTypesService } from './lesson_types.service';
import { CreateLessonTypeDto } from './dto/create-lesson_type.dto';
import { UpdateLessonTypeDto } from './dto/update-lesson_type.dto';

@Controller('lesson-types')
export class LessonTypesController {
  constructor(private readonly lessonTypesService: LessonTypesService) {}

  @Post()
  create(@Body(ValidationPipe) createLessonTypeDto: CreateLessonTypeDto) {
    return this.lessonTypesService.create(createLessonTypeDto);
  }

  @Get()
  findAll() {
    return this.lessonTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonTypesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateLessonTypeDto: UpdateLessonTypeDto,
  ) {
    return this.lessonTypesService.update(id, updateLessonTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lessonTypesService.remove(id);
  }
}
