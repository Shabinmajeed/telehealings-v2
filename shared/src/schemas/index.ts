// TeleHealings — Shared Zod Schemas

import { z } from 'zod';

// ── Auth Schemas ──

export const softOnboardingSchema = z.object({
  displayName: z.string().min(1, 'Name is required').max(100),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms' }),
  }),
});

export const personalisationSchema = z.object({
  focusAreas: z.array(z.enum(['stress', 'anxiety', 'sleep', 'relationships', 'self-esteem', 'focus']))
    .min(1, 'Select at least 1 focus area')
    .max(3, 'Maximum 3 focus areas'),
});

export const loginSchema = z.object({
  emailOrPhone: z.string().min(1, 'Email or phone is required'),
});

export const otpVerifySchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const profileCompletionSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  gender: z.enum(['male', 'female', 'other']),
  occupation: z.enum(['student', 'employed', 'unemployed']),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']),
});

export const contactDetailsSchema = z.object({
  address: z.string().min(3, 'Address is required'),
  emergencyContactName: z.string().min(2, 'Name is required'),
  emergencyContactPhone: z.string().min(7, 'Phone is required'),
  emergencyContactRelationship: z.enum(['parent', 'spouse', 'sibling', 'friend']),
});

// ── Session Schemas ──

export const bookSessionSchema = z.object({
  therapistId: z.string().uuid('Invalid therapist'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time'),
  type: z.enum(['video', 'audio']),
});

export const cancelSessionSchema = z.object({
  reason: z.enum(['schedule_conflict', 'not_feeling_well', 'found_different_therapist', 'financial_reasons', 'no_longer_needed', 'other']),
  notes: z.string().max(500).optional(),
});

// ── Review Schema ──

export const sessionReviewSchema = z.object({
  overallRating: z.number().int().min(1).max(5),
  wouldRecommend: z.boolean(),
  positiveAspects: z.array(z.string()).max(6),
  comments: z.string().max(1000).optional(),
});

// ── Mood Schema ──

export const moodEntrySchema = z.object({
  mood: z.enum(['energized', 'calm', 'okay', 'sad', 'stressed']),
  journalText: z.string().max(2000).optional(),
});

// ── Message Schema ──

export const sendMessageSchema = z.object({
  conversationId: z.string().uuid(),
  content: z.string().min(1).max(5000),
});

// ── Promotion Schema ──

export const createPromotionSchema = z.object({
  code: z.string().min(3).max(50),
  discountType: z.enum(['percentage', 'fixed', 'shipping']),
  discountValue: z.number().positive(),
  validUntil: z.string().datetime(),
  usageLimit: z.number().int().positive(),
});

// ── Type Exports ──

export type SoftOnboardingInput = z.infer<typeof softOnboardingSchema>;
export type PersonalisationInput = z.infer<typeof personalisationSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>;
export type ProfileCompletionInput = z.infer<typeof profileCompletionSchema>;
export type ContactDetailsInput = z.infer<typeof contactDetailsSchema>;
export type BookSessionInput = z.infer<typeof bookSessionSchema>;
export type CancelSessionInput = z.infer<typeof cancelSessionSchema>;
export type SessionReviewInput = z.infer<typeof sessionReviewSchema>;
export type MoodEntryInput = z.infer<typeof moodEntrySchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type CreatePromotionInput = z.infer<typeof createPromotionSchema>;
