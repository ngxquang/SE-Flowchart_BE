import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoleGroupDto {
  @IsNotEmpty()
  @IsNumber()
  groupId: string;

  @IsArray()
  roleIds: [];
}
