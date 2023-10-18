import { IsOptional, IsString } from "class-validator";

export class UserProfileDTO {
  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsString()
  mobilePhone?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  office?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  workPhone?: string;
}
