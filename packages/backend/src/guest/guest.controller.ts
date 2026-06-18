import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { GuestService } from './guest.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { AdminGuard } from '../auth/admin.guard';

class ConvertGuestDto {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  occupation?: string;
  maritalStatus?: string;
}

@ApiTags('guest')
@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @ApiOperation({ summary: 'Register a new guest' })
  @Post('register')
  register(@Body() dto: CreateGuestDto) {
    return this.guestService.create(dto);
  }

  @ApiOperation({ summary: 'List all guests (admin)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term' })
  @Get()
  @UseGuards(AdminGuard)
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.guestService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
      search,
    );
  }

  @ApiOperation({ summary: 'Get guest by ID (admin)' })
  @ApiParam({ name: 'id', description: 'Guest UUID' })
  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: string) {
    return this.guestService.findOne(id);
  }

  @ApiOperation({ summary: 'Update guest info' })
  @ApiParam({ name: 'id', description: 'Guest UUID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGuestDto) {
    return this.guestService.update(id, dto);
  }

  @ApiOperation({ summary: 'Full profile update (mobile app)' })
  @ApiParam({ name: 'id', description: 'Guest UUID' })
  @Put(':id/profile')
  updateProfile(@Param('id') id: string, @Body() dto: UpdateGuestDto) {
    return this.guestService.updateProfile(id, dto);
  }

  @ApiOperation({ summary: 'Delete guest (admin)' })
  @ApiParam({ name: 'id', description: 'Guest UUID' })
  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.guestService.remove(id);
  }

  @ApiOperation({ summary: 'Convert guest to full user (admin)' })
  @ApiParam({ name: 'id', description: 'Guest UUID' })
  @Post(':id/convert')
  @UseGuards(AdminGuard)
  convert(@Param('id') id: string, @Body() dto: ConvertGuestDto) {
    return this.guestService.convert(id, dto);
  }
}
