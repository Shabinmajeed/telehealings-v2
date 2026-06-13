# Telehealings — Product Document

> Living document — updated as we progress through the redesign.

---

## 1. Product Overview

**Telehealings** is a telehealth marketplace platform connecting patients with therapists. The platform serves three distinct user roles, each with their own portal:

| Role | Portal | Audience |
|------|--------|----------|
| **Admin** | Desktop web app | Platform administrators, clinic managers |
| **Therapist** | Desktop web app | Mental health practitioners |
| **User/Patient** | Mobile-first web app | Patients seeking therapy |

### 1.1 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React Native + Expo SDK 54 + TypeScript |
| Backend | NestJS |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma |
| Auth | Supabase Auth |
| State | Zustand |
| Payments | Stripe |
| Design files | Standalone HTML/CSS/JS (this project) |

### 1.2 Architecture Decision

**Approach B**: Frontend → Backend API → Database (NOT direct Supabase client for user-facing flows).

---

## 2. User Roles & Permissions

### 2.1 Admin
- Full platform access
- Manage therapists (approve, suspend, assign)
- Manage clients (view, edit, change status)
- View analytics, financials, compliance
- Content management (articles, resources)
- Promotion & offers management
- Communications oversight

### 2.2 Therapist
- View assigned clients
- Manage schedule & sessions
- Track payments & earnings
- Access clinical tools (PHQ-9, GAD-7, etc.)
- Content library
- Profile management
- Messages with clients

### 2.3 User/Patient
- Browse & discover therapists
- Book appointments (video/audio/chat)
- Track mood & wellness
- Manage profile & settings
- View session history
- Make payments
- Guest onboarding (name only, no email/password required initially)

---

## 3. Feature Inventory

### 3.1 Admin Features

| Feature | Page | Status | Notes |
|---------|------|--------|-------|
| Admin authentication | Login | ✅ | Email/password, no SSO |
| Dashboard overview | Dashboard | ✅ | KPIs, charts, Heali insights |
| Client management | Clients | ✅ | Table, inline filters, guest users, tags |
| Therapist management | Therapist | ✅ | Table, inline filters, add/update |
| Session scheduling | Schedule | ✅ | List/calendar views, dynamic filtering |
| Financial reporting | Financials | ✅ | Transactions, rates & tiers, payouts |
| Communications | Communications | ✅ | Chat UI, support tickets |
| Compliance & verification | Compliance | ✅ | Document review, multi-tab |
| Content management | Content Mgmt | ✅ | Articles, resources, card/table views |
| Analytics & reporting | Analytics | ✅ | KPI grid, chart placeholders |
| Promotions & offers | Promotion | ✅ | Promo codes, active/expired tabs |

### 3.2 Therapist Features

| Feature | Page | Status | Notes |
|---------|------|--------|-------|
| Therapist authentication | Login | ✅ | Email/password login, gradient bg, mascot |
| Therapist registration | Register | ✅ | 3-step form, terms modal, success modal, gradient bg |
| Dashboard | Home | ✅ | KPIs, upcoming sessions, messages |
| Sessions | Sessions | ✅ | Upcoming/completed tabs |
| Client list | Clients | ✅ | Client table, search, export |
| Calendar | Calendar | ✅ | Weekly view, session blocks |
| Messages | Messages | ✅ | Chat UI, conversation list |
| Resources | Resources | ✅ | My library + shared resources |
| Earnings | Earnings | ✅ | KPI cards, transactions, chart |
| Profile | Profile | ✅ | Personal/professional info |
| Settings | Settings | ✅ | Availability session prefs, notifications |
| Clinical tools | Tools | ✅ | 6 assessment instruments + quick actions |

### 3.3 User/Patient Features

