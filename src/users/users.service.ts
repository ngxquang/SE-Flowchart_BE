import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(identifier: string | number) {
    if (typeof identifier === 'string') {
      return this.userRepository.findOne({
        where: { username: identifier },
      });
    } else if (typeof identifier === 'number') {
      return this.userRepository.findOne({
        where: { id: identifier },
      });
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user) {
      Object.assign(user, updateUserDto);
      return this.userRepository.save(user);
    }
    return null;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (user) {
      return this.userRepository.remove(user);
    }
  }
}
