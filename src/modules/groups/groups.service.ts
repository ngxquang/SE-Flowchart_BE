import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from 'src/entities/group.entity';
import { Role } from 'src/entities/role.entity';
import { CreateRoleGroupDto } from './dto/create-role-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    try {
      const newGroup = this.groupRepository.create(createGroupDto);
      const savedGroup = await this.groupRepository.save(newGroup);
      return {
        message: 'Tạo mới nhóm người dùng thành công',
        statusCode: 200,
        data: savedGroup,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tạo mới nhóm người dùng',
        );
    }
  }

  async findAll(take = 10, skip = 0) {
    try {
      const options = {
        take,
        skip,
      };

      const groups = await this.groupRepository.find(options);

      if (groups.length === 0) {
        throw new NotFoundException({
          message: 'Không tìm thấy nhóm người dùng',
          statusCode: 404,
          data: [],
        });
      }

      return {
        message: 'Tìm thấy danh sách nhóm người dùng',
        statusCode: 200,
        data: groups,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm danh sách nhóm người dùng',
        );
    }
  }

  async findOne(id: number) {
    try {
      const group = await this.groupRepository.findOneBy({ id });

      if (!group) {
        throw new NotFoundException('Không tìm thấy nhóm người dùng');
      }

      return {
        message: 'Tìm thấy nhóm người dùng',
        statusCode: 200,
        data: group,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình tìm kiếm nhóm người dùng',
        );
    }
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    try {
      const group = (await this.findOne(id)).data;
      if (group) {
        Object.assign(group, updateGroupDto);
        const savedGroup = await this.groupRepository.save(group);
        return {
          message: 'Cập nhật nhóm người dùng thành công',
          statusCode: 200,
          data: savedGroup,
        };
      }
      throw new NotFoundException('Không tìm thấy nhóm người dùng');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình cập nhật nhóm người dùng',
        );
    }
  }

  async remove(id: number) {
    try {
      const group = (await this.findOne(id)).data;
      if (group) {
        await this.groupRepository.remove(group);
        return {
          message: 'Xóa nhóm người dùng thành công',
          statusCode: 200,
          data: group,
        };
      }
      throw new NotFoundException('Không tìm thấy nhóm người dùng');
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else
        throw new InternalServerErrorException(
          'Có lỗi xảy ra trong quá trình xóa nhóm người dùng',
        );
    }
  }

  async assignRolesToGroup(createRoleGroupDto: CreateRoleGroupDto) {
    const group = await this.groupRepository.findOne({
      where: { id: +createRoleGroupDto.groupId },
      relations: ['roles'],
    });

    if (!group) {
      throw new NotFoundException('Nhóm người dùng không tồn tại');
    }

    if (createRoleGroupDto.roleIds.length === 0) {
      group.roles = [];
      return this.groupRepository.save(group);
    }

    const newRoles = await this.roleRepository.find({
      where: createRoleGroupDto.roleIds.map((id) => ({ id })),
    });

    if (newRoles.length === 0) {
      throw new NotFoundException('Không tìm thấy các quyền được chỉ định');
    }

    group.roles = newRoles;

    const savedGroup = await this.groupRepository.save(group);
    return {
      message: 'Phân quyền nhóm người dùng thành công',
      statusCode: 200,
      data: savedGroup,
    };
  }
}