| Feature | Page | Status | Notes |
|---------|------|--------|-------|
| Splash/Landing | Index | ✅ | Gradient bg, Heali mascot, fade animation |
| Marketing | Marketing | ✅ | Features, stats, CTA button |
| Soft Onboarding | Soft Onboarding | ✅ | Name entry, T&C modal with accept/reject |
| Personalisation | Personalisation | ✅ | Focus area selection (6 mood cards, max 3) |
| Home/Dashboard | Home | ✅ | Greeting, mood card, appointment, recommendations, verify banner, Heali chat |
| Discover therapists | Discover | ✅ | Search, category tabs, featured card, trending tags |
| Care dashboard | Care | ✅ | Therapist carousel, booking modal popup, star/favorite |
| Profile | Profile | ✅ | Avatar, settings groups, logout |
| Settings | Settings | ✅ | Toggles, dropdowns, about section |
| Style guide | Style Guide | ✅ | Design system reference |
| Login | Login | ✅ | Email/password, social login, password toggle |
| Phone Verification | Phone Verify | ✅ | Country select, OTP auto-advance, generate/verify flow |
| Profile Completion | Profile Completion | ✅ | Avatar upload, segmented gender, form validation |
| Contact Details | Contact Details | ✅ | Verified badges, emergency contact, inline validation |
| Profile Success | Profile Success | ✅ | Confetti animation, secure badge |
| Medical Profile (4 steps) | Medical Profile 1-4 | ✅ | General health, mental health, lifestyle, emergency + success modal |
| Booking Modal | Care page | ✅ | Date picker, time slots, session preference (Video/Audio/Chat) |
| Session Booking | Session Confirm | ✅ | Booking summary, payment breakdown, cancellation policy |
| Payment Modal | Session Confirm | ✅ | Apple Pay, Google Pay, card form, save card |
| Booking Confirmed | Booking Confirmed | ✅ | Confetti, Heali mascot, appointment summary → Home |
| Appointments | Appointments | ✅ | Upcoming/completed tabs, appointment cards |
| Pre-Session Check | Delivery Precheck | ✅ | Video preview, mic/cam toggles, checklist, security notice |
| Video Session | Session | ✅ | Dark UI, PiP self-view, chat overlay, controls, countdown timer |
| Session Feedback | Session Feedback | ✅ | Star rating (emoji), feedback chips, comments |
| Heali AI Chat | All pages | ✅ | Chat modal, typing indicator, keyword-based AI responses |

---

## 4. Key User Flows

### 4.1 User: Registration Flow
1. Splash → Marketing → Soft Onboarding (name + T&C modal)
2. Personalisation (select focus areas, max 3)
3. Home page (verify banner shown)
4. Click Verify → Phone Verify (enter phone, get OTP, verify)
5. Profile Completion (avatar, name, email, DOB, gender, occupation, marital status) — inline validation
6. Contact Details (verified phone/email, emergency contact) — inline validation
7. Profile Success (confetti animation) → Medical Profile (4 steps) OR Go to Home

### 4.2 User: Booking a Session (Full Flow)
1. Home → Care tab → Browse therapist carousel
2. Click "Book an Appointment" → **Booking Modal** (popup)
   - Select date from horizontal scroller
   - Select time slot from 3-column grid
   - Select session preference (Video/Audio/Chat)
3. Click "Confirm Appointment" → Session Confirm page
   - Review booking summary (therapist, session type, date/time)
   - Review payment breakdown (Session Fee ₹1250 + Platform Fee ₹250 = Total ₹1500)
   - Review cancellation policy
4. Click "Proceed to Payment" → **Payment Modal** (popup)
   - Express checkout: Apple Pay or Google Pay
   - Or pay with card (cardholder name, number, expiry, CVV)
   - Save card checkbox
5. Click "Pay & Book" → Booking Confirmed page
   - Confetti celebration animation
   - Heali mascot
   - Appointment summary card
6. Click "Go to Home" → Home page

### 4.3 User: Attending a Session (Full Flow)
1. Home → Care tab → My Appointments → Click appointment card
2. Click "Join Session" OR Home → Appointment card → "Join Session"
3. → Pre-Session Check page (Session Lobby)
   - Video preview with mic/camera toggle buttons
   - Checklist: Private Space, Stable Connection, 100% Secure notice
4. Click "Ready, Join Now" → Video Session page
   - Dark UI with therapist video feed
   - Self-view PiP (picture-in-picture) in top-right
   - Top bar: Therapist name, countdown timer (45:00), red pulsing dot
   - Bottom controls: Mute, Video toggle, Chat toggle, End Call
5. Click Chat toggle → In-session chat panel slides up
   - Real-time messaging with therapist
   - Auto-resizing input, Enter to send
6. Click End Call → Session Feedback page
   - Star rating (emoji 1-5)
   - Feedback chips (Good listener, Helpful advice, etc.)
   - Comments textarea
7. Click "Submit Feedback" or "Skip for now" → Home page

