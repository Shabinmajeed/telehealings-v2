import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('booking')
@Controller('api/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // ─── Therapist Discovery (public) ───

  @ApiOperation({ summary: 'Discover available therapists' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'specialization', required: false, type: String })
  @Get('therapists')
  async discoverTherapists(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('specialization') specialization?: string,
  ) {
    return this.bookingService.discoverTherapists(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 12,
      search,
      specialization,
    );
  }

  @ApiOperation({ summary: 'Get therapist public profile' })
  @ApiParam({ name: 'id', description: 'Therapist UUID' })
  @Get('therapists/:id')
  async getTherapistProfile(@Param('id') id: string) {
    return this.bookingService.getTherapistProfile(id);
  }

  @ApiOperation({ summary: 'Get therapist availability' })
  @ApiParam({ name: 'id', description: 'Therapist UUID' })
  @Get('therapists/:id/availability')
  async getTherapistAvailability(@Param('id') id: string) {
    return this.bookingService.getTherapistAvailability(id);
  }

  // ─── Appointments (authenticated) ───

  @ApiOperation({ summary: 'Create a new appointment' })
  @UseGuards(JwtAuthGuard)
  @Post('appointments')
  async createAppointment(@Request() req: any, @Body() dto: any) {
    const userId = req.user?.sub;
    if (!userId) {
      return { success: false, message: 'Unauthorized' };
    }
    return this.bookingService.createAppointment(userId, dto);
  }

  @ApiOperation({ summary: 'Get my appointments (client)' })
  @UseGuards(JwtAuthGuard)
  @Get('appointments')
  async getUserAppointments(@Request() req: any, @Query('page') page?: string, @Query('limit') limit?: string) {
    const userId = req.user?.sub;
    if (!userId) {
      return { success: false, message: 'Unauthorized' };
    }
    return this.bookingService.getUserAppointments(userId, page ? parseInt(page, 10) : 1, limit ? parseInt(limit, 10) : 10);
  }

  @ApiOperation({ summary: 'Get appointment by ID' })
  @Get('appointments/:id')
  async getAppointmentById(@Param('id') id: string) {
    return this.bookingService.getAppointmentById(id);
  }

  @ApiOperation({ summary: 'Update appointment status' })
  @UseGuards(JwtAuthGuard)
  @Patch('appointments/:id/status')
  async updateAppointmentStatus(@Request() req: any, @Param('id') id: string, @Body('status') status: string) {
    const userId = req.user?.sub;
    if (!userId) {
      return { success: false, message: 'Unauthorized' };
    }
    return this.bookingService.updateAppointmentStatus(id, status, userId);
  }

  @ApiOperation({ summary: 'Cancel appointment' })
  @UseGuards(JwtAuthGuard)
  @Delete('appointments/:id')
  async cancelAppointment(@Request() req: any, @Param('id') id: string, @Body('reason') reason?: string) {
    const userId = req.user?.sub;
    if (!userId) {
      return { success: false, message: 'Unauthorized' };
    }
    return this.bookingService.cancelAppointment(id, userId, reason);
  }

  // ─── Therapist Appointments ───

  @ApiOperation({ summary: 'Get therapist appointments' })
  @UseGuards(JwtAuthGuard)
  @Get('therapist/appointments')
  async getTherapistAppointments(
    @Request() req: any,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
  ) {
    const userId = req.user?.sub;
    if (!userId) {
      return { success: false, message: 'Unauthorized' };
    }
    return this.bookingService.getTherapistAppointments(userId, page ? parseInt(page, 10) : 1, limit ? parseInt(limit, 10) : 10, status);
  }
}
