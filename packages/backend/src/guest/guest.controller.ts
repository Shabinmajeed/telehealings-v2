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

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  // POST /api/guest/register — open, no auth
  @Post('register')
  register(@Body() dto: CreateGuestDto) {
    return this.guestService.create(dto);
  }

  // GET /api/guest — admin only
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

  // GET /api/guest/:id — admin only
  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: string) {
    return this.guestService.findOne(id);
  }

  // PATCH /api/guest/:id — update guest (personalisation, name, etc.)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGuestDto) {
    return this.guestService.update(id, dto);
  }

  // PUT /api/guest/:id/profile — full profile update (used by mobile app)
  @Put(':id/profile')
  updateProfile(@Param('id') id: string, @Body() dto: UpdateGuestDto) {
    return this.guestService.updateProfile(id, dto);
  }

  // DELETE /api/guest/:id — admin only
  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.guestService.remove(id);
  }

  // POST /api/guest/:id/convert — convert guest to full user
  @Post(':id/convert')
  @UseGuards(AdminGuard)
  convert(@Param('id') id: string, @Body() dto: ConvertGuestDto) {
    return this.guestService.convert(id, dto);
  }
}
