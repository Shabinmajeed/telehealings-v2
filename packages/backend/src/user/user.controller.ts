import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SaveContactDetailsDto } from './dto/save-contact-details.dto';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterUserDto) {
    const user = await this.userService.register(dto);
    return { message: 'Registration successful', user };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto) {
    const user = await this.userService.login(dto.email, dto.password);
    return { message: 'Login successful', user };
  }

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    const result = await this.userService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
      search,
    );
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return { user };
  }

  @Put(':id')
  async updateProfile(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.userService.updateProfile(id, dto);
    return { message: 'Profile updated', user };
  }

  @Post(':id/contact-details')
  async saveContactDetails(@Param('id') userId: string, @Body() dto: SaveContactDetailsDto) {
    const result = await this.userService.saveContactDetails(userId, dto);
    return { message: 'Contact details saved', contactDetails: result };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
