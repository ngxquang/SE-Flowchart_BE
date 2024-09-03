import { Module } from '@nestjs/common';
import { ReposService } from './repos.service';
import { ReposController } from './repos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repo } from 'src/entities/repo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Repo])],
  controllers: [ReposController],
  providers: [ReposService],
})
export class ReposModule {}
