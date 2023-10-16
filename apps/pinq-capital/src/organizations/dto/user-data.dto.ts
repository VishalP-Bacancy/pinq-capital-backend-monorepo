import { IsEmail, IsString, IsArray } from 'class-validator';

export class UserDataDTO {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  roleName: string;

  @IsArray()
  access: string[];
}
