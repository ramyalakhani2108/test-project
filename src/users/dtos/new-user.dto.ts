import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import * as userRolesEnum from '../enums/user-roles.enum';

export class NewUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(96)
  @IsNotEmpty()
  password: string;

  @IsEnum(userRolesEnum.userRoles)
  @IsNotEmpty()
  role: userRolesEnum.userRoles;
}
