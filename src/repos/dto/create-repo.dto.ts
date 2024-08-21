import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateRepoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
