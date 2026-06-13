// TeleHealings — Shared Constants

export const FOCUS_AREAS = [
  { id: 'stress', label: 'Stress', color: '#ef4444' },
  { id: 'anxiety', label: 'Anxiety', color: '#f59e0b' },
  { id: 'sleep', label: 'Sleep', color: '#3b82f6' },
  { id: 'relationships', label: 'Relationships', color: '#ec4899' },
  { id: 'self-esteem', label: 'Self-esteem', color: '#8b5cf6' },
  { id: 'focus', label: 'Focus', color: '#10b981' },
] as const;

export const MOODS = [
  { id: 'energized', label: 'Energized', emoji: '🤩', color: '#22c55e' },
  { id: 'calm', label: 'Calm', emoji: '😊', color: '#3b82f6' },
  { id: 'okay', label: 'Okay', emoji: '😐', color: '#94a3b8' },
  { id: 'sad', label: 'Sad', emoji: '😢', color: '#6366f1' },
  { id: 'stressed', label: 'Stressed', emoji: '😰', color: '#ef4444' },
] as const;

export const SESSION_TYPES = [
  { id: 'video', label: 'Video Call', duration: 50, icon: 'video' },
  { id: 'audio', label: 'Audio Call', duration: 50, icon: 'phone' },
] as const;

export const GENDERS = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' },
] as const;

export const MARITAL_STATUSES = [
  { id: 'single', label: 'Single' },
  { id: 'married', label: 'Married' },
  { id: 'divorced', label: 'Divorced' },
  { id: 'widowed', label: 'Widowed' },
] as const;

export const OCCUPATIONS = [
  { id: 'student', label: 'Student' },
  { id: 'employed', label: 'Employed' },
  { id: 'unemployed', label: 'Unemployed' },
] as const;

export const EMERGENCY_RELATIONSHIPS = [
  { id: 'parent', label: 'Parent' },
  { id: 'spouse', label: 'Spouse' },
  { id: 'sibling', label: 'Sibling' },
  { id: 'friend', label: 'Friend' },
] as const;

export const CANCELLATION_REASONS = [
  { id: 'schedule_conflict', label: 'Schedule conflict' },
  { id: 'not_feeling_well', label: 'Not feeling well' },
  { id: 'found_different_therapist', label: 'Found a different therapist' },
  { id: 'financial_reasons', label: 'Financial reasons' },
  { id: 'no_longer_needed', label: 'No longer needed' },
  { id: 'other', label: 'Other' },
] as const;

export const REVIEW_CHIPS = [
  'Good listener',
  'Helpful advice',
  'Easy to talk to',
  'Understanding',
  'Professional',
  'Punctual',
] as const;

export const SPECIALIZATIONS = [
  'Clinical Psychologist',
  'Behavioral Therapist',
  'Psychiatrist',
  'Marriage Counselor',
  'Child Psychologist',
  'Addiction Counselor',
  'Trauma Specialist',
  'Grief Counselor',
] as const;

export const LANGUAGES = [
  'English', 'Hindi', 'Malayalam', 'Tamil', 'Telugu', 'Kannada',
  'Marathi', 'Bengali', 'Gujarati', 'Punjabi', 'Urdu',
] as const;

export const CONTENT_CATEGORIES = [
  'All', 'Articles', 'Audio', 'Videos', 'Exercises',
] as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const JWT_CONFIG = {
  ACCESS_TOKEN_EXPIRY: '15m',
  REFRESH_TOKEN_EXPIRY: '7d',
} as const;

export const STRIPE_CONFIG = {
  PLATFORM_FEE_PERCENT: 10,
  CURRENCY: 'inr',
} as const;

export const CANCELLATION_POLICY = {
  FULL_REFUND_HOURS: 24,
  PARTIAL_REFUND_HOURS: 3,
  PARTIAL_REFUND_PERCENT: 50,
} as const;
