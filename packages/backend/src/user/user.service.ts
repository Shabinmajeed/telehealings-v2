// @ts-nocheck
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
    const userId = crypto.randomUUID();
    const profileId = crypto.randomUUID();

    await this.prisma.$transaction([
      this.prisma.user.create({
        data: {
          id: userId,
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          passwordHash: hashedPassword,
          phone: dto.phone || null,
          role: 'CLIENT',
          isActive: true,
          isVerified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }),
      this.prisma.clientProfile.create({
        data: {
          id: profileId,
          userId: userId,
          dateOfBirth: dto.dob ? new Date(dto.dob) : null,
          gender: dto.gender || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }),
    ]);

    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { ClientProfile: true },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash || '');
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { passwordHash: _, ...userWithoutPassword } = user;
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
          ClientProfile: {
            select: { dateOfBirth: true, gender: true, emergencyContact: true },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users.map(({ passwordHash: _, ...u }) => u),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { ClientProfile: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateProfile(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { ClientProfile: true },
    });
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
        ...(dto.avatarUrl && { avatarUrl: dto.avatarUrl }),
        updatedAt: new Date(),
      },
    });

    if (user.ClientProfile && (dto.dob !== undefined || dto.gender !== undefined)) {
      await this.prisma.clientProfile.update({
        where: { id: user.ClientProfile.id },
        data: {
          ...(dto.dob !== undefined && { dateOfBirth: dto.dob ? new Date(dto.dob) : null }),
          ...(dto.gender !== undefined && { gender: dto.gender }),
          updatedAt: new Date(),
        },
      });
    }

    const { passwordHash: _, ...userWithoutPassword } = updated;
    return userWithoutPassword;
  }

  async saveContactDetails(userId: string, dto: SaveContactDetailsDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const emergencyContact = JSON.stringify({
      name: dto.emergencyName || '',
      phone: dto.emergencyPhone || '',
      relationship: dto.emergencyRelation || '',
    });

    const result = await this.prisma.clientProfile.upsert({
      where: { userId },
      create: {
        id: crypto.randomUUID(),
        userId,
        emergencyContact,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        emergencyContact,
        updatedAt: new Date(),
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