### 4.4 User: Heali AI Chat (Available on All Pages)
1. Click Heali mascot button (center of bottom nav)
2. Chat modal slides up from bottom
3. Initial greeting: "Hi there! I'm Heali. How can I support your wellness journey today?"
4. Type message → Send (Enter key or send button)
5. User message appears as blue bubble (right-aligned)
6. Typing indicator (3-dot bounce) for 1.5-2.5s
7. AI response based on keywords:
   - Booking/appointment → directs to Care tab
   - Sad/stress/anxiety → suggests breathing exercise
   - Greeting → "Hello! How are you feeling today?"
   - Thanks → "You're very welcome!"
   - Default → supportive response
8. Close via X button, click outside, or navigate away

### 4.5 User: Medical Profile Flow
1. Profile Success → "Complete Medical Profile" → Medical Profile Step 1
2. Step 1: Mental Health History (therapy history, diagnosis, trauma, hospitalisation)
3. Step 2: Presenting Concerns (4 textareas — what brings you, how long, impact, expectations)
4. Step 3: Medical & Medication (conditions multi-select, substance use, alcohol, medications)
5. Step 4: Risk & Safety (3 binary questions — self-harm, history, harming others)
6. All questions required → validation on submit
7. Success modal → auto-redirect to session-confirm.html after 2 seconds

### 4.3 User: Booking a Session
1. Opens app → Home page with therapist recommendations
2. Browses therapists via Discover tab
3. Selects a therapist → views profile
4. Clicks "Book Appointment" → selects date/time/type
5. Confirms booking → receives confirmation

---

## 5. Data Models (Key Entities)

### 5.1 User (Patient)
- `id`, `firstName`, `lastName`, `email`, `phone`
- `avatar`, `dateOfBirth`, `gender`
- `status` (active/inactive/pending)
- `assignedTherapistId` (optional)
- `tcAcceptedAt` (for guest users)
- `personalisation[]` (Stress, Anxiety, Sleep, Relationships, Self Esteem, Focus)
- `createdAt`, `lastActiveAt`

### 5.2 Therapist
- `id`, `firstName`, `lastName`, `email`, `phone`
- `avatar`, `bio`, `specializations[]`
- `status` (pending/approved/suspended)
- `verificationStatus` (unverified/verified)
- `rating`, `totalSessions`, `hourlyRate`
- `tier` (Junior Practitioner, Senior Practitioner, Specialist)
- `createdAt`

### 5.3 Session
- `id`, `clientId`, `therapistId`
- `type` (video/audio/chat)
- `status` (upgoing/ongoing/completed/cancelled)
- `scheduledAt`, `duration`, `notes`
- `createdAt`

### 5.4 Transaction
- `id`, `trxId`, `userId`, `therapistId`
- `direction` (inflow/outflow)
- `type` (Session Payment, Weekly Payout, Premium Subscription, Refund)
- `amount`, `status` (Completed/Pending/Failed/Refunded)
- `createdAt`

### 5.5 Promotion
- `id`, `code`, `discountType` (Percentage/Fixed/Shipping)
- `discountValue`, `validUntil`, `usageLimit`
- `usageCount`, `status` (Active/Expired/Draft)
- `createdAt`

---

## 6. Business Rules

### 6.1 Session Booking
- Users can book up to 3 sessions in advance
- Cancellation allowed up to 24 hours before session
- Session types: Video (60min), Audio (45min), Chat (30min)

### 6.2 Therapist Assignment
- Auto-assigned based on availability and specialization
- Manual override by admin
- Data transfer workflow when switching therapists

### 6.3 Status Management (Clients)
- **Active**: Has booked sessions
- **Pending**: Booked before, next session pending
- **New**: No therapist assigned, no session booked
- **Guest**: Only name provided, T&C accepted, personalisation selected
- **Inactive**: No activity for 30+ days
- **Suspended**: Admin-initiated

### 6.4 Payments
- Stripe integration for payment processing
- Therapist payout: 80-90% of session fee (varies by tier)
- Platform fee: 10-20%
- Refund policy: Full refund if cancelled 24h+ before

### 6.5 Promotions
- Code-based discounts (percentage, fixed amount, free shipping)
- Usage limits per promotion
- Validity period with automatic expiry

---

## 7. Notifications & Communications

### 7.1 Notification Types
- Session reminders (24h, 1h before)
- Booking confirmations
- Therapist assignment
- Payment receipts
- Promotional offers (Heali-recommended)

### 7.2 Heali AI Insights
- Contextual recommendations based on data patterns
- Dismissable per-session
- Positioned in header, inline with mascot

---

## 8. Design Constraints

