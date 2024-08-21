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

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['0', '1'])
  status: string;

  @IsNotEmpty()
  @IsUrl()
  urlMD: string;

  @IsNotEmpty()
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
