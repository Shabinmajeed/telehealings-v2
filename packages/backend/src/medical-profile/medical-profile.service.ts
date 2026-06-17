import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class MedicalProfileService {
  private prisma: PrismaClient;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    this.prisma = new PrismaClient({ adapter });
  }

  async saveStep(userId: string, step: number, dto: any) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const data = this.buildStepData(step, dto);
    if (!data) {
      throw new NotFoundException('Invalid step');
    }

    const profile = await this.prisma.medicalProfile.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });

    return profile;
  }

  private buildStepData(step: number, dto: any) {
    switch (step) {
      case 1:
        return {
          therapyHistory: dto.therapyHistory || '',
          pastDiagnosis: dto.pastDiagnosis || '',
          traumaHistory: dto.traumaHistory || '',
          psychiatricHospital: dto.psychiatricHospital || '',
          hospitalReason: dto.hospitalReason || '',
          hospitalDate: dto.hospitalDate || '',
        };
      case 2:
        return {
          bringsYouToTherapy: dto.bringsYouToTherapy || '',
          howLongExperiencing: dto.howLongExperiencing || '',
          affectingDailyLife: dto.affectingDailyLife || '',
          expectations: dto.expectations || '',
        };
      case 3:
        return {
          medicalConditions: dto.medicalConditions || [],
          otherConditions: dto.otherConditions || '',
          tobaccoUse: dto.tobaccoUse || '',
          alcoholConsumption: dto.alcoholConsumption || '',
          otherSubstances: dto.otherSubstances || '',
          currentMedications: dto.currentMedications || '',
        };
      case 4:
        return {
          selfHarmThoughts: dto.selfHarmThoughts || '',
          selfHarmHistory: dto.selfHarmHistory || '',
          harmOthers: dto.harmOthers || '',
          completed: true,
        };
      default:
        return null;
    }
  }

  async getProfile(userId: string) {
    const profile = await this.prisma.medicalProfile.findUnique({
      where: { userId },
    });
    return profile;
  }

  async getFullProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
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

  async findAllProfiles(page = 1, limit: number = 20) {
    const [profiles, total] = await Promise.all([
      this.prisma.medicalProfile.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      }),
      this.prisma.medicalProfile.count(),
    ]);

    return {
      data: profiles,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
