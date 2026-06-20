import { IsEmail, IsString, MinLength, MaxLength, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTherapistDto {
  @ApiProperty({ description: 'First name', example: 'Jane' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Smith' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({ description: 'Email address', example: 'jane@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password (min 8 characters)', example: 'securePass123', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+123****7890' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ description: 'Specialization area', example: 'Clinical Psychology' })
  @IsString()
  @IsOptional()
  specialization?: string;

  @ApiPropertyOptional({ description: 'Professional credentials', example: 'PhD, LPC' })
  @IsString()
  @IsOptional()
  credentials?: string;

  @ApiPropertyOptional({ description: 'Short biography', example: 'Licensed therapist with 10 years of experience.' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({ description: 'Years of experience', example: 10, minimum: 0 })
  @IsInt()
  @Min(0)
  @IsOptional()
  experience?: number;
}