### 8.1 Admin Panel
- Desktop-only (no mobile responsive needed)
- Sidebar: 260px expanded, 88px collapsed
- All pages standalone (no external CSS/JS fetches)

### 8.2 Therapist Portal
- Desktop-only (same patterns as admin)
- Calendar-centric design
- Same sidebar/component patterns

### 8.3 User App
- Mobile-first (max-width: 380px container)
- Bottom navigation bar
- Standalone HTML files per page

---

## 9. API Endpoints (Key)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/admin/login` | Admin authentication |
| POST | `/api/v1/auth/therapist/login` | Therapist authentication |
| POST | `/api/v1/users/onboard` | Soft onboarding (no password) |
| PATCH | `/api/v1/users/:id` | Update user profile |
| GET | `/api/v1/users` | List users (admin) |
| POST | `/api/v1/users/:userId/profile` | Create/update profile |
| POST | `/api/v1/sessions` | Create session booking |
| GET | `/api/v1/sessions` | List sessions |
| PATCH | `/api/v1/sessions/:id/status` | Update session status |
| GET | `/api/v1/therapists` | List therapists |
| POST | `/api/v1/payments/intent` | Create payment intent |

---

## 10. Open Questions & Decisions Needed

| Question | Status | Impact |
|----------|--------|--------|
| Should therapists have their own login or use admin-managed accounts? | Resolved | Separate therapist login |
| How does soft onboarding work without email/password? | Resolved | Guest users with T&C + personalisation |
| What triggers Heali insights? Real-time or pre-computed? | Open | Backend logic |
| Should we support recurring subscriptions or only per-session? | Open | Payments |
| Video calling provider (Twilio, Agora, Daily.co)? | Open | Session implementation |
| How is therapist verification handled? | Partial | Document review workflow designed |

---

## 11. Changelog

| Date | Change |
|------|--------|
| Jun 11 | Initial product document created |
| Jun 11 | Defined 3 user roles and permissions |
| Jun 11 | Mapped all 29 pages across 3 portals |
| Jun 11 | Documented key user flows |
| Jun 11 | Defined core data models |
| Jun 11 | Established business rules for sessions, assignments, payments |
| Jun 11 | Documented Heali AI insight behavior |
| Jun 12 | All 11 admin pages generated and documented |
| Jun 12 | All 11 therapist pages generated and documented |
| Jun 12 | All 7 user pages generated and documented |
| Jun 12 | Updated feature inventory with completion status |
| Jun 12 | Added promotion, transaction, and guest user data models |
| Jun 12 | Updated business rules for client statuses and promotions |
| Jul 15 | User app expanded from 7 to 25 pages with full workflow flows |
| Jul 15 | Added registration flow: phone verify → profile completion → contact details → success |
| Jul 15 | Added medical profile (4-step): general health, mental health, lifestyle, emergency |
| Jul 15 | Added session booking flow: care → session confirm → booking confirmed |
| Jul 15 | Added session delivery: precheck → video session → feedback |
| Jul 15 | Added login page with social login and password toggle |
| Jul 15 | Added T&C modal with accept/reject in soft-onboarding |
| Jul 15 | All navigation links verified and connected across 25 user pages |
| Jul 16 | Rebuilt medical profile pages to match original content exactly |
| Jul 16 | Added form validation with green checkmarks and error messages |
| Jul 16 | Added loading state spinners and confetti celebrations |
| Jul 16 | Standardized stepper and button styles across all pages |
| Jul 17 | Added booking modal popup (date/time/session preference) to care page |
| Jul 17 | Added payment modal popup (Apple Pay, Google Pay, card form) to session-confirm |
| Jul 17 | Rebuilt delivery-precheck with video preview and mic/cam toggles |
| Jul 17 | Rebuilt session page with dark UI, chat overlay, countdown timer |
| Jul 17 | Added Heali AI chat modal to all pages (home, discover, care, profile) |
| Jul 17 | Fixed all button links (Join Session, Book a Session, Submit Feedback) |
| Jul 17 | Updated feature inventory to 28 user features |
| Jul 17 | Documented modal patterns and form validation patterns in DESIGN.md |
| Jul 17 | Updated all user flows with complete step-by-step descriptions |
| Jul 18 | Added therapist registration page (register.html) matching original workflow design |
| Jul 18 | Therapist login footer updated: "Don't have an account? Sign Up" link |
| Jul 18 | Total platform: 50 pages (27 user + 12 therapist + 11 admin) |
| Jul 18 | Updated all design documents with current page counts and feature inventory |
