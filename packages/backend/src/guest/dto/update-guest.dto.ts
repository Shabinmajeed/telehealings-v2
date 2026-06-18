import { IsOptional, IsString, IsEmail, MinLength, MaxLength, IsArray, ArrayMaxSize, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGuestDto {
  @ApiPropertyOptional({ description: 'Guest full name', example: 'John Doe' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ description: 'First name', example: 'John' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  firstName?: string;

  @ApiPropertyOptional({ description: 'Last name', example: 'Doe' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  lastName?: string;

  @ApiPropertyOptional({ description: 'Email address', example: 'john@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Phone number', example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Date of birth (YYYY-MM-DD)', example: '1990-01-15' })
  @IsOptional()
  @IsString()
  dob?: string;

  @ApiPropertyOptional({ description: 'Gender', example: 'male', enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender?: string;

  @ApiPropertyOptional({ description: 'Occupation', example: 'Software Engineer' })
  @IsOptional()
  @IsString()
  occupation?: string;

  @ApiPropertyOptional({ description: 'Marital status', example: 'single' })
  @IsOptional()
  @IsString()
  maritalStatus?: string;

  @ApiPropertyOptional({ description: 'Personalisation preferences (max 6)', example: ['yoga'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(6)
  personalisation?: string[];

  @ApiPropertyOptional({ description: 'Physical address', example: '123 Main St, City' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Emergency contact name', example: 'Jane Doe' })
  @IsOptional()
  @IsString()
  emergencyName?: string;

  @ApiPropertyOptional({ description: 'Emergency contact phone', example: '+1234567890' })
  @IsOptional()
  @IsString()
  emergencyPhone?: string;

  @ApiPropertyOptional({ description: 'Emergency contact relationship', example: 'Spouse' })
  @IsOptional()
  @IsString()
  emergencyRelation?: string;
}
