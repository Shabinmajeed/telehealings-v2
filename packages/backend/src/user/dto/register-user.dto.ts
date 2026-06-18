import { IsEmail, IsString, MinLength, MaxLength, IsOptional, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ description: 'First name', example: 'John' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ description: 'Last name', example: 'Doe' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ description: 'Email address', example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password (min 8 characters)', example: 'securePass123', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Date of birth (YYYY-MM-DD)', example: '1990-01-15' })
  @IsString()
  dob: string;

  @ApiProperty({ description: 'Gender', example: 'male', enum: ['male', 'female', 'other'] })
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @ApiProperty({ description: 'Occupation', example: 'Software Engineer' })
  @IsString()
  occupation: string;

  @ApiProperty({ description: 'Marital status', example: 'single' })
  @IsString()
  maritalStatus: string;

  @ApiPropertyOptional({ description: 'Guest ID if converting from guest', example: 'uuid-string' })
  @IsOptional()
  @IsString()
  guestId?: string;
}
