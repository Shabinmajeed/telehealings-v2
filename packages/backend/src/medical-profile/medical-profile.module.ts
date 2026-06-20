import { Module } from '@nestjs/common';
import { medicalProfileService } from './medical-profile.service';
import { MedicalProfileController } from './medical-profile.controller';

@Module({
  controllers: [MedicalProfileController],
  providers: [medicalProfileService],
})
export class MedicalProfileModule {}
