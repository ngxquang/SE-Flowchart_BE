import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  // @IsUrl()
  @Length(1, 100)
  url: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  description: string;
}
