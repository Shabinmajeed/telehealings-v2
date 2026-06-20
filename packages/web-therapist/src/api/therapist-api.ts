import customInstance from './custom-instance';

export interface TherapistProfile {
  id: string;
  userId: string;
  specialization: string[];
  bio?: string | null;
  licenseNumber?: string | null;
  licenseState?: string | null;
  yearsExperience: number;
  rating: number;
  totalSessions: number;
  isVerified: boolean;
  isAvailable: boolean;
  hourlyRate?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface TherapistUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatarUrl?: string | null;
  role: string;
  isActive: boolean;
  TherapistProfile?: TherapistProfile;
}

export interface Appointment {
  id: string;
  clientId: string;
  therapistId: string;
  scheduledAt: string;
  duration: number;
  type: 'VIDEO' | 'AUDIO' | 'CHAT';
  notes?: string | null;
  status: 'SCHEDULED' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  createdAt: string;
  updatedAt: string;
  ClientProfile?: {
    User?: {
      id: string;
      firstName: string;
      lastName: string;
      avatarUrl?: string | null;
    };
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const therapistApi = {
  // Profile
  getProfile: () =>
    customInstance.get<TherapistUser>('/api/user/me'),

  // Appointments
  getAppointments: (params?: { page?: number; limit?: number; status?: string }) =>
    customInstance.get<PaginatedResponse<Appointment>>('/api/booking/therapist/appointments', { params }),

  updateAppointmentStatus: (id: string, status: string) =>
    customInstance.patch(`/api/booking/appointments/${id}/status`, { status }),

  // Dashboard stats
  getStats: async () => {
    const [appointments, profile] = await Promise.all([
      customInstance.get<PaginatedResponse<Appointment>>('/api/booking/therapist/appointments', { params: { limit: 100 } }),
      customInstance.get<TherapistUser>('/api/user/me'),
    ]);
    const appts = appointments.data?.data || [];
    return {
      totalAppointments: appointments.data?.total || 0,
      upcomingAppointments: appts.filter(a => a.status === 'SCHEDULED' || a.status === 'CONFIRMED').length,
      completedAppointments: appts.filter(a => a.status === 'COMPLETED').length,
      profile: profile.data,
    };
  },
};
