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
    const existing = await this.prisma.therapist.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('A therapist with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.therapist.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: hashedPassword,
        phone: dto.phone,
        dob: dto.dob,
        specialization: dto.specialization,
        credentials: dto.credentials,
        bio: dto.bio,
        experience: dto.experience || 0,
        status: 'PENDING',
        sessionCount: 0,
      },
    });
  }

  async findAll(page = 1, limit = 10, search?: string, status?: string) {
    const where: any = {};
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' as const } },
        { lastName: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
        { specialization: { contains: search, mode: 'insensitive' as const } },
      ];
    }
    if (status) {
      where.status = status;
    }

    const [data, total] = await Promise.all([
      this.prisma.therapist.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          specialization: true,
          status: true,
          sessionCount: true,
          credentials: true,
          experience: true,
          createdAt: true,
        },
      }),
      this.prisma.therapist.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const therapist = await this.prisma.therapist.findUnique({
      where: { id },
    });
    if (!therapist) {
      throw new NotFoundException(`Therapist with ID ${id} not found`);
    }
    return therapist;
  }

  async updateStatus(id: string, status: string) {
    await this.findOne(id);
    return this.prisma.therapist.update({
      where: { id },
      data: { status: status as any },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.therapist.delete({ where: { id } });
  }
}
