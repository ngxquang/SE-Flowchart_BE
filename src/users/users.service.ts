import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a User';
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }
}
