// TeleHealings — Shared Types

export type UserRole = 'admin' | 'therapist' | 'user';

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended' | 'guest';

export type SessionStatus = 'scheduled' | 'ongoing' | 'completed' | 'cancelled' | 'rescheduled' | 'no_show';

export type SessionType = 'video' | 'audio';

export type TherapistStatus = 'pending' | 'approved' | 'suspended';

export type TransactionDirection = 'inflow' | 'outflow';

export type TransactionType = 'session_payment' | 'weekly_payout' | 'premium_subscription' | 'refund';

export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded';

export type ContentType = 'article' | 'audio' | 'video' | 'exercise';

export type ContentStatus = 'published' | 'draft' | 'archived';

export type FocusArea = 'stress' | 'anxiety' | 'sleep' | 'relationships' | 'self-esteem' | 'focus';

export type MoodType = 'energized' | 'calm' | 'okay' | 'sad' | 'stressed';

export type Gender = 'male' | 'female' | 'other';

export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed';

export type Occupation = 'student' | 'employed' | 'unemployed';

export interface User {
  id: string;
  email: string | null;
  phone: string | null;
  displayName: string;
  fullName: string | null;
  avatarUrl: string | null;
  dateOfBirth: string | null;
  gender: Gender | null;
  occupation: Occupation | null;
  maritalStatus: MaritalStatus | null;
  address: string | null;
  emergencyContactName: string | null;
  emergencyContactPhone: string | null;
  emergencyContactRelationship: string | null;
  status: UserStatus;
  phoneVerifiedAt: string | null;
  emailVerifiedAt: string | null;
  termsAcceptedAt: string | null;
  focusAreas: FocusArea[];
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string | null;
}

export interface Therapist {
  id: string;
  email: string;
  phone: string;
  fullName: string;
  avatarUrl: string | null;
  bio: string | null;
  specializations: string[];
  languages: string[];
  sessionFee: number;
  rating: number;
  totalSessions: number;
  totalReviews: number;
  wouldRecommendPercent: number;
  status: TherapistStatus;
  verificationStatus: 'unverified' | 'verified';
  tier: 'junior' | 'senior' | 'specialist';
  experienceYears: number;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  clientId: string;
  therapistId: string;
  type: SessionType;
  status: SessionStatus;
  scheduledAt: string;
  duration: number;
  notes: string | null;
  sessionFee: number;
  platformFee: number;
  totalAmount: number;
  stripePaymentIntentId: string | null;
  cancellationReason: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  trxId: string;
  userId: string;
  therapistId: string | null;
  direction: TransactionDirection;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  stripePaymentIntentId: string | null;
  description: string | null;
  createdAt: string;
}

export interface Content {
  id: string;
  title: string;
  description: string | null;
  type: ContentType;
  status: ContentStatus;
  thumbnailUrl: string | null;
  contentUrl: string | null;
  duration: number | null;
  tags: string[];
  focusAreas: FocusArea[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | null;
  rating: number;
  totalViews: number;
  totalBookmarks: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: MoodType;
  journalText: string | null;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  readAt: string | null;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessageAt: string;
  createdAt: string;
}

export interface TherapistReview {
  id: string;
  sessionId: string;
  clientId: string;
  therapistId: string;
  overallRating: number;
  wouldRecommend: boolean;
  positiveAspects: string[];
  comments: string | null;
  createdAt: string;
}

export interface Promotion {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed' | 'shipping';
  discountValue: number;
  validUntil: string;
  usageLimit: number;
  usageCount: number;
  status: 'active' | 'expired' | 'draft';
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  data: Record<string, unknown> | null;
  readAt: string | null;
  createdAt: string;
}

export interface TherapistAvailability {
  id: string;
  therapistId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
  message: string | null;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
