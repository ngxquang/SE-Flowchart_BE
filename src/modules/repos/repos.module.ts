import { Module } from '@nestjs/common';
import { ReposService } from './repos.service';
import { ReposController } from './repos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repo } from 'src/entities/repo.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Repo]), UsersModule],
  controllers: [ReposController],
  providers: [ReposService],
  exports: [ReposService],
})
export class ReposModule {}
