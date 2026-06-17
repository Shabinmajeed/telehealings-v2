import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TherapistService } from './therapist.service';
import { CreateTherapistDto } from './dto/create-therapist.dto';
import { AdminGuard } from '../auth/admin.guard';

@Controller('therapist')
export class TherapistController {
  constructor(private readonly therapistService: TherapistService) {}

  @Post('register')
  async register(@Body() dto: CreateTherapistDto) {
    const therapist = await this.therapistService.create(dto);
    const { password, ...result } = therapist as any;
    return {
      success: true,
      message: 'Therapist registered successfully. Your account is pending admin approval.',
      data: result,
    };
  }

  @Get()
  @UseGuards(AdminGuard)
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.therapistService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
      search,
      status,
    );
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  async findOne(@Param('id') id: string) {
    return this.therapistService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(AdminGuard)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const therapist = await this.therapistService.updateStatus(id, status);
    return {
      success: true,
      message: `Therapist status updated to ${status}`,
      data: therapist,
    };
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    await this.therapistService.remove(id);
    return {
      success: true,
      message: 'Therapist deleted successfully',
    };
  }
}
