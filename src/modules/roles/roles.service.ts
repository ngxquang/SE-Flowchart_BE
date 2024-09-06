import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const existingRole = await this.roleRepository.findOneBy({
        url: createRoleDto.url,
      });

      if (existingRole) {
        throw new ConflictException('Role với URL này đã tồn tại');
      }

      const newRole = this.roleRepository.create(createRoleDto);
      const savedRole = await this.roleRepository.save(newRole);
      return {
        message: 'Tạo mới chức năng thành công',
        statusCode: 200,
        data: savedRole,
      };
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tạo mới chức năng',
        );
      }
    }
  }

  async findAll(groupId?: number, take = 10, skip = 0) {
    try {
      const options = {
        take,
        skip,
        relations: [],
        where: {},
      };

      if (groupId) {
        options.where['groups'] = { id: groupId };
      }

      const roles = await this.roleRepository.find(options);

      if (roles.length === 0) {
        throw new NotFoundException('Không tìm thấy chức năng');
      }
      return {
        message: 'Tìm thấy danh sách chức năng',
        statusCode: 200,
        data: roles,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm danh sách chức năng',
        );
      }
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.roleRepository.findOneBy({ id });

      if (!role) {
        throw new NotFoundException('Không tìm thấy chức năng');
      }

      return {
        message: 'Tìm thấy chức năng',
        statusCode: 200,
        data: role,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm chức năng',
        );
      }
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const role = (await this.findOne(id)).data;
      if (role) {
        Object.assign(role, updateRoleDto);
        const savedRole = await this.roleRepository.save(role);
        return {
          message: 'Cập nhật chức năng thành công',
          statusCode: 200,
          data: savedRole,
        };
      }
      throw new NotFoundException('Không tìm thấy chức năng');
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình cập nhật chức năng',
        );
      }
    }
  }

  async remove(id: number) {
    try {
      const role = (await this.findOne(id)).data;
      if (role) {
        await this.roleRepository.remove(role);
        return {
          message: 'Xóa chức năng thành công',
          statusCode: 200,
          data: role,
        };
      }
      throw new NotFoundException('Không tìm thấy chức năng');
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      else {
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình xóa chức năng',
        );
      }
    }
  }
}
