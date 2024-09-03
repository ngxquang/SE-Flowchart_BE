import { Injectable } from '@nestjs/common';
import { CreateRepoDto } from './dto/create-repo.dto';
import { UpdateRepoDto } from './dto/update-repo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repo } from 'src/entities/repo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReposService {

  constructor(
    @InjectRepository(Repo) private repoRepository: Repository<Repo>
  ) {}

  create(createRepoDto: CreateRepoDto) {
    return 'This action adds a new repo';
  }

  findAll() {
    return this.repoRepository.find();
  }

  findOne(id: number) {
    return this.repoRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateRepoDto: UpdateRepoDto) {
    return `This action updates a #${id} repo`;
  }

  remove(id: number) {
    return `This action removes a #${id} repo`;
  }
}
