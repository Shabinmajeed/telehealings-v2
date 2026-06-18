import { IsString, IsOptional, IsArray, IsEmail, MinLength, MaxLength, ArrayMaxSize, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGuestDto {
  @ApiProperty({ description: 'Guest full name', example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ description: 'Guest email address', example: 'john@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Guest phone number', example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Personalisation preferences (max 6)', example: ['yoga', 'meditation'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(6)
  personalisation: string[];
}
