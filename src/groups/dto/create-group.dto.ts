import { IsArray, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  name: string;

  @IsArray()
  @IsInt({ each: true })
  roleIds: number[];
}
