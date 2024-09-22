import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from 'src/entities/lesson.entity';
import { Repository } from 'typeorm';
import { LessonGroupsService } from '../lesson_groups/lesson_groups.service';
import { LessonTypesService } from '../lesson_types/lesson_types.service';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    private readonly lessonGroupsService: LessonGroupsService,
    private readonly lessonTypesService: LessonTypesService,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    try {
      const newLesson = this.lessonsRepository.create(createLessonDto);

      const lessonGroup = (
        await this.lessonGroupsService.findOne(createLessonDto.lessonGroupId)
      ).data;
      if (!lessonGroup) {
        throw new NotFoundException('Không tìm thấy nhóm bài học');
      }

      const lessonType = (
        await this.lessonTypesService.findOne(createLessonDto.lessonTypeId)
      ).data;
      if (!lessonType) {
        throw new NotFoundException('Không tìm thấy loại bài học');
      }

      newLesson.lessonGroup = lessonGroup;
      newLesson.lessonType = lessonType;

      const savedLesson = await this.lessonsRepository.save(newLesson);
      return {
        message: 'Tạo mới bài học thành công',
        statusCode: 200,
        data: {
          id: savedLesson.id,
          // lessonName: savedLesson.lessonName,
          description: savedLesson.description,
          image: savedLesson.image,
          status: savedLesson.status,
          urlMd: savedLesson.urlMd,
          flowChart: savedLesson.flowChart,
          statusFlowChart: savedLesson.statusFlowChart,
          createdAt: savedLesson.createdAt,
          lessonGroup: {
            id: lessonGroup.id,
            name: lessonGroup.name,
          },
          lessonType: {
            id: lessonType.id,
            name: lessonType.name,
          },
          deleteAt: savedLesson.deleteAt,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tạo mới bài học',
        );
    }
  }

  async findAll(
    lessonGroupId?: number,
    lessonTypeId?: number,
    take = 10,
    skip = 0,
  ) {
    try {
      const options = {
        where: {},
        relations: [],
        take,
        skip,
      };

      if (lessonGroupId) {
        options.where['lessonGroup'] = { id: lessonGroupId };
        options.relations = ['lessonType'];
      }

      if (lessonTypeId) {
        options.where['lessonType'] = { id: lessonTypeId };
        options.relations = ['lessonGroup'];
      }

      if (!(lessonGroupId || lessonTypeId) || (lessonGroupId && lessonTypeId)) {
        options.relations = ['lessonGroup', 'lessonType'];
      }

      const lessons = await this.lessonsRepository.find(options);

      if (lessons.length === 0) {
        throw new NotFoundException({
          message: 'Không tìm thấy bài học',
          statusCode: 404,
          data: [],
        });
      }

      return {
        message: 'Tìm thấy danh sách bài học',
        statusCode: 200,
        data: lessons,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm danh sách bài học',
        );
    }
  }

  async findOne(id: number) {
    try {
      const lesson = await this.lessonsRepository.findOne({
        where: { id },
        relations: ['lessonGroup', 'lessonType'],
      });

      if (!lesson) {
        throw new NotFoundException('Bài học không tồn tại');
      }

      return {
        message: 'Tìm thấy bài học',
        statusCode: 200,
        data: lesson,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm bài học',
        );
    }
  }

  async findOneByLessonName(lessonName: string, lessonTypeId: Number) {
    try {
      const lesson = await this.lessonsRepository
      .createQueryBuilder('lesson')
      .leftJoinAndSelect('lesson.lessonGroup', 'lessonGroup')
      .leftJoinAndSelect('lesson.lessonType', 'lessonType')
      .where('lesson.lessonName = :lessonName', { lessonName })
      .andWhere('lessonType.id = :lessonTypeId', { lessonTypeId })
      .getOne();

      if (!lesson) {
        throw new NotFoundException('Bài học không tồn tại');
      }

      return {
        message: 'Tìm thấy bài học theo tên bài học và loại bài học',
        statusCode: 200,
        data: lesson,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm bài học',
        );
    }
  }

  async update(id: number, updateLessonDto: UpdateLessonDto) {
    try {
      const lesson = (await this.findOne(id)).data;

      if (!lesson) {
        throw new NotFoundException('Không tìm thấy bài học');
      }

      if (updateLessonDto.lessonGroupId) {
        const lessonGroup = (
          await this.lessonGroupsService.findOne(updateLessonDto.lessonGroupId)
        ).data;
        if (!lessonGroup) {
          throw new NotFoundException('Không tìm thấy nhóm bài học');
        }
        lesson.lessonGroup = lessonGroup;
      }

      if (updateLessonDto.lessonTypeId) {
        const lessonType = (
          await this.lessonTypesService.findOne(updateLessonDto.lessonTypeId)
        ).data;
        if (!lessonType) {
          throw new NotFoundException('Không tìm thấy loại bài học');
        }
        lesson.lessonType = lessonType;
      }

      Object.assign(lesson, updateLessonDto);

      const savedLesson = await this.lessonsRepository.save(lesson);
      return {
        message: 'Cập nhật bài học thành công',
        statusCode: 200,
        data: {
          id: savedLesson.id,
          description: savedLesson.description,
          image: savedLesson.image,
          status: savedLesson.status,
          urlMd: savedLesson.urlMd,
          flowChart: savedLesson.flowChart,
          statusFlowChart: savedLesson.statusFlowChart,
          createdAt: savedLesson.createdAt,
          lessonGroup: {
            id: savedLesson.lessonGroup.id,
            name: savedLesson.lessonGroup.name,
          },
          lessonType: {
            id: savedLesson.lessonType.id,
            name: savedLesson.lessonType.name,
          },
          deleteAt: savedLesson.deleteAt,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình cập nhật bài học',
        );
    }
  }

  async remove(id: number) {
    try {
      const lesson = (await this.findOne(id)).data;

      if (!lesson) {
        throw new NotFoundException('Không tìm thấy bài học');
      }

      await this.lessonsRepository.softDelete(id);

      return {
        message: 'Xóa bài học thành công',
        statusCode: 200,
        data: lesson,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình xóa bài học',
        );
    }
  }
}
