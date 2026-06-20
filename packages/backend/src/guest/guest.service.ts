// @ts-nocheck
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@Injectable()
export class GuestService {
  private prisma: PrismaClient;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    this.prisma = new PrismaClient({ adapter });
  }

  async create(dto: CreateGuestDto) {
    const email = dto.email || `guest_${Date.now()}@temp.telehealings.com`;

    if (dto.email) {
      const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (existing) {
        throw new ConflictException('A user with this email already exists');
      }
    }

    return this.prisma.user.create({
      data: {
        firstName: dto.name.split(' ')[0] || dto.name,
        lastName: dto.name.split(' ').slice(1).join(' ') || '',
        email,
        phone: dto.phone || null,
        role: 'CLIENT',
        isActive: false,
      },
    });
  }

  async findAll(page = 1, limit = 10, search?: string) {
    const where: any = { role: 'CLIENT', isActive: false };
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' as const } },
        { lastName: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: data.map(({ passwordHash: _, ...u }) => u),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Guest user with ID ${id} not found`);
    }
    const { passwordHash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: string, dto: UpdateGuestDto) {
    const user = await this.findOne(id);
    const updateData: any = {};
    if (dto.name !== undefined) {
      updateData.firstName = dto.name.split(' ')[0] || dto.name;
      updateData.lastName = dto.name.split(' ').slice(1).join(' ') || '';
    }
    if (dto.firstName !== undefined) updateData.firstName = dto.firstName;
    if (dto.lastName !== undefined) updateData.lastName = dto.lastName;
    if (dto.email !== undefined) updateData.email = dto.email;
    if (dto.phone !== undefined) updateData.phone = dto.phone;

    const updated = await (this.prisma.user.update({
      where: { id },
      data: updateData,
    }) as any);

    const { passwordHash: _, ...userWithoutPassword } = updated;
    return userWithoutPassword;
  }

  async updateProfile(id: string, dto: UpdateGuestDto) {
    const user = await this.findOne(id);
    const userId = (user as any).id;

    const userUpdate: any = {};
    if (dto.firstName !== undefined) userUpdate.firstName = dto.firstName;
    if (dto.lastName !== undefined) userUpdate.lastName = dto.lastName;
    if (dto.email !== undefined) userUpdate.email = dto.email;
    if (dto.phone !== undefined) userUpdate.phone = dto.phone;

    if (Object.keys(userUpdate).length > 0) {
      await this.prisma.user.update({ where: { id: userId }, data: userUpdate });
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'Guest deleted successfully' };
  }

  async convert(id: string, userData?: {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    dob?: string;
    gender?: string;
  }) {
    const guest = await this.findOne(id);
    const guestId = (guest as any).id;

    const email = userData?.email || (guest as any).email;
    if (email) {
      const existingUser = await this.prisma.user.findUnique({ where: { email } });
      if (existingUser && existingUser.id !== guestId) {
        throw new ConflictException('Email already registered as a full user');
      }
    }

    const password = userData?.password || 'TempPass123!';
    const hashedPassword = await bcrypt.hash(password, 10);

    const firstName = userData?.firstName || (guest as any).firstName;
    const lastName = userData?.lastName || (guest as any).lastName;

    const updated = await (this.prisma.user.update({
      where: { id: guestId },
      data: {
        email: email || undefined,
        passwordHash: hashedPassword,
        firstName,
        lastName,
        phone: userData?.phone || (guest as any).phone,
        isActive: true,
        role: 'CLIENT',
      },
    }) as any);

    const { passwordHash: _, ...userWithoutPassword } = updated;
    return userWithoutPassword;
  }
}
