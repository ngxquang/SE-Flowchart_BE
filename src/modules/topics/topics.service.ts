import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from 'src/entities/topic.entity';
import { Repository } from 'typeorm';
import { ReposService } from '../repos/repos.service';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic) private topicRepository: Repository<Topic>,
    private reposService: ReposService,
  ) {}

  async create(createTopicDto: CreateTopicDto) {
    try {
      const newTopic = this.topicRepository.create(createTopicDto);
      const repo = (await this.reposService.findOne(+createTopicDto.repoId))
        .data;
      if (!repo) {
        throw new NotFoundException('Không tìm thấy kho lưu trữ');
      }
      newTopic.repo = repo;
      const savedTopic = await this.topicRepository.save(newTopic);
      console.log('>>savedTopic', savedTopic);
      return {
        message: 'Tạo mới chủ đề thành công',
        statusCode: 200,
        data: {
          id: savedTopic.id,
          name: savedTopic.name,
          repo: {
            id: repo.id,
            name: repo.name,
          },
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tạo mới chủ đề',
        );
      }
    }
  }

  async findAll(repoId?: number, take = 10, skip = 0) {
    try {
      const options = {
        where: {},
        relations: [],
        take,
        skip,
      };

      if (repoId) {
        options.where = { repo: { id: repoId } };
      } else {
        options.relations = ['repo'];
      }

      const topics = await this.topicRepository.find(options);

      if (topics.length === 0) {
        throw new NotFoundException({
          message: 'Không tìm thấy chủ đề',
          statusCode: 404,
          data: [],
        });
      }

      return {
        message: 'Tìm thấy danh sách chủ đề',
        statusCode: 200,
        data: topics,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm danh sách chủ đề',
        );
      }
    }
  }

  async findOne(id: number) {
    try {
      const topic = await this.topicRepository.findOne({
        where: { id },
        relations: ['repo'],
      });

      if (!topic) {
        throw new NotFoundException('Không tìm thấy chủ đề');
      }

      return {
        message: 'Tìm thấy chủ đề',
        statusCode: 200,
        data: topic,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm chủ đề',
        );
      }
    }
  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    try {
      const topic = (await this.findOne(id)).data;

      if (!topic) {
        throw new NotFoundException('Không tìm thấy chủ đề');
      }

      if (updateTopicDto.repoId) {
        const repo = (await this.reposService.findOne(+updateTopicDto.repoId))
          .data;
        if (!repo) {
          throw new NotFoundException('Không tìm thấy kho lưu trữ');
        }
        topic.repo = repo;
      }

      Object.assign(topic, updateTopicDto);

      const savedTopic = await this.topicRepository.save(topic);
      return {
        message: 'Cập nhật chủ đề thành công',
        statusCode: 200,
        data: savedTopic,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình cập nhật chủ đề',
        );
      }
    }
  }

  async remove(id: number) {
    try {
      const topic = (await this.findOne(id)).data;
      if (topic) {
        await this.topicRepository.remove(topic);
        return {
          message: 'Xóa chủ đề thành công',
          statusCode: 200,
          data: topic,
        };
      }
      throw new NotFoundException('Không tìm thấy chủ đề');
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình xóa chủ đề',
        );
      }
    }
  }
}
