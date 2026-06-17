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
    if (dto.email) {
      const existing = await this.prisma.guestUser.findUnique({
        where: { email: dto.email },
      });
      if (existing) {
        throw new ConflictException('A user with this email already exists');
      }
    }

    return this.prisma.guestUser.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        personalisation: dto.personalisation as any,
        tcAcceptedAt: new Date(),
        status: 'GUEST',
      },
    });
  }

  async findAll(page = 1, limit = 10, search?: string) {
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.guestUser.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.guestUser.count({ where }),
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
    const guest = await this.prisma.guestUser.findUnique({
      where: { id },
      include: { user: { include: { contactDetails: true, medicalProfile: true } } },
    });
    if (!guest) {
      throw new NotFoundException(`Guest user with ID ${id} not found`);
    }
    return guest;
  }

  async update(id: string, dto: UpdateGuestDto) {
    await this.findOne(id);

    const updateData: any = {};
    if (dto.name !== undefined) updateData.name = dto.name;
    if (dto.firstName !== undefined) updateData.name = `${dto.firstName} ${dto.lastName || ''}`.trim();
    if (dto.email !== undefined) updateData.email = dto.email;
    if (dto.phone !== undefined) updateData.phone = dto.phone;
    if (dto.personalisation !== undefined) updateData.personalisation = dto.personalisation;

    return this.prisma.guestUser.update({
      where: { id },
      data: updateData,
    });
  }

  async updateProfile(id: string, dto: UpdateGuestDto) {
    const guest = await this.findOne(id);

    // Update guest fields
    const updateData: any = {};
    if (dto.firstName !== undefined) {
      updateData.name = `${dto.firstName} ${dto.lastName || ''}`.trim();
    }
    if (dto.email !== undefined) updateData.email = dto.email;
    if (dto.phone !== undefined) updateData.phone = dto.phone;
    if (dto.personalisation !== undefined) updateData.personalisation = dto.personalisation;

    if (Object.keys(updateData).length > 0) {
      await this.prisma.guestUser.update({ where: { id }, data: updateData });
    }

    // If guest has been converted to user, update user profile too
    if (guest.user) {
      const userUpdate: any = {};
      if (dto.firstName !== undefined) userUpdate.firstName = dto.firstName;
      if (dto.lastName !== undefined) userUpdate.lastName = dto.lastName;
      if (dto.email !== undefined) userUpdate.email = dto.email;
      if (dto.phone !== undefined) userUpdate.phone = dto.phone;
      if (dto.dob !== undefined) userUpdate.dob = dto.dob;
      if (dto.gender !== undefined) userUpdate.gender = dto.gender;
      if (dto.occupation !== undefined) userUpdate.occupation = dto.occupation;
      if (dto.maritalStatus !== undefined) userUpdate.maritalStatus = dto.maritalStatus;

      if (Object.keys(userUpdate).length > 0) {
        await this.prisma.user.update({ where: { id: guest.user.id }, data: userUpdate });
      }

      // Save contact details if provided
      if (dto.address || dto.emergencyName || dto.emergencyPhone || dto.emergencyRelation) {
        await this.prisma.contactDetails.upsert({
          where: { userId: guest.user.id },
          create: {
            userId: guest.user.id,
            address: dto.address || '',
            emergencyName: dto.emergencyName || '',
            emergencyPhone: dto.emergencyPhone || '',
            emergencyRelation: dto.emergencyRelation || '',
          },
          update: {
            ...(dto.address && { address: dto.address }),
            ...(dto.emergencyName && { emergencyName: dto.emergencyName }),
            ...(dto.emergencyPhone && { emergencyPhone: dto.emergencyPhone }),
            ...(dto.emergencyRelation && { emergencyRelation: dto.emergencyRelation }),
          },
        });
      }
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.guestUser.delete({ where: { id } });
  }

  async convert(id: string, userData?: {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    dob?: string;
    gender?: string;
    occupation?: string;
    maritalStatus?: string;
  }) {
    const guest = await this.findOne(id);
    if (guest.status !== 'GUEST') {
      throw new ConflictException(`Guest user is already ${guest.status}`);
    }

    // Check if email already exists in users table
    const email = userData?.email || guest.email;
    if (email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new ConflictException('Email already registered as a full user');
      }
    }

    // Generate a default password if not provided
    const password = userData?.password || 'TempPass123!';
    const hashedPassword = await bcrypt.hash(password, 10);

    const firstName = userData?.firstName || guest.name.split(' ')[0] || guest.name;
    const lastName = userData?.lastName || guest.name.split(' ').slice(1).join(' ') || '';

    // Create user and update guest status in a transaction
    const [user] = await this.prisma.$transaction([
      this.prisma.user.create({
        data: {
          guestId: id,
          email: email || `${guest.id}@temp.telehealings.com`,
          password: hashedPassword,
          firstName,
          lastName,
          phone: userData?.phone || guest.phone,
          dob: userData?.dob || '',
          gender: userData?.gender || '',
          occupation: userData?.occupation || '',
          maritalStatus: userData?.maritalStatus || '',
        },
      }),
      this.prisma.guestUser.update({
        where: { id },
        data: {
          status: 'REGISTERED',
          convertedAt: new Date(),
          email: email || guest.email,
        },
      }),
    ]);

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
