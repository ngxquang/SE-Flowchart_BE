import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLessonGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  topicId: number;
}
