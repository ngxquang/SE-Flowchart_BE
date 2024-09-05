import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLessonTypeDto } from './dto/create-lesson_type.dto';
import { UpdateLessonTypeDto } from './dto/update-lesson_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonType } from 'src/entities/lesson_type.entity';

@Injectable()
export class LessonTypesService {
  constructor(
    @InjectRepository(LessonType)
    private lessonTypeRepository: Repository<LessonType>,
  ) {}

  async create(createLessonTypeDto: CreateLessonTypeDto) {
    try {
      const newLessonType =
        this.lessonTypeRepository.create(createLessonTypeDto);
      const savedLessonType =
        await this.lessonTypeRepository.save(newLessonType);
      return {
        message: 'Tạo mới loại bài học thành công',
        statusCode: 200,
        data: savedLessonType,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tạo mới loại bài học',
        );
    }
  }

  async findAll(take = 10, skip = 0) {
    try {
      const options = {
        take,
        skip,
      };
      const lessonTypes = await this.lessonTypeRepository.find(options);
      if (lessonTypes.length === 0) {
        throw new NotFoundException('Không tìm thấy loại bài học');
      }

      return {
        message: 'Tìm thấy danh sách loại bài học',
        statusCode: 200,
        data: lessonTypes,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm danh sách loại bài học',
        );
    }
  }

  async findOne(id: number) {
    try {
      const lessonType = await this.lessonTypeRepository.findOne({
        where: { id },
      });

      if (!lessonType) {
        throw new NotFoundException('Không tìm thấy loại bài học');
      }

      return {
        message: 'Tìm thấy loại bài học',
        statusCode: 200,
        data: lessonType,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm loại bài học',
        );
    }
  }

  async update(id: number, updateLessonTypeDto: UpdateLessonTypeDto) {
    try {
      const lessonType = (await this.findOne(id)).data;
      if (lessonType) {
        Object.assign(lessonType, updateLessonTypeDto);
        const savedLessonType =
          await this.lessonTypeRepository.save(lessonType);
        return {
          message: 'Cập nhật loại bài học thành công',
          statusCode: 200,
          data: savedLessonType,
        };
      }
      throw new NotFoundException('Không tìm thấy loại bài học');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình cập nhật loại bài học',
        );
    }
  }

  async remove(id: number) {
    try {
      const lessonType = (await this.findOne(id)).data;
      if (lessonType) {
        await this.lessonTypeRepository.remove(lessonType);
        return {
          message: 'Xóa loại bài học thành công',
          statusCode: 200,
          data: lessonType,
        };
      }
      throw new NotFoundException('Không tìm thấy loại bài học');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình xóa loại bài học',
        );
    }
  }
}
