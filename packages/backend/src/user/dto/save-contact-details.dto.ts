import { IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveContactDetailsDto {
  @ApiProperty({ description: 'Physical address', example: '123 Main St, City, State 12345' })
  @IsString()
  @MinLength(3)
  address: string;

  @ApiProperty({ description: 'Emergency contact name', example: 'Jane Doe' })
  @IsString()
  @MinLength(2)
  emergencyName: string;

  @ApiProperty({ description: 'Emergency contact phone', example: '+1234567890' })
  @IsString()
  @MinLength(7)
  emergencyPhone: string;

  @ApiProperty({ description: 'Emergency contact relationship', example: 'Spouse' })
  @IsString()
  emergencyRelation: string;
}
