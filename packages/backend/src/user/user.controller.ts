import {
  Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SaveContactDetailsDto } from './dto/save-contact-details.dto';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: RegisterUserDto) {
    const user = await this.userService.register(dto);
    return { message: 'Registration successful', user };
  }

  @ApiOperation({ summary: 'User login' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto) {
    const user = await this.userService.login(dto.email, dto.password);
    return { message: 'Login successful', user };
  }

  @ApiOperation({ summary: 'List all users' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
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

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return { user };
  }

  @ApiOperation({ summary: 'Update user profile' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @Put(':id')
  async updateProfile(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const user = await this.userService.updateProfile(id, dto);
    return { message: 'Profile updated', user };
  }

  @ApiOperation({ summary: 'Save user contact details' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @Post(':id/contact-details')
  async saveContactDetails(@Param('id') userId: string, @Body() dto: SaveContactDetailsDto) {
    const result = await this.userService.saveContactDetails(userId, dto);
    return { message: 'Contact details saved', contactDetails: result };
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User UUID' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
