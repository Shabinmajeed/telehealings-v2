import {
  Controller, Get, Post, Body, Param, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { MedicalProfileService } from './medical-profile.service';
import { MedicalProfileStep1Dto, MedicalProfileStep2Dto, MedicalProfileStep3Dto, MedicalProfileStep4Dto } from './dto/medical-profile.dto';

@ApiTags('medical-profile')
@Controller('api/medical-profile')
export class MedicalProfileController {
  constructor(private readonly medicalProfileService: MedicalProfileService) {}

  @ApiOperation({ summary: 'Save a medical profile step' })
  @ApiParam({ name: 'userId', description: 'User UUID' })
  @ApiParam({ name: 'step', description: 'Step number (1-4)' })
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

  @ApiOperation({ summary: 'Get medical profile for a user' })
  @ApiParam({ name: 'userId', description: 'User UUID' })
  @Get(':userId')
  async getProfile(@Param('userId') userId: string) {
    const profile = await this.medicalProfileService.getProfile(userId);
    return { profile };
  }

  @ApiOperation({ summary: 'Get full profile including user data' })
  @ApiParam({ name: 'userId', description: 'User UUID' })
  @Get(':userId/full')
  async getFullProfile(@Param('userId') userId: string) {
    const user = await this.medicalProfileService.getFullProfile(userId);
    return { user };
  }

  @ApiOperation({ summary: 'List all medical profiles (admin)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
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
