// @ts-nocheck
// @ts-nocheck
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import { CreateTherapistDto } from './dto/create-therapist.dto';

@Injectable()
export class TherapistService {
  private prisma: PrismaClient;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    this.prisma = new PrismaClient({ adapter });
  }

  async create(dto: CreateTherapistDto) {
    // Check if user with this email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create User with THERAPIST role and TherapistProfile in one go
    return this.prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        passwordHash: hashedPassword,
        phone: dto.phone || null,
        role: 'THERAPIST',
        isActive: true,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        TherapistProfile: {
          create: {
            id: crypto.randomUUID(),
            specialization: dto.specialization ? [dto.specialization] : [],
            bio: dto.bio || null,
            yearsExperience: dto.experience || 0,
            isVerified: false,
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
      include: {
        TherapistProfile: true,
      },
    });
  }

  async findAll(page = 1, limit = 10, search?: string, status?: string) {
    const where: any = { role: 'THERAPIST' };
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' as const } },
        { lastName: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
      ];
    }
    if (status) {
      where.TherapistProfile = { isVerified: status === 'approved' };
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          TherapistProfile: true,
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
    const user = await this.prisma.user.findFirst({
      where: { id, role: 'THERAPIST' },
      include: { TherapistProfile: true } as any,
    });
    if (!user) {
      throw new NotFoundException(`Therapist with ID ${id} not found`);
    }
    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateStatus(id: string, status: string) {
    const user = await this.findOne(id);
    const userId = (user as any).id;

    // Find the therapist profile
    const userWithProfile = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { TherapistProfile: true } as any,
    });

    if (!userWithProfile || !userWithProfile.TherapistProfile) {
      throw new NotFoundException('Therapist profile not found');
    }

    return this.prisma.therapistProfile.update({
      where: { id: userWithProfile.TherapistProfile.id },
      data: { isVerified: status === 'approved' },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'Therapist deleted successfully' };
  }
}
