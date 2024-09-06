import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from 'src/entities/topic.entity';
import { ReposModule } from '../repos/repos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), ReposModule],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService],
})
export class TopicsModule {}
