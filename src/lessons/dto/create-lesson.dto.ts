import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateLessonDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  @IsIn(['0', '1'])
  status: string;

  @IsUrl()
  urlMD: string;

  @IsUrl()
  flowChart: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['0', '1'])
  statusFlowChart: string;

  @IsNotEmpty()
  @IsInt()
  topicId: number;

  @IsNotEmpty()
  @IsInt()
  lessonTypeId: number;
}
