import { IsString, IsOptional, IsArray, IsEmail, MinLength, MaxLength, ArrayMaxSize, IsNotEmpty } from 'class-validator';

export class CreateGuestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(6)
  personalisation: string[];
}
