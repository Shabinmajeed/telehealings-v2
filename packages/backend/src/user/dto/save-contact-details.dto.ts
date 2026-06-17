import { IsString, MinLength, IsOptional } from 'class-validator';

export class SaveContactDetailsDto {
  @IsString()
  @MinLength(3)
  address: string;

  @IsString()
  @MinLength(2)
  emergencyName: string;

  @IsString()
  @MinLength(7)
  emergencyPhone: string;

  @IsString()
  emergencyRelation: string;
}
