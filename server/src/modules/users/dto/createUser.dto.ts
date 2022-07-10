import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsBoolean()
  @IsOptional()
  isAdministrator: boolean;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
