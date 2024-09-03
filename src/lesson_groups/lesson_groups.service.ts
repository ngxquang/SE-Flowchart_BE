import { Injectable } from '@nestjs/common';
import { CreateLessonGroupDto } from './dto/create-lesson_group.dto';
import { UpdateLessonGroupDto } from './dto/update-lesson_group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonGroup } from 'src/entities/lesson_group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonGroupsService {
  constructor(
    @InjectRepository(LessonGroup)
    private readonly lessonGroupsRepository: Repository<LessonGroup>,
  ) {}

  create(createLessonGroupDto: CreateLessonGroupDto) {
    return 'This action adds a new lessonGroup';
  }

  findAll(topicId?: number) {
    //topicId=2
    if (topicId) {
      return [
        {
          id: 3,
          name: 'Cấu trúc điều khiển tuần tự',
          topic: {
            id: 2,
            name: 'Hướng dẫn giải lưu đồ thuật toán',
          },
        },
        {
          id: 4,
          name: 'Cấu trúc vòng lặp.',
          repo: {
            id: 2,
            name: 'Hướng dẫn giải lưu đồ thuật toán',
          },
        },
      ];
      return this.lessonGroupsRepository.findBy({ topic: { id: topicId } });
    }
    return [
      {
        id: 1,
        name: 'Cấu trúc điều khiển tuần tự',
        topic: {
          id: 1,
          name: 'Lưu đồ thuật toán',
        },
      },
      {
        id: 2,
        name: 'Cấu trúc vòng lặp.',
        repo: {
          id: 1,
          name: 'Lưu đồ thuật toán',
        },
      },
      {
        id: 3,
        name: 'Cấu trúc điều khiển tuần tự',
        topic: {
          id: 2,
          name: 'Hướng dẫn giải lưu đồ thuật toán',
        },
      },
      {
        id: 4,
        name: 'Cấu trúc vòng lặp.',
        repo: {
          id: 2,
          name: 'Hướng dẫn giải lưu đồ thuật toán',
        },
      },
    ];
    return this.lessonGroupsRepository.find({
      relations: ['topic'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonGroup`;
  }

  update(id: number, updateLessonGroupDto: UpdateLessonGroupDto) {
    return `This action updates a #${id} lessonGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonGroup`;
  }
}
