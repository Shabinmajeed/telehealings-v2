import { IsEmail, IsString, MinLength, MaxLength, IsOptional, IsInt, Min } from 'class-validator';

export class CreateTherapistDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  dob: string;

  @IsString()
  specialization: string;

  @IsString()
  @IsOptional()
  credentials?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  experience?: number;
}
