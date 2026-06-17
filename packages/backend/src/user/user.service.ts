import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SaveContactDetailsDto } from './dto/save-contact-details.dto';

@Injectable()
export class UserService {
  private prisma: PrismaClient;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    this.prisma = new PrismaClient({ adapter });
  }

  async register(dto: RegisterUserDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: hashedPassword,
        phone: dto.phone || null,
        dob: dto.dob,
        gender: dto.gender,
        occupation: dto.occupation,
        maritalStatus: dto.maritalStatus,
        guestId: dto.guestId || null,
      },
    });

    // If converting from guest, update guest status
    if (dto.guestId) {
      await this.prisma.guestUser.update({
        where: { id: dto.guestId },
        data: { status: 'REGISTERED', convertedAt: new Date() },
      });
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll(page = 1, limit = 20, search?: string) {
    const where = search
      ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' as const } },
            { lastName: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          contactDetails: false,
          medicalProfile: {
            select: { completed: true, createdAt: true, updatedAt: true },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users.map(({ password: _, ...u }) => u),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        contactDetails: true,
        medicalProfile: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateProfile(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        ...(dto.firstName && { firstName: dto.firstName }),
        ...(dto.lastName && { lastName: dto.lastName }),
        ...(dto.email && { email: dto.email }),
        ...(dto.phone && { phone: dto.phone }),
        ...(dto.dob && { dob: dto.dob }),
        ...(dto.gender && { gender: dto.gender }),
        ...(dto.occupation && { occupation: dto.occupation }),
        ...(dto.maritalStatus && { maritalStatus: dto.maritalStatus }),
        ...(dto.avatar && { avatar: dto.avatar }),
      },
    });

    const { password: _, ...userWithoutPassword } = updated;
    return userWithoutPassword;
  }

  async saveContactDetails(userId: string, dto: SaveContactDetailsDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const result = await this.prisma.contactDetails.upsert({
      where: { userId },
      create: {
        userId,
        address: dto.address,
        emergencyName: dto.emergencyName,
        emergencyPhone: dto.emergencyPhone,
        emergencyRelation: dto.emergencyRelation,
      },
      update: {
        address: dto.address,
        emergencyName: dto.emergencyName,
        emergencyPhone: dto.emergencyPhone,
        emergencyRelation: dto.emergencyRelation,
      },
    });

    return result;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }
}
