import { IsString, IsOptional, IsIn, IsArray, ArrayMaxSize } from 'class-validator';

// Step 1: Therapy History
export class MedicalProfileStep1Dto {
  @IsOptional() @IsString() therapyHistory?: string;
  @IsOptional() @IsString() pastDiagnosis?: string;
  @IsOptional() @IsString() traumaHistory?: string;
  @IsOptional() @IsString() @IsIn(['Yes', 'No', '']) psychiatricHospital?: string;
  @IsOptional() @IsString() hospitalReason?: string;
  @IsOptional() @IsString() hospitalDate?: string;
}

// Step 2: Therapy Goals
export class MedicalProfileStep2Dto {
  @IsOptional() @IsString() bringsYouToTherapy?: string;
  @IsOptional() @IsString() howLongExperiencing?: string;
  @IsOptional() @IsString() affectingDailyLife?: string;
  @IsOptional() @IsString() expectations?: string;
}

// Step 3: Medical History
export class MedicalProfileStep3Dto {
  @IsOptional() @IsArray() @IsString({ each: true }) @ArrayMaxSize(20) medicalConditions?: string[];
  @IsOptional() @IsString() otherConditions?: string;
  @IsOptional() @IsString() tobaccoUse?: string;
  @IsOptional() @IsString() alcoholConsumption?: string;
  @IsOptional() @IsString() otherSubstances?: string;
  @IsOptional() @IsString() currentMedications?: string;
}

// Step 4: Safety Assessment
export class MedicalProfileStep4Dto {
  @IsOptional() @IsString() @IsIn(['Yes', 'No', '']) selfHarmThoughts?: string;
  @IsOptional() @IsString() @IsIn(['Yes', 'No', '']) selfHarmHistory?: string;
  @IsOptional() @IsString() @IsIn(['Yes', 'No', '']) harmOthers?: string;
}
