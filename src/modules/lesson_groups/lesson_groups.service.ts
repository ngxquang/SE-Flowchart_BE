import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLessonGroupDto } from './dto/create-lesson_group.dto';
import { UpdateLessonGroupDto } from './dto/update-lesson_group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonGroup } from 'src/entities/lesson_group.entity';
import { Repository } from 'typeorm';
import { TopicsService } from '../topics/topics.service';

@Injectable()
export class LessonGroupsService {
  constructor(
    @InjectRepository(LessonGroup)
    private readonly lessonGroupsRepository: Repository<LessonGroup>,
    private topicsService: TopicsService,
  ) {}

  async create(createLessonGroupDto: CreateLessonGroupDto) {
    try {
      const newLessonGroup =
        this.lessonGroupsRepository.create(createLessonGroupDto);
      const topic = (
        await this.topicsService.findOne(createLessonGroupDto.topicId)
      ).data;

      if (!topic) {
        throw new NotFoundException('Chủ đề không tồn tại');
      }

      newLessonGroup.topic = topic;

      const savedLessonGroup =
        await this.lessonGroupsRepository.save(newLessonGroup);

      return {
        message: 'Tạo mới nhóm bài học thành công',
        statusCode: 200,
        data: {
          id: savedLessonGroup.id,
          name: savedLessonGroup.name,
          topic: {
            id: topic.id,
            name: topic.name,
          },
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tạo mới nhóm bài học',
        );
    }
  }

  async findAll(topicId?: number, take = 10, skip = 0) {
    try {
      const options = {
        where: {},
        relations: [],
        take,
        skip,
      };

      if (topicId) {
        options.where['topic'] = { id: topicId };
      } else {
        options.relations = ['topic'];
      }

      const lessonGroups = await this.lessonGroupsRepository.find(options);

      if (lessonGroups.length === 0) {
        throw new NotFoundException({
          message: 'Không tìm thấy nhóm bài học',
          statusCode: 404,
          data: [],
        });
      }

      return {
        message: 'Tìm thấy danh sách nhóm bài học',
        statusCode: 200,
        data: lessonGroups,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm danh sách nhóm bài học',
        );
    }
  }

  async findOne(id: number) {
    try {
      const lessonGroup = await this.lessonGroupsRepository.findOne({
        where: { id },
        relations: ['topic'],
      });

      if (!lessonGroup) {
        throw new NotFoundException('Không tìm thấy nhóm bài học');
      }

      return {
        message: 'Tìm thấy nhóm bài học',
        statusCode: 200,
        data: lessonGroup,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm nhóm bài học',
        );
    }
  }

  async update(id: number, updateLessonGroupDto: UpdateLessonGroupDto) {
    try {
      const lessonGroup = (await this.findOne(id)).data;
      if (!lessonGroup) {
        throw new NotFoundException('Không tìm thấy nhóm bài học');
      }
      if (updateLessonGroupDto.topicId) {
        const topic = (
          await this.topicsService.findOne(updateLessonGroupDto.topicId)
        ).data;
        if (!topic) {
          throw new NotFoundException('Không tìm thấy chủ đề');
        }
        lessonGroup.topic = topic;
      }
      Object.assign(lessonGroup, updateLessonGroupDto);

      const savedLessonGroup =
        await this.lessonGroupsRepository.save(lessonGroup);
      return {
        message: 'Cập nhật nhóm bài học thành công',
        statusCode: 200,
        data: {
          id: savedLessonGroup.id,
          name: savedLessonGroup.name,
          topic: {
            id: savedLessonGroup.topic.id,
            name: savedLessonGroup.topic.name,
          },
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình cập nhật nhóm bài học',
        );
    }
  }

  async remove(id: number) {
    try {
      const lessonGroup = (await this.findOne(id)).data;
      if (lessonGroup) {
        await this.lessonGroupsRepository.remove(lessonGroup);
        return {
          message: 'Xóa nhóm bài học thành công',
          statusCode: 200,
          data: lessonGroup,
        };
      }
      throw new NotFoundException('Không tìm thấy nhóm bài học');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình xóa nhóm bài học',
        );
    }
  }
}
