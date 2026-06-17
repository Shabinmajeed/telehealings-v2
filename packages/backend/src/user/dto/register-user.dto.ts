import { IsEmail, IsString, MinLength, MaxLength, IsOptional, IsIn } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  dob: string;

  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @IsString()
  occupation: string;

  @IsString()
  maritalStatus: string;

  @IsOptional()
  @IsString()
  guestId?: string;
}
