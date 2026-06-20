// @ts-nocheck
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class medicalProfileService {
  private prisma: PrismaClient;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    this.prisma = new PrismaClient({ adapter });
  }

  async saveStep(userId: string, step: number, dto: any) {
    // Find the User's client profile
    const User = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { ClientProfile: true },
    });
    if (!User) {
      throw new NotFoundException('User not found');
    }

    // Ensure client profile exists
    let clientProfileId = User.ClientProfile?.id;
    if (!clientProfileId) {
      const profile = await this.prisma.clientProfile.create({
        data: { userId },
      });
      clientProfileId = profile.id;
    }

    const data = this.buildStepData(step, dto);
    if (!data) {
      throw new NotFoundException('Invalid step');
    }

    // Find existing record for this ClientProfile + step combination
    const existing = await this.prisma.medicalProfile.findFirst({
      where: { clientProfileId, step },
    });

    if (existing) {
      return this.prisma.medicalProfile.update({
        where: { id: existing.id },
        data,
      });
    }

    return this.prisma.medicalProfile.create({
      data: { clientProfileId, step, ...data },
    });
  }

  private buildStepData(step: number, dto: any) {
    switch (step) {
      case 1:
        return {
          mentalHealthHistory: [
            dto.therapyHistory || '',
            dto.pastDiagnosis || '',
            dto.traumaHistory || '',
            dto.psychiatricHospital || '',
            dto.hospitalReason || '',
            dto.hospitalDate || '',
          ].filter(Boolean).join('\n'),
        };
      case 2:
        return {
          presentingConcerns: [
            dto.bringsYouToTherapy || '',
            dto.howLongExperiencing || '',
            dto.affectingDailyLife || '',
            dto.expectations || '',
          ].filter(Boolean).join('\n'),
        };
      case 3:
        return {
          medicalMedication: [
            dto.medicalConditions ? `Conditions: ${dto.medicalConditions.join(', ')}` : '',
            dto.otherConditions || '',
            dto.tobaccoUse || '',
            dto.alcoholConsumption || '',
            dto.otherSubstances || '',
            dto.currentMedications || '',
          ].filter(Boolean).join('\n'),
        };
      case 4:
        return {
          riskSafety: [
            `Self-harm thoughts: ${dto.selfHarmThoughts || ''}`,
            `Self-harm history: ${dto.selfHarmHistory || ''}`,
            `Thoughts of harming others: ${dto.harmOthers || ''}`,
          ].join('\n'),
          completed: true,
        };
      default:
        return null;
    }
  }

  async getProfile(userId: string) {
    const User = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { ClientProfile: true },
    });
    if (!User || !User.ClientProfile) {
      return null;
    }

    const profiles = await this.prisma.medicalProfile.findMany({
      where: { clientProfileId: User.ClientProfile.id },
      orderBy: { step: 'asc' },
    });
    return profiles;
  }

  async getFullProfile(userId: string) {
    const User = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        ClientProfile: {
          include: {
            medicalProfile: { orderBy: { step: 'asc' } },
          },
        },
      },
    });
    if (!User) {
      throw new NotFoundException('User not found');
    }
    const { passwordHash: _, ...UserWithoutPassword } = User;
    return UserWithoutPassword;
  }

  async findAllProfiles(page = 1, limit: number = 20) {
    const [profiles, total] = await Promise.all([
      this.prisma.medicalProfile.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          ClientProfile: {
            include: {
              User: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                },
              },
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
