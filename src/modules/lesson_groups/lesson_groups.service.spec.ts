import { Test, TestingModule } from '@nestjs/testing';
import { LessonGroupsService } from './lesson_groups.service';

describe('LessonGroupsService', () => {
  let service: LessonGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonGroupsService],
    }).compile();

    service = module.get<LessonGroupsService>(LessonGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
