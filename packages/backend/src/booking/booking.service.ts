// @ts-nocheck
import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class BookingService {
  private prisma: PrismaClient;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    this.prisma = new PrismaClient({ adapter });
  }

  // ─── Therapist Discovery ───

  async discoverTherapists(page = 1, limit = 12, search?: string, specialization?: string) {
    const where: any = {
      role: 'THERAPIST',
      isActive: true,
      TherapistProfile: {
        isVerified: true,
        isAvailable: true,
      },
    };

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' as const } },
        { lastName: { contains: search, mode: 'insensitive' as const } },
      ];
    }

    if (specialization) {
      where.TherapistProfile = {
        ...where.TherapistProfile,
        specialization: { has: specialization },
      };
    }

    const [therapists, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatarUrl: true,
          TherapistProfile: {
            select: {
              specialization: true,
              bio: true,
              yearsExperience: true,
              rating: true,
              totalSessions: true,
              hourlyRate: true,
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { data: therapists, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getTherapistProfile(therapistId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: therapistId, role: 'THERAPIST', isActive: true },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        TherapistProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Therapist not found');
    }

    return user;
  }

  async getTherapistAvailability(therapistId: string) {
    const availability = await this.prisma.therapistAvailability.findMany({
      where: { therapistId, isAvailable: true },
      orderBy: { dayOfWeek: 'asc' },
    });

    return availability;
  }

  // ─── Appointments ───

  async createAppointment(userId: string, dto: any) {
    // Verify therapist exists and is available
    const therapist = await this.prisma.user.findFirst({
      where: { id: dto.therapistId, role: 'THERAPIST', isActive: true },
      include: { TherapistProfile: true },
    });

    if (!therapist || !therapist.TherapistProfile?.isAvailable) {
      throw new NotFoundException('Therapist not found or not available');
    }

    // Verify client profile exists
    const clientProfile = await this.prisma.clientProfile.findUnique({
      where: { userId },
    });

    if (!clientProfile) {
      throw new BadRequestException('Client profile not found. Please complete your profile first.');
    }

    // Check for conflicting appointments
    const conflicting = await this.prisma.appointment.findFirst({
      where: {
        therapistId: dto.therapistId,
        scheduledAt: new Date(dto.scheduledAt),
        status: { in: ['SCHEDULED', 'CONFIRMED', 'IN_PROGRESS'] },
      },
    });

    if (conflicting) {
      throw new ConflictException('This time slot is already booked');
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        id: crypto.randomUUID(),
        clientId: clientProfile.id,
        therapistId: dto.therapistId,
        scheduledAt: new Date(dto.scheduledAt),
        duration: dto.duration || 60,
        type: dto.type || 'VIDEO',
        notes: dto.notes || null,
        status: 'SCHEDULED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        TherapistProfile: {
          include: {
            User: { select: { id: true, firstName: true, lastName: true, avatarUrl: true } },
          },
        },
      },
    });

    return appointment;
  }

  async getUserAppointments(userId: string, page = 1, limit = 10) {
    const clientProfile = await this.prisma.clientProfile.findUnique({ where: { userId } });
    if (!clientProfile) {
      return { data: [], total: 0, page, limit, totalPages: 0 };
    }

    const [appointments, total] = await Promise.all([
      this.prisma.appointment.findMany({
        where: { clientId: clientProfile.id },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { scheduledAt: 'desc' },
        include: {
          TherapistProfile: {
            include: {
              User: { select: { id: true, firstName: true, lastName: true, avatarUrl: true } },
            },
          },
          Session: { select: { id: true, status: true, recordingUrl: true } },
          Payment: { select: { id: true, status: true, amount: true } },
        },
      }),
      this.prisma.appointment.count({ where: { clientId: clientProfile.id } }),
    ]);

    return { data: appointments, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getTherapistAppointments(therapistId: string, page = 1, limit: number, status?: string) {
    const where: any = { therapistId };
    if (status) {
      where.status = status;
    }

    const [appointments, total] = await Promise.all([
      this.prisma.appointment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { scheduledAt: 'desc' },
        include: {
          ClientProfile: {
            include: {
              User: { select: { id: true, firstName: true, lastName: true, avatarUrl: true } },
            },
          },
          Session: { select: { id: true, status: true } },
          Payment: { select: { id: true, status: true, amount: true } },
        },
      }),
      this.prisma.appointment.count({ where }),
    ]);

    return { data: appointments, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getAppointmentById(appointmentId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        ClientProfile: {
          include: {
            User: { select: { id: true, firstName: true, lastName: true, avatarUrl: true } },
          },
        },
        TherapistProfile: {
          include: {
            User: { select: { id: true, firstName: true, lastName: true, avatarUrl: true } },
          },
        },
        Session: true,
        Payment: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  async updateAppointmentStatus(appointmentId: string, status: string, userId: string) {
    const appointment = await this.getAppointmentById(appointmentId);

    // Verify the user is part of this appointment
    const clientProfile = await this.prisma.clientProfile.findUnique({ where: { userId } });
    const isClient = clientProfile && appointment.clientId === clientProfile.id;
    const isTherapist = appointment.therapistId === userId;

    if (!isClient && !isTherapist) {
      throw new BadRequestException('You are not authorized to update this appointment');
    }

    const updated = await this.prisma.appointment.update({
      where: { id: appointmentId },
      data: { status, updatedAt: new Date() },
    });

    return updated;
  }

  async cancelAppointment(appointmentId: string, userId: string, reason?: string) {
    const appointment = await this.getAppointmentById(appointmentId);

    const clientProfile = await this.prisma.clientProfile.findUnique({ where: { userId } });
    const isClient = clientProfile && appointment.clientId === clientProfile.id;
    const isTherapist = appointment.therapistId === userId;

    if (!isClient && !isTherapist) {
      throw new BadRequestException('You are not authorized to cancel this appointment');
    }

    return this.prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        status: 'CANCELLED',
        cancellationReason: reason || null,
        updatedAt: new Date(),
      },
    });
  }
}
