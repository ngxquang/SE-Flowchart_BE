import {
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException, // Thêm để xử lý lỗi 500 thực sự
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { GroupsService } from '../groups/groups.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly groupsService: GroupsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email đã tồn tại');
      }

      const existingUserByPhone = await this.userRepository.findOne({
        where: { phone: createUserDto.phone },
      });

      if (existingUserByPhone) {
        throw new ConflictException('Số điện thoại đã tồn tại');
      }

      const newUser = this.userRepository.create(createUserDto);
      const group = (await this.groupsService.findOne(+createUserDto.groupId))
        .data;
      newUser.group = group;

      const savedUser = await this.userRepository.save(newUser);
      return {
        message: 'Tạo mới người dùng thành công',
        statusCode: 200,
        data: savedUser,
      };
    } catch (error) {
      if (
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Có lỗi xảy ra trong quá trình tạo mới người dùng',
      );
    }
  }

  async findAll(groupId?: number, take = 10, skip = 0) {
    try {
      const options = {
        where: {},
        relations: [],
        take,
        skip,
      };

      if (groupId) {
        options.where['group'] = { id: groupId };
      } else {
        options.relations = ['group'];
      }

      const users = await this.userRepository.find(options);

      if (users.length === 0) {
        throw new NotFoundException('Không tìm thấy người dùng');
      }

      return {
        message: 'Tìm thấy danh sách người dùng',
        statusCode: 200,
        data: users,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Có lỗi xảy ra trong quá trình tìm kiếm danh sách người dùng',
      );
    }
  }

  async findOne(identifier: string | number) {
    try {
      let user: User;
      if (typeof identifier === 'string') {
        user = await this.userRepository.findOne({
          where: { username: identifier },
          relations: ['group'],
        });
      } else if (typeof identifier === 'number') {
        user = await this.userRepository.findOne({
          where: { id: identifier },
          relations: ['group'],
        });
      }
      if (!user) {
        throw new NotFoundException('Không tìm thấy người dùng');
      }
      return {
        message: 'Tìm thấy người dùng',
        statusCode: 200,
        data: user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Có lỗi xảy ra trong quá trình tìm kiếm người dùng',
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = (await this.findOne(id)).data;
      if (!user) {
        throw new NotFoundException('Không tìm thấy người dùng');
      }

      if (updateUserDto.email && updateUserDto.email !== user.email) {
        const existingUserByEmail = await this.userRepository.findOne({
          where: { email: updateUserDto.email },
        });
        if (existingUserByEmail) {
          throw new ConflictException('Email đã tồn tại');
        }
      }

      if (updateUserDto.phone && updateUserDto.phone !== user.phone) {
        const existingUserByPhone = await this.userRepository.findOne({
          where: { phone: updateUserDto.phone },
        });
        if (existingUserByPhone) {
          throw new ConflictException('Số điện thoại đã tồn tại');
        }
      }

      if (updateUserDto.groupId) {
        const group = (await this.groupsService.findOne(updateUserDto.groupId))
          .data;
        if (!group) {
          throw new NotFoundException('Không tìm thấy nhóm người dùng');
        }
        user.group = group;
      }
      Object.assign(user, updateUserDto);
      const savedUser = await this.userRepository.save(user);
      return {
        message: 'Cập nhật người dùng thành công',
        statusCode: 200,
        data: savedUser,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Có lỗi xảy ra trong quá trình cập nhật người dùng',
      );
    }
  }

  async remove(id: number) {
    try {
      const user = (await this.findOne(id)).data;
      if (!user) {
        throw new NotFoundException('Không tìm thấy người dùng');
      }
      await this.userRepository.softDelete(id);
      return {
        message: 'Xóa người dùng thành công',
        statusCode: 200,
        data: user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Có lỗi xảy ra trong quá trình xóa người dùng',
      );
    }
  }
}
