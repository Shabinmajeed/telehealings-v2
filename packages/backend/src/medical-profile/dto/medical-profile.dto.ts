import { IsString, IsOptional, IsIn, IsArray, ArrayMaxSize } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

// Step 1: Therapy History
export class MedicalProfileStep1Dto {
  @ApiPropertyOptional({ description: 'Therapy history notes', example: 'Previous CBT therapy in 2020' })
  @IsOptional() @IsString() therapyHistory?: string;

  @ApiPropertyOptional({ description: 'Past diagnosis', example: 'Generalized Anxiety Disorder' })
  @IsOptional() @IsString() pastDiagnosis?: string;

  @ApiPropertyOptional({ description: 'Trauma history notes', example: 'None reported' })
  @IsOptional() @IsString() traumaHistory?: string;

  @ApiPropertyOptional({ description: 'Psychiatric hospitalization', example: 'Yes', enum: ['Yes', 'No', ''] })
  @IsOptional() @IsString() @IsIn(['Yes', 'No', '']) psychiatricHospital?: string;

  @ApiPropertyOptional({ description: 'Hospitalization reason', example: 'Severe anxiety episode' })
  @IsOptional() @IsString() hospitalReason?: string;

  @ApiPropertyOptional({ description: 'Hospitalization date', example: '2020-03-15' })
  @IsOptional() @IsString() hospitalDate?: string;
}

// Step 2: Therapy Goals
export class MedicalProfileStep2Dto {
  @ApiPropertyOptional({ description: 'What brings you to therapy', example: 'Managing work-related stress' })
  @IsOptional() @IsString() bringsYouToTherapy?: string;

  @ApiPropertyOptional({ description: 'How long experiencing symptoms', example: '6 months' })
  @IsOptional() @IsString() howLongExperiencing?: string;

  @ApiPropertyOptional({ description: 'Impact on daily life', example: 'Difficulty sleeping and concentrating' })
  @IsOptional() @IsString() affectingDailyLife?: string;

  @ApiPropertyOptional({ description: 'Therapy expectations', example: 'Learn coping strategies' })
  @IsOptional() @IsString() expectations?: string;
}

// Step 3: Medical History
export class MedicalProfileStep3Dto {
  @ApiPropertyOptional({ description: 'Medical conditions (max 20)', example: ['Hypertension'], type: [String] })
  @IsOptional() @IsArray() @IsString({ each: true }) @ArrayMaxSize(20) medicalConditions?: string[];

  @ApiPropertyOptional({ description: 'Other medical conditions', example: 'Asthma' })
  @IsOptional() @IsString() otherConditions?: string;

  @ApiPropertyOptional({ description: 'Tobacco use', example: 'Never' })
  @IsOptional() @IsString() tobaccoUse?: string;

  @ApiPropertyOptional({ description: 'Alcohol consumption', example: 'Occasional' })
  @IsOptional() @IsString() alcoholConsumption?: string;

  @ApiPropertyOptional({ description: 'Other substance use', example: 'None' })
  @IsOptional() @IsString() otherSubstances?: string;

  @ApiPropertyOptional({ description: 'Current medications', example: 'Sertraline 50mg' })
  @IsOptional() @IsString() currentMedications?: string;
}

// Step 4: Safety Assessment
export class MedicalProfileStep4Dto {
  @ApiPropertyOptional({ description: 'Self-harm thoughts', example: 'No', enum: ['Yes', 'No', ''] })
  @IsOptional() @IsString() @IsIn(['Yes', 'No', '']) selfHarmThoughts?: string;

  @ApiPropertyOptional({ description: 'Self-harm history', example: 'No', enum: ['Yes', 'No', ''] })
  @IsOptional() @IsString() @IsIn(['Yes', 'No', '']) selfHarmHistory?: string;

  @ApiPropertyOptional({ description: 'Thoughts of harming others', example: 'No', enum: ['Yes', 'No', ''] })
  @IsOptional() @IsString() @IsIn(['Yes', 'No', '']) harmOthers?: string;
}
