import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName: string;

  @IsBoolean()
  @IsOptional()
  isAdministrator: boolean;
}
