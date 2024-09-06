import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDate,
  Length,
  Matches,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username không được để trống' })
  @IsString({ message: 'Username phải là một chuỗi ký tự' })
  readonly username: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  @IsString({ message: 'Password phải là một chuỗi ký tự' })
  readonly password: string;

  @IsNotEmpty({ message: 'Status không được để trống' })
  @IsString({ message: 'Status phải là một chuỗi ký tự' })
  @Length(1, 1, { message: 'Status phải có độ dài 1 ký tự' })
  readonly status: string;

  @IsNotEmpty({ message: 'Name không được để trống' })
  @IsString({ message: 'Name phải là một chuỗi ký tự' })
  readonly name: string;

  @IsNotEmpty({ message: 'Giới tính không được để trống' })
  @IsString({ message: 'Giới tính phải là một chuỗi ký tự' })
  @Length(1, 1, { message: 'Giới tính phải có độ dài 1 ký tự' })
  readonly sex: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsString({ message: 'Số điện thoại phải là một chuỗi ký tự' })
  @Length(10, 10, { message: 'Số điện thoại phải có độ dài 10 chữ số' })
  @Matches(/^[0-9]+$/, { message: 'Số điện thoại phải là một chuỗi số' })
  readonly phone: string;

  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  @IsString({ message: 'Địa chỉ phải là một chuỗi ký tự' })
  readonly address: string;

  @IsNotEmpty({ message: 'Ngày sinh không được để trống' })
  @IsDate({ message: 'Ngày sinh phải là một ngày hợp lệ' })
  @Type(() => Date)
  readonly birthDate: Date;

  @IsNotEmpty({ message: 'Email không được để trống' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  readonly email: string;

  @IsNotEmpty()
  @IsNumber({}, { message: 'Username phải là một số nguyên' })
  readonly groupId: number;
}
