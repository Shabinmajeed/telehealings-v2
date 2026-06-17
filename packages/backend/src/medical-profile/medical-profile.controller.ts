import {
  Controller, Get, Post, Body, Param, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import { MedicalProfileService } from './medical-profile.service';
import { MedicalProfileStep1Dto, MedicalProfileStep2Dto, MedicalProfileStep3Dto, MedicalProfileStep4Dto } from './dto/medical-profile.dto';

@Controller('api/medical-profile')
export class MedicalProfileController {
  constructor(private readonly medicalProfileService: MedicalProfileService) {}

  @Post(':userId/step/:step')
  @HttpCode(HttpStatus.OK)
  async saveStep(
    @Param('userId') userId: string,
    @Param('step') step: string,
    @Body() dto: any,
  ) {
    const stepNum = parseInt(step, 10);
    const profile = await this.medicalProfileService.saveStep(userId, stepNum, dto);
    return { message: `Step ${step} saved`, profile };
  }

  @Get(':userId')
  async getProfile(@Param('userId') userId: string) {
    const profile = await this.medicalProfileService.getProfile(userId);
    return { profile };
  }

  @Get(':userId/full')
  async getFullProfile(@Param('userId') userId: string) {
    const user = await this.medicalProfileService.getFullProfile(userId);
    return { user };
  }

  // Admin endpoint
  @Get()
  async findAllProfiles(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.medicalProfileService.findAllProfiles(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
    );
  }
}
