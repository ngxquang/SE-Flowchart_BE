import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRepoDto } from './dto/create-repo.dto';
import { UpdateRepoDto } from './dto/update-repo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repo } from 'src/entities/repo.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ReposService {
  constructor(
    @InjectRepository(Repo) private repoRepository: Repository<Repo>,
    private usersService: UsersService,
  ) {}

  async create(createRepoDto: CreateRepoDto) {
    try {
      const newRepo = this.repoRepository.create(createRepoDto);
      const user = (await this.usersService.findOne(+createRepoDto.userId))
        .data;
      if (!user) {
        throw new NotFoundException('User không tồn tại');
      }
      newRepo.user = user;
      const savedRepo = await this.repoRepository.save(newRepo);
      return {
        message: 'Tạo mới kho lưu trữ thành công',
        statusCode: 200,
        data: {
          id: savedRepo.id,
          name: savedRepo.name,
          user: {
            id: user.id,
            name: user.name,
          },
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tạo mới kho lưu trữ',
        );
      }
    }
  }

  async findAll(userId?: number, take = 10, skip = 0) {
    try {
      const options = {
        where: {},
        relations: [],
        take,
        skip,
        select: {
          user: {
            id: true,
            name: true,
          },
        },
      };

      if (userId) {
        options.where = { user: { id: userId } };
      } else {
        options.relations = ['user'];
      }

      const repos = await this.repoRepository.find(options);

      if (repos.length === 0) {
        throw new NotFoundException('Không tìm thấy kho lưu trữ');
      }

      return {
        message: 'Tìm thấy danh sách kho lưu trữ',
        statusCode: 200,
        data: repos,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm danh sách kho lưu trữ',
        );
      }
    }
  }

  async findOne(id: number) {
    try {
      const repo = await this.repoRepository.findOne({
        where: { id },
        relations: ['user'],
        select: {
          user: {
            id: true,
            name: true,
          },
        },
      });
      if (!repo) {
        throw new NotFoundException('Không tìm thấy kho lưu trữ');
      }
      return {
        message: 'Tìm thấy kho lưu trữ',
        statusCode: 200,
        data: repo,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm kho lưu trữ',
        );
      }
    }
  }

  async update(id: number, updateRepoDto: UpdateRepoDto) {
    try {
      const repo = (await this.findOne(id)).data;

      if (!repo) {
        throw new NotFoundException('Không tìm thấy kho lưu trữ');
      }

      if (updateRepoDto.userId) {
        const user = (await this.usersService.findOne(+updateRepoDto.userId))
          .data;
        if (!user) {
          throw new NotFoundException('Không tìm thấy người dùng');
        }
        repo.user = user;
      }

      Object.assign(repo, updateRepoDto);

      const savedRepo = await this.repoRepository.save(repo);
      return {
        message: 'Cập nhật kho lưu trữ thành công',
        statusCode: 200,
        data: {
          id: savedRepo.id,
          name: savedRepo.name,
          user: {
            id: savedRepo.user.id,
            name: savedRepo.user.name,
          },
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình cập nhật kho lưu trữ',
        );
      }
    }
  }

  async remove(id: number) {
    try {
      const repo = (await this.findOne(id)).data;
      if (!repo) {
        throw new NotFoundException('Không tìm thấy kho lưu trữ');
      }
      await this.repoRepository.remove(repo);
      return {
        message: 'Xóa kho lưu trữ thành công',
        statusCode: 200,
        data: repo,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Có lỗi xảy ra trong quá trình xóa kho lưu trữ',
      );
    }
  }
}
