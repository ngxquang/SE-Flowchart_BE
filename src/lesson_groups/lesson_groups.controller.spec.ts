import { Test, TestingModule } from '@nestjs/testing';
import { LessonGroupsController } from './lesson_groups.controller';
import { LessonGroupsService } from './lesson_groups.service';

describe('LessonGroupsController', () => {
  let controller: LessonGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonGroupsController],
      providers: [LessonGroupsService],
    }).compile();

    controller = module.get<LessonGroupsController>(LessonGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
