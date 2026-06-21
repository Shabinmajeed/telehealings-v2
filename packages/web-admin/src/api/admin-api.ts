import customInstance from './custom-instance';

// ─── Types ───

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  avatarUrl?: string | null;
  role: 'ADMIN' | 'THERAPIST' | 'CLIENT';
  isActive: boolean;
  isVerified: boolean;
  lastLoginAt?: string | null;
  createdAt: string;
  updatedAt: string;
  ClientProfile?: {
    id: string;
    dateOfBirth?: string | null;
    gender?: string | null;
    emergencyContact?: string | null;
  } | null;
  TherapistProfile?: {
    id: string;
    specialization: string[];
    bio?: string | null;
    yearsExperience: number;
    rating: number;
    totalSessions: number;
    isVerified: boolean;
    isAvailable: boolean;
    hourlyRate?: number | null;
  } | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TherapistWithUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string | null;
  TherapistProfile: {
    id: string;
    specialization: string[];
    bio?: string | null;
    yearsExperience: number;
    rating: number;
    totalSessions: number;
    isVerified: boolean;
    isAvailable: boolean;
    hourlyRate?: number | null;
  };
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
  cancellationReason?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalTherapists: number;
  totalAppointments: number;
  pendingApprovals: number;
}

// ─── API Functions ───

export const adminApi = {
  // Users
  getUsers: (params?: { page?: number; limit?: number; search?: string }) =>
    customInstance.get<PaginatedResponse<User>>('/api/user', { params }),

  getUser: (id: string) =>
    customInstance.get<User>(`/api/user/${id}`),

  updateUser: (id: string, data: Partial<User>) =>
    customInstance.put<User>(`/api/user/${id}`, data),

  deleteUser: (id: string) =>
    customInstance.delete(`/api/user/${id}`),

  // Guests
  getGuests: (params?: { page?: number; limit?: number; search?: string }) =>
    customInstance.get<PaginatedResponse<User>>('/guest', { params }),

  convertGuest: (guestId: string, userData?: any) =>
    customInstance.post(`/guest/${guestId}/convert`, userData || {}),

  // Therapists
  getTherapists: (params?: { page?: number; limit?: number; search?: string }) =>
    customInstance.get<PaginatedResponse<TherapistWithUser>>('/therapist', { params }),

  getTherapist: (id: string) =>
    customInstance.get<TherapistWithUser>(`/therapist/${id}`),

  updateTherapistStatus: (id: string, status: string) =>
    customInstance.patch(`/therapist/${id}/status`, { status }),

  deleteTherapist: (id: string) =>
    customInstance.delete(`/therapist/${id}`),

  // Appointments
  getAppointments: (params?: { page?: number; limit?: number; status?: string }) =>
    customInstance.get<PaginatedResponse<Appointment>>('/api/booking/appointments', { params }),

  // Dashboard stats (computed from existing endpoints)
  getStats: async (): Promise<DashboardStats> => {
    const [users, therapists, appointments, guests] = await Promise.all([
      customInstance.get<PaginatedResponse<User>>('/api/user', { params: { limit: 1 } }),
      customInstance.get<PaginatedResponse<TherapistWithUser>>('/therapist', { params: { limit: 1 } }),
      customInstance.get<PaginatedResponse<Appointment>>('/api/booking/appointments', { params: { limit: 1 } }),
      customInstance.get<PaginatedResponse<User>>('/guest', { params: { limit: 1 } }),
    ]);
    return {
      totalUsers: users.data?.total || 0,
      totalTherapists: therapists.data?.total || 0,
      totalAppointments: appointments.data?.total || 0,
      pendingApprovals: guests.data?.total || 0,
    };
  },
};
