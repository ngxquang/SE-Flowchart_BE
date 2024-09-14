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

  @IsNotEmpty()
  // @IsUrl()
  urlMd: string;

  @IsNotEmpty()
  flowChart: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['0', '1'])
  statusFlowChart: string;

  @IsNotEmpty()
  @IsInt()
  lessonGroupId: number;

  @IsNotEmpty()
  @IsInt()
  lessonTypeId: number;
}
