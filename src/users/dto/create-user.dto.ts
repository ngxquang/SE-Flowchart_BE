import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDate,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 1)
  readonly status: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 1)
  readonly sex: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  @Matches(/^[0-9]+$/, { message: 'Phone must be a valid 11-digit number' })
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsDate()
  readonly birthDate: Date;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  readonly groupId?: number;
}
