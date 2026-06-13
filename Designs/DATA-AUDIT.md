# Telehealings — Complete Data Audit & Product Specification

**Purpose:** Feed this document to an AI development agent. It contains every data field, its source, purpose, destination, and current issues across all three portals (User, Therapist, Admin). All decisions are confirmed by the product owner.

**Status:** Design prototypes (standalone HTML/CSS/JS) → Being updated to reflect confirmed product decisions. No backend exists yet.

---

## 1. GLOBAL DESIGN SYSTEM

**Brand Colors:**
- Primary: `#387bd5` (buttons, links, active states)
- Primary dark: `#1e5ab8` (gradient end, headings)
- Header gradient: `#e7f2ff → #2366bd` (all page headers)
- Success: `#10b981` (verified badges, valid fields)
- Danger: `#ef4444` (errors, logout, notifications)
- Background: `#f0f2f5` (page background), `#fbfcfd` (card background)

**Component Standards:**
- Stepper: 4px height pills, max 60px width per step
- Radio circles: 22px diameter, 2px border, 12px inner dot when selected
- Buttons: use padding (never fixed height), gradient for primary
- Forms: 20px padding horizontal, 24px vertical gap between groups, 40px bottom padding
- Verified badge: green checkmark on valid fields
- Validation: green checkmark = valid, red border = invalid, shake animation on error submit
- Notification badges: positioned via `transform: translate(30%, -30%)` on avatar top-right

**Navigation:**
- User portal: Bottom floating nav (Home, Care, Discover, More) + center Heali mascot button
- Therapist portal: Left sidebar (270px expanded, 88px collapsed), 10 nav items with separators
- Admin portal: Left sidebar (280px expanded, 88px collapsed)

---

## 2. CONFIRMED PRODUCT DECISIONS

| # | Topic | Decision |
|---|-------|----------|
| 1 | Age gate | 18+ only. DOB validation in profile-completion. T&C updated with age confirmation. |
| 2 | Authentication | Passwordless. Phone or Email → OTP. Social (Google/Apple) for existing users. No passwords anywhere. |
| 3 | Therapist discovery | Carousel (3 cards + "Explore More" 4th card) → Therapist list page with filters (specialty, language, gender, availability) |
| 4 | Session types | Video + Audio only (chat removed). Same price for both. Same room, camera toggle for Audio. Mid-session toggle allowed. |
| 5 | Recurring bookings | Single appointment only for now. |
| 6 | Therapist client list | After booking, user appears in therapist's client list with profile access (focus areas, medical summary, risk flags) |
| 7 | Cancellation policy | >24hr before: 100% refund. 24hr-3hr: 50% fee. <3hr: no refund. Optional cancellation reason. |
| 8 | Reschedule | Available >24hr before only. Opens booking modal pre-filled. Old appointment → status `rescheduled`. |
| 9 | Payment gateway | Stripe. Card + Apple Pay + Google Pay. Charge at booking time. Refund through Stripe based on cancellation policy. |
| 10 | Therapist profile | Name, photo, credentials, bio, specializations, languages, session fee, availability schedule |
| 11 | Therapist availability | Weekly schedule (working days + hours). 50min session + 10min buffer = hourly slots. Blocked dates for leave. |
| 12 | Messaging | After booking, unlimited messages, async, TLS encrypted. Both user and therapist can initiate. |
| 13 | Content library | Admin + therapists can create. Types: Articles, Audio, Video, Exercises. Metadata: title, description, type, duration, tags, related focus areas, thumbnail, difficulty (exercises). User actions: view, bookmark, mark complete, track progress, rate/review. |
| 14 | Reviews | One-time only (no edit), no therapist response. Public: average rating + total count on therapist card. Private (therapist + admin): rating, would recommend, positive aspects, comments. |
| 15 | Heali AI | Rule-based for MVP. Uses focus areas + mood history + session data. Heali chat: keyword-matching against predefined responses. Heali insights: personalized suggestions based on user data. Data pipeline built for future LLM swap. |
| 16 | Notifications | In-app (session reminders, booking confirmations, messages). Email (booking confirmations, receipts, cancellations). Push (session reminders 1hr before). SMS (OTP only). Granular toggles in settings. |

---

## 3. USER PORTAL — PAGE INVENTORY

| # | File | Purpose | Flow Position | Status |
|---|------|---------|---------------|--------|
| 1 | `user/index.html` | Splash screen | Entry point | Keep as-is |
| 2 | `user/marketing.html` | Value proposition | Splash → Onboarding | Keep as-is |
| 3 | `user/soft-onboarding.html` | Name + consent | Marketing → Personalisation | **UPDATE** — consent text, login link |
| 4 | `user/personalisation.html` | Focus area selection | Soft Onboarding → Home | **UPDATE** — persist to DB |
| 5 | `user/home.html` | Main dashboard | Personalisation / Login | **UPDATE** — dynamic data |
| 6 | `user/login.html` | Login | Entry for existing users | **REDESIGN** — passwordless OTP |
| 7 | `user/phone-verify.html` | OTP verification | Universal (new + existing) | **REDESIGN** — universal OTP page |
| 8 | `user/profile-completion.html` | Full profile form | Phone Verify → Contacts | **UPDATE** — age gate, store data |
| 9 | `user/contact-details.html` | Address + emergency contact | Profile → Success | **UPDATE** — store data |
| 10 | `user/profile-success.html` | Confirmation | Contacts → Medical/Home | **UPDATE** — fix path bug |
| 11 | `user/medical-profile-1.html` | Medical history | Profile Success → Med 2 | **UPDATE** — store data |
| 12 | `user/medical-profile-2.html` | Presenting concerns | Med 1 → Med 3 | **UPDATE** — store data |
| 13 | `user/medical-profile-3.html` | Medical conditions + medication | Med 2 → Med 4 | **UPDATE** — add medications field, store data |
| 14 | `user/medical-profile-4.html` | Risk & safety | Med 3 → Home | **UPDATE** — severity + alert logic, store data |
| 15 | `user/care.html` | Therapist discovery + booking | Home nav | **UPDATE** — 4th card, therapist ID in booking |
| 16 | `user/therapist-list.html` | Therapist directory with filters | Care → Booking | **NEW PAGE** |
| 17 | `user/session-confirm.html` | Booking summary + payment | Care → Confirmed | **UPDATE** — dynamic therapist, Stripe |
| 18 | `user/booking-confirmed.html` | Confirmation | Session Confirm → Home | **UPDATE** — dynamic data |
| 19 | `user/delivery-precheck.html` | Pre-session check | Home (Join) → Session | **UPDATE** — session type awareness |
| 20 | `user/session.html` | Video/Audio session room | Precheck → Feedback | **UPDATE** — session type toggle |
| 21 | `user/session-feedback.html` | Post-session review | Session → Home | **UPDATE** — store to DB |
| 22 | `user/appointments.html` | Appointment list | Care tab | **UPDATE** — dynamic data, cancel/reschedule flows |
| 23 | `user/discover.html` | Content library | Home nav | **UPDATE** — dynamic content from DB |
| 24 | `user/profile.html` | User profile display | Home nav | **UPDATE** — dynamic data from DB |
| 25 | `user/settings.html` | App settings | Profile | **UPDATE** — granular notification toggles |
| 26 | `user/messages.html` | User ↔ Therapist chat | Home nav | **NEW PAGE** |
| 27 | `user/style-guide.html` | Design system reference | Dev only | Keep as-is |

---

## 4. USER PORTAL — COMPLETE DATA FIELD INVENTORY (UPDATED)

### 4.1 Soft Onboarding (`soft-onboarding.html`) — UPDATED

| Field | Type | Required | Validation | Storage | Consumed By |
|-------|------|----------|------------|---------|-------------|
| `userName` | text | Yes | non-empty trim | `users.display_name` | home, profile, care, messages |
| Terms consent | checkbox | Yes | must accept via modal | `users.terms_accepted_at` (timestamp) | Gates continue button |

**Design changes:**
- Consent text updated to: *"I confirm that I am 18 years or older and agree to the Terms and Privacy Policy"*
- T&C modal body, section 1: Add age confirmation clause
- "Existing User? Login" link → point to `login.html` (currently `href="#"`)
- Consent timestamp stored in database (audit trail)

### 4.2 Personalisation (`personalisation.html`) — UPDATED

| Field | Type | Required | Validation | Storage | Consumed By |
|-------|------|----------|------------|---------|-------------|
| Focus areas | multi-select (max 3) | Yes (min 1) | 1-3 cards | `user_focus_areas` table | home (greeting), therapist matching, content recommendations, Heali insights |

**Options:** stress, anxiety, sleep, relationships, self-esteem, focus

**Design changes:**
- Selections persisted to database (not localStorage)
- On page load, re-read from database to preserve selections on back+return
- Greeting text on home page dynamically reflects selected focus areas

### 4.3 Login (`login.html`) — REDESIGNED

**Passwordless authentication. No password field.**

| Field | Type | Required | Validation | Storage | Consumed By |
|-------|------|----------|------------|---------|-------------|
| Email or Phone | text | Yes | valid email or phone format | Used to look up user | Auth flow |
| OTP Code | 6-digit | Yes | match sent code | Verified against `otp_codes` table | Auth flow |

**Design changes:**
- Remove password field entirely
- Remove "Forgot Password" link
- Single input: "Email or Phone Number"
- "Send Login Code" button
- OTP input appears after code sent (6 boxes, auto-focus, auto-advance)
- "Or continue with" → Google / Apple social login buttons
- On successful OTP: check if user exists → home.html, or new user → profile-completion.html
- Session token (JWT) issued on successful auth

### 4.4 Phone Verify (`phone-verify.html`) — REDESIGNATED AS UNIVERSAL OTP PAGE

**This page is now the universal OTP verification page for both new and existing users.**

| Field | Type | Required | Validation | Storage | Consumed By |
|-------|------|----------|------------|---------|-------------|
| Country code | select | Yes | — | Prefilled from registration | Phone formatting |
| Phone number | tel | Yes | Format mask | `users.phone` | Auth, notifications |
| OTP (6 digits) | 6×text | Yes | match sent code | Verified against `otp_codes` table | Auth flow |

**Flow:**
- New user: enters phone → OTP → profile-completion.html
- Existing user: enters phone → OTP → home.html
- OTP expires in 10 minutes
- Resend code available after 30 seconds

### 4.5 Profile Completion (`profile-completion.html`) — UPDATED

| Field | Type | Required | Validation | Storage | Consumed By |
|-------|------|----------|------------|---------|-------------|
| Avatar | file | No | image file, max 5MB | `users.avatar_url` (CDN URL) | home, profile, messages, therapist view |
| Full Name | text | Yes | min 2 chars | `users.full_name` | profile, appointments, messages |
| Email Address | email | Yes | valid email, unique | `users.email` | auth, notifications, profile |
| Date of Birth | date | Yes | must be 18+ | `users.date_of_birth` | age gate, compliance |
| Gender | segmented | Yes | — | `users.gender` | profile, therapist matching |
| Occupation | select | Yes | — | `users.occupation` | profile, medical context |
| Marital Status | select | Yes | — | `users.marital_status` | profile, medical context |

**Design changes:**
- **Age gate:** On DOB selection, calculate age. If < 18: show error "You must be 18 or older to create an account." Disable submit.
- **Avatar upload:** Make functional — camera button triggers file input, preview selected image
- All fields stored to database on submit (not ephemeral)
- Stepper updated to show correct step count

**Options:**
- Gender: Male, Female, Other
- Occupation: Student, Employed, Unemployed
- Marital Status: Single, Married, Divorced, Widowed

### 4.6 Contact Details (`contact-details.html`) — UPDATED

| Field | Type | Required | Validation | Storage | Consumed By |
|-------|------|----------|------------|---------|-------------|
| Phone Number | readonly display | — | From registration | Display only | — |
| Email Address | readonly display | — | From registration | Display only | — |
| Physical Address | text | Yes | min 3 chars | `users.address` | profile, emergency |
| EC Full Name | text | Yes | min 2 chars | `users.emergency_contact_name` | emergency, medical |
| EC Phone Number | tel | Yes | min 7 chars | `users.emergency_contact_phone` | emergency |
| EC Relationship | select | Yes | — | `users.emergency_contact_relationship` | emergency |

**Design changes:**
- Phone and email pulled from registration data (not hardcoded)
- All fields stored to database

**Options:**
- EC Relationship: Parent, Spouse, Sibling, Friend

### 4.7 Medical Profile — Step 1: History (`medical-profile-1.html`) — UPDATED

| Field | Type | Required | Validation | Storage | Consumed By |
|-------|------|----------|------------|---------|-------------|
| Previous therapy | radio (3 options) | Yes | must select | `medical_profiles.previous_therapy` | therapist view, admin |
| Past diagnosis | textarea | No | free text | `medical_profiles.past_diagnosis` | therapist view, admin |
| Trauma history | textarea | No | free text | `medical_profiles.trauma_history` | therapist view, admin |
| Psychiatric hospitalisation | radio (yes/no) | Yes | must select | `medical_profiles.psychiatric_hospitalisation` | therapist view, admin |
| Hospitalisation reason | textarea | No | conditional | `medical_profiles.hospitalisation_reason` | therapist view, admin |
| Hospitalisation date | date | No | conditional | `medical_profiles.hospitalisation_date` | therapist view, admin |

**Design changes:** All data stored to `medical_profiles` table. Visible to therapist in client profile view.

### 4.8 Medical Profile — Step 2: Presenting Concerns (`medical-profile-2.html`) — UPDATED

| Field | Type | Required | Validation | Storage | Consumed By |
|-------|------|----------|------------|---------|-------------|
| What brings you to therapy | textarea | No | free text | `medical_profiles.presenting_concerns` | therapist view |
| Duration of concerns | textarea | No | free text | `medical_profiles.concern_duration` | therapist view |
| Impact on daily life | textarea | No | free text | `medical_profiles.daily_impact` | therapist view |
| Therapy expectations | textarea | No | free text | `medical_profiles.therapy_expectations` | therapist view |

**Design changes:** All data stored. Visible to therapist.

### 4.9 Medical Profile — Step 3: Medical & Medication (`medical-profile-3.html`) — UPDATED

| Field | Type | Required | Validation | Storage | Consumed By |
|-------|------|----------|------------|---------|-------------|
| Medical conditions | multi-select cards | No | toggle | `medical_profiles.medical_conditions` (JSON) | therapist view, admin |
| Other conditions | text | No | free text | `medical_profiles.other_conditions` | therapist view |
| **Current medications** | text | No | free text | `medical_profiles.current_medications` | **therapist view (critical)** |
| Tobacco use | radio (never/former/current) | No | single select | `medical_profiles.tobacco_use` | therapist view |
| Alcohol consumption | select | No | — | `medical_profiles.alcohol_consumption` | therapist view |
| Other substances | text | No | free text | `medical_profiles.other_substances` | therapist view |

**Design changes:**
- **NEW: Current medications field** — text input with placeholder "List any medications you're currently taking (e.g., Sertraline 50mg, etc.)"
- This is critical healthcare data — therapist MUST see this before session

**Options:**
- Medical conditions: Diabetes, Hypertension, Asthma, Heart Condition
- Tobacco: Never, Former, Current
- Alcohol: None, Socially (1-2/week), Frequently (3+/week), Daily

### 4.10 Medical Profile — Step 4: Risk & Safety (`medical-profile-4.html`) — UPDATED

| Field | Type | Required | Validation | Storage | Consumed By |
|-------|------|----------|------------|---------|-------------|
| Self-harm thoughts | binary (yes/no) | Yes | must select | `medical_profiles.self_harm_thoughts` | therapist view, **admin alert** |
| Self-harm history | binary (yes/no) | Yes | must select | `medical_profiles.self_harm_history` | therapist view, **admin alert** |
| Harm to others thoughts | binary (yes/no) | Yes | must select | `medical_profiles.harm_others_thoughts` | therapist view, **admin alert** |

**Design changes:**
- If ANY answer is "Yes": show crisis resources immediately (crisis hotline numbers, emergency contacts)
- Flag is set on therapist's client view: "⚠️ Risk flags: [self-harm ideation / self-harm history / harm to others]"
- Admin compliance page shows flagged users
- Success modal after completion: "Your medical profile has been saved securely. Your therapist will review it before your first session."

### 4.11 Home Dashboard (`home.html`) — UPDATED

**Dynamic data (no longer hardcoded):**

| Data | Source | Display |
|------|--------|---------|
| User name | `users.display_name` | Greeting: "Good morning, [name]" |
| Focus areas | `user_focus_areas` | Greeting subtitle: "We're here to help you manage your [focus area] today" |
| Upcoming appointment | `appointments` (next scheduled) | Appointment card with therapist, date, time |
| Stats | Calculated from `appointments`, `mood_entries`, `user_content_progress` | Sessions count, progress %, streak |
| Heali insight | Rule-based engine (focus areas + mood trend) | Personalized suggestion |
| Notifications | `notifications` table | Bell icon with unread count |
| Recommended content | Content matching `user_focus_areas` | Dynamic content cards |

**Mood check-in (persisted):**

| Field | Type | Required | Storage | Consumed By |
|-------|------|----------|---------|-------------|
| Mood selection | single-select (5 emoji) | No | `mood_entries.mood` | Heali insights, progress tracking, therapist view |
| Journal entry | textarea (optional) | No | `mood_entries.journal_text` | Heali insights, therapist view |

**Design changes:**
- Mood data saved to `mood_entries` table (not ephemeral)
- Journal text saved
- Verify banner shown only if `users.phone_verified_at` or `users.email_verified_at` is null
- Appointment card pulls from real appointment data
- Stats calculated from real data

### 4.12 Care / Therapist Discovery (`care.html`) — UPDATED

**Carousel cards (dynamic from database):**

| Data | Source |
|------|--------|
| Therapist photo | `therapists.avatar_url` |
| Name | `therapists.full_name` |
| Specialties | `therapists.specializations` |
| Experience | `therapists.experience_years` |
| Rating | Calculated from `therapist_reviews` |
| Next availability | Calculated from `therapist_availability` + existing appointments |

**4th card: "Explore More Therapists"**
- Static card with CTA styling
- Tapping → navigates to `therapist-list.html`

**Booking modal (updated):**

| Field | Type | Required | Source/Options |
|-------|------|----------|----------------|
| Therapist | display (read-only) | — | Passed from selected card: name, photo, specialty |
| Session fee | display (read-only) | — | `therapists.session_fee` |
| Date | single-select | Yes | Next 7 days, filtered by therapist availability |
| Time slot | single-select | Yes | Generated from `therapist_availability` (hourly slots, 50min + 10min buffer), filtered against existing appointments |
| Session type | single-select | Yes | Video (default), Audio |

**Design changes:**
- Remove Chat option from session type
- Therapist name and photo shown at top of modal
- Date picker shows only dates where therapist has availability
- Time slots are dynamic (not hardcoded)
- If no slots for selected date: "Next available: [date]"

### 4.13 Therapist List (`therapist-list.html`) — NEW PAGE

**Filters:**

| Filter | Type | Options |
|--------|------|---------|
| Specialty | multi-select | Stress, Anxiety, Depression, Trauma, Couples, Self-esteem, Sleep, Focus, Grief, Addiction |
| Language | multi-select | English, Hindi, Malayalam, Tamil, Telugu, Kannada, etc. |
| Gender | single-select | Male, Female, No preference |
| Availability | single-select | Available today, This week, Next week |
| Search | text input | Search by therapist name |

**Results display:**
- Cards in grid/list view (same visual style as carousel cards)
- Each card: photo, name, specialties, experience, rating, "Book" button, favorite star
- Tapping "Book" → opens booking modal with therapist ID
- Results update dynamically on filter change

### 4.14 Session Confirm (`session-confirm.html`) — UPDATED

**Dynamic data (no longer hardcoded):**

| Data | Source |
|------|--------|
| Therapist name, photo, specialty | `therapists` table |
| Session type | User's selection (Video/Audio) |
| Date & Time | User's selection |
| Duration | 50 minutes |
| Session fee | `therapists.session_fee` |
| Platform fee | Configurable (e.g., ₹250 or percentage) |
| Total | Session fee + platform fee |

**Payment modal (Stripe integration):**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Card number | Stripe Element | Yes | Stripe validation |
| Expiry date | Stripe Element | Yes | Stripe validation |
| CVC | Stripe Element | Yes | Stripe validation |
| Cardholder name | text | Yes | non-empty |
| Save card checkbox | toggle | No | Stores Stripe payment method token |

**Design changes:**
- Remove Apple Pay / Google Pay buttons (Stripe handles these automatically if enabled)
- Stripe Elements for secure card input (iframe)
- Card number format mask handled by Stripe
- On "Pay & Book": create Stripe payment intent → on success → create appointment record → booking-confirmed.html
- On payment failure: show error, don't create appointment

### 4.15 Booking Confirmed (`booking-confirmed.html`) — UPDATED

**Dynamic data:**

| Data | Source |
|------|--------|
| Therapist name, photo | `therapists` table |
| Session type | `appointments.session_type` |
| Date & time | `appointments.scheduled_at` |
| Duration | 50 minutes |
| Amount paid | `appointments.total_amount` |
| Appointment ID | Auto-generated (e.g., #TH-XXXX) |

**Design changes:**
- Back button → home.html (not hardcoded path)
- "Go to Home" → home.html
- Appointment added to user's appointments list
- Therapist notified of new booking

### 4.16 Session Delivery

**Precheck (`delivery-precheck.html`) — UPDATED:**

| Data | Source | Behavior |
|-------|--------|----------|
| Session type | `appointments.session_type` | If Audio: camera starts OFF, camera toggle disabled/greyed out |
| Therapist name | `therapists.full_name` | Displayed in header |

**Session Room (`session.html`) — UPDATED:**

| Data | Source | Behavior |
|-------|--------|----------|
| Session type | `appointments.session_type` | Video: camera ON default. Audio: camera OFF, toggle disabled |
| Session duration | 50 min | Timer counts down from 50:00 |
| Therapist name | `therapists.full_name` | Displayed in top bar |
| In-session chat | `messages` table | Messages persisted (not ephemeral) |

**Session Feedback (`session-feedback.html`) — UPDATED:**

| Field | Type | Required | Storage | Consumed By |
|-------|------|----------|---------|-------------|
| Overall rating | 1-5 stars (emoji) | Yes | `therapist_reviews.overall_rating` | Therapist card (avg), therapist view, admin |
| Would recommend | yes/no | Yes | `therapist_reviews.would_recommend` | Therapist card (% recommend) |
| What went well | multi-select chips | No | `therapist_reviews.positive_aspects` (JSON) | Therapist view (private) |
| Comments | textarea | No | `therapist_reviews.comments` | Therapist view (private), admin |

**Design changes:**
- One-time only: after submission, don't show again for this appointment
- Cannot edit after submission
- Data stored to `therapist_reviews` table
- Therapist card updates: new average rating, total reviews, % would recommend

**Chip options:** Good listener, Helpful advice, Easy to talk to, Understanding, Professional, Punctual

### 4.17 Appointments (`appointments.html`) — UPDATED

**Dynamic data from `appointments` table:**

| Data | Source |
|------|--------|
| Therapist name, photo | `therapists` table |
| Date, time | `appointments.scheduled_at` |
| Session type | `appointments.session_type` |
| Status | `appointments.status` |
| Appointment ID | `appointments.id` |

**Status values:** `scheduled`, `completed`, `cancelled`, `rescheduled`, `no_show`

**Actions per status:**

| Status | Actions |
|--------|---------|
| Scheduled | Join Session (if within 15 min of start), Reschedule (>24hr only), Cancel |
| Completed | View Feedback (if submitted), Book Again |
| Cancelled | Book Again |
| No Show | Book Again |

**Cancellation flow:**
1. Tap Cancel → show confirmation modal
2. Check time remaining:
   - >24hr: "Full refund. ₹[amount] will be refunded to your original payment method."
   - 24hr-3hr: "50% fee applies. ₹[amount] will be charged. ₹[amount] will be refunded."
   - <3hr: "No refund available. Proceed?"
3. Confirm → update status to `cancelled`, process refund via Stripe
4. Show optional cancellation reason picker
5. Time slot freed for other bookings

**Cancellation reason options:** Schedule conflict, Not feeling well, Found a different therapist, Financial reasons, No longer needed, Other

**Reschedule flow:**
1. Tap Reschedule → check >24hr before
2. If <24hr: "Rescheduling is only available more than 24 hours before your appointment."
3. If eligible: open booking modal pre-filled with same therapist
4. On confirm: old appointment → status `rescheduled`, new appointment created

### 4.18 Messages (`messages.html`) — NEW PAGE (User Side)

**Conversation list:**
- Shows all conversations with therapists (one per therapist user has booked with)
- Each item: therapist photo, therapist name, last message preview, timestamp, unread badge
- Sorted by `conversations.last_message_at` (most recent first)

**Chat view (on tapping a conversation):**
- Header: therapist name, photo, online status
- Messages: bubble style (sent = right/blue, received = left/white)
- Text input at bottom
- Messages loaded from `messages` table, filtered by `conversation_id`
- New messages appear on refresh (async, not real-time for MVP)

### 4.19 Discover (`discover.html`) — UPDATED

**Dynamic content from `content` table:**

| Section | Logic |
|---------|-------|
| Featured content | Admin-curated or highest-rated |
| Recommended for you | Matches user's `focus_areas` |
| Quick tools | Content with type = exercise, related to user's focus areas |
| Trending | Most viewed/bookmarked in last 7 days |
| New arrivals | Recently published, sorted by `created_at` |

**Content card data:**

| Data | Source |
|------|--------|
| Title | `content.title` |
| Type | `content.type` (article/audio/video/exercise) |
| Duration | `content.duration` |
| Thumbnail | `content.thumbnail_url` |
| Rating | Calculated from `user_content_ratings` |
| Progress | `user_content_progress.status` |

**User actions:**
- Bookmark → `user_bookmarks` table
- Mark complete → `user_content_progress` table
- Rate → `user_content_ratings` table (1-5 stars + optional review)

### 4.20 Profile (`profile.html`) — UPDATED

**Dynamic data from database:**

| Data | Source |
|------|--------|
| Name | `users.full_name` |
| Email | `users.email` |
| Phone | `users.phone` |
| Avatar | `users.avatar_url` |
| Date of Birth | `users.date_of_birth` |
| Gender | `users.gender` |
| Member since | `users.created_at` |

**Settings links (now functional):**
- Personal Details → edit profile form
- Medical Profile → view/edit medical profile
- Payment Methods → Stripe saved payment methods
- Notifications → notification preferences
- Security & Privacy → data export, account deletion
- Log out → clear session, redirect to login

### 4.21 Settings (`settings.html`) — UPDATED

| Setting | Type | Default | Storage |
|---------|------|---------|---------|
| Session reminders — 24hr before | toggle | ON | `user_notification_preferences` |
| Session reminders — 1hr before | toggle | ON | `user_notification_preferences` |
| Session reminders — 15min before | toggle | ON | `user_notification_preferences` |
| Booking confirmations | toggle | ON | `user_notification_preferences` |
| Email notifications | toggle | ON | `user_notification_preferences` |
| Push notifications | toggle | ON | `user_notification_preferences` |
| SMS notifications | toggle | OFF | `user_notification_preferences` |
| Language | select | English | `users.language` |
| Timezone | auto-detect | Device timezone | `users.timezone` |
| Data export | button | — | Triggers data download (GDPR) |
| Delete account | button | — | Soft delete with 30-day grace period |

---

## 5. USER PORTAL — DATA FLOW MAP (UPDATED)

### 5.1 Complete User Journey
```
Splash
  → Marketing
    → Soft Onboarding [userName, consent + age confirmation]
      → Personalisation [focusAreas → DB]
        → Home [dynamic: greeting, focus areas, mood check-in]
          ↓
    → Login [email/phone → OTP → session token]
      → Home (existing user)
          ↓
    → Registration [phone/email → OTP → profile → contacts → medical (4 steps)]
      → Home (new user, fully profiled)
```

### 5.2 Booking Flow
```
Care [carousel: 3 therapists + Explore More]
  → Therapist List [filters: specialty, language, gender, availability]
    → Select Therapist → Booking Modal [date from availability, time from slots, video/audio]
      → Session Confirm [therapist details, Stripe payment]
        → Booking Confirmed [summary, appointment ID]
          → Home [appointment appears in dashboard]
          → Therapist notified [new booking]
          → Messaging unlocked [user ↔ therapist]
```

### 5.3 Session Delivery Flow
```
Home [Join Session button — appears 15 min before appointment]
  → Precheck [camera/mic test, session type awareness]
    → Session Room [video/audio, timer, in-session chat]
      → Feedback [rating, would recommend, chips, comments]
        → Home [review appears on therapist card]
        → Therapist notified [new review]
```

### 5.4 Cancellation Flow
```
Appointments [Cancel button]
  → Check time remaining
    → >24hr: Full refund confirmation
    → 24hr-3hr: 50% fee warning
    → <3hr: No refund warning
  → Confirm cancellation
    → Status = cancelled
    → Stripe refund processed
    → Time slot freed
    → Optional: cancellation reason
    → User confirmation
    → Therapist notified
```

---

## 6. THERAPIST PORTAL — DATA INVENTORY

### 6.1 Therapist Profile Data

| Field | Type | Required | Storage | Consumed By |
|-------|------|----------|---------|-------------|
| Full Name | text | Yes | `therapists.full_name` | Discovery, appointments, messages |
| Profile Photo | file | Yes | `therapists.avatar_url` | Discovery, appointments, messages |
| Credentials | text | Yes | `therapists.credentials` | Discovery cards |
| Bio | textarea | Yes | `therapists.bio` | Therapist profile page |
| Specializations | multi-select | Yes | `therapists.specializations` (JSON) | Filters, matching |
| Languages | multi-select | Yes | `therapists.languages` (JSON) | Filters, matching |
| Experience (years) | number | Yes | `therapists.experience_years` | Discovery cards |
| Session Fee | number | Yes | `therapists.session_fee` | Booking, earnings |
| Gender | select | Yes | `therapists.gender` | Filters |
| License Number | text | Yes | `therapists.license_number` | Admin verification |
| License Authority | text | Yes | `therapists.license_authority` | Admin verification |
| Verification Status | enum | — | `therapists.verification_status` | Admin, discovery (only verified shown) |
| Commission Rate | number | — | `therapists.commission_rate` | Payout calculation |

**Verification status values:** `pending`, `verified`, `suspended`

### 6.2 Therapist Registration Flow (`therapist/register.html`)

**Step 1: Account Information**
| Field | Type | Required | Validation | Storage | Consumed By |
|-------|------|----------|------------|---------|-----------|
| First Name | text | Yes | min 2 chars | `therapists.first_name` | Profile, appointments |
| Last Name | text | Yes | min 2 chars | `therapists.last_name` | Profile, appointments |
| Email | email | Yes | valid format, unique | `therapists.email` | Auth, invitations |
| Date of Birth | date | Yes | — | `therapists.date_of_birth` | Compliance |

**Step 2: Professional Information**
| Field | Type | Required | Validation | Storage | Consumed By |
|-------|------|----------|------------|---------|-----------|
| Specialization | select | Yes | — | `therapists.specializations` | Discovery, matching |
| License Number | text | Yes | — | `therapists.license_number` | Admin verification |
| Experience (years) | number | Yes | 0-50 | `therapists.experience_years` | Discovery cards |
| Languages | multi-select | Yes | — | `therapists.languages` | Filters |

**Step 3: Documents & Terms**
| Field | Type | Required | Storage | Consumed By |
|-------|------|----------|---------|-----------|
| Terms Accepted | boolean | Yes | `therapists.tc_accepted_at` | Compliance |
| License Document | file | Yes | `therapists.license_document_url` | Admin verification |

**On Successful Registration:**
- Therapist status = `pending` (awaiting admin approval)
- Email sent to admin for verification
- Success modal → Back to Login

### 6.3 Therapist Availability

| Field | Type | Required | Storage |
|-------|------|----------|---------|
| Day of week | select | Yes | `therapist_availability.day_of_week` (0-6) |
| Start time | time | Yes | `therapist_availability.start_time` |
| End time | time | Yes | `therapist_availability.end_time` |
| Blocked date | date | No | `therapist_blocked_dates.blocked_date` |
| Block reason | text | No | `therapist_blocked_dates.reason` |

**Slot generation logic:**
- Session duration: 50 minutes
- Buffer: 10 minutes
- Total: 60 minutes per slot
- Slots: start_time, start_time + 60min, start_time + 120min, ... until end_time
- Filter out: blocked dates, already booked appointments

### 6.4 Therapist Dashboard Data

| Data | Source | Display |
|------|--------|---------|
| Today's sessions | `appointments` where therapist_id + today | Time, client name, session type, status |
| Upcoming sessions | `appointments` where therapist_id + future | Next 4-5 sessions |
| KPI: Total sessions | Count of completed appointments | Card with trend |
| KPI: Active clients | Count of distinct user_id from appointments | Card with trend |
| KPI: Revenue | Sum of session_fee from completed appointments | Card with trend |
| Unread messages | Count from messages where read_at is null | Badge on messages nav item |
| Client list | Distinct users from appointments | Clients page |
| Heali insights | Rule-based: mood trends, session frequency, no-shows | Dashboard widget |

### 6.5 Therapist Client Profile View

When therapist clicks on a client, show:

| Data | Source |
|------|--------|
| Name, photo, email, phone | `users` table |
| Focus areas | `user_focus_areas` table |
| Medical profile summary | `medical_profiles` table |
| Risk flags | `medical_profiles` (self_harm_thoughts, self_harm_history, harm_others_thoughts) |
| Session history | `appointments` with this therapist |
| Upcoming appointment | Next scheduled appointment |
| Mood trend | Last 7 days from `mood_entries` |
| Messages | Conversation history |

**Risk flag display:** "⚠️ Risk flags: [list of "Yes" responses]" — shown prominently at top of client profile.

### 6.5 Therapist Content Management

Therapists can create and manage their own content:

| Field | Type | Required | Storage |
|-------|------|----------|---------|
| Title | text | Yes | `content.title` |
| Description | textarea | Yes | `content.description` |
| Type | select | Yes | `content.type` (article/audio/video/exercise) |
| Content file | file | Yes | `content.content_url` |
| Duration | number | No | `content.duration` |
| Thumbnail | image | Yes | `content.thumbnail_url` |
| Tags | multi-select | No | `content.tags` (JSON) |
| Related focus areas | multi-select | No | `content.related_focus_areas` (JSON) |
| Difficulty | select | No | `content.difficulty` (for exercises) |
| Status | enum | — | `content.status` (draft/published) |

**Creator tracking:** `content.creator_id` + `content.creator_type` (admin/therapist)

---

## 7. DATABASE ENTITY RELATIONSHIP SUMMARY

### Core Entities

```
users
├── id (UUID, PK)
├── email (unique)
├── phone (unique)
├── full_name
├── display_name
├── avatar_url
├── date_of_birth
├── gender
├── occupation
├── marital_status
├── address
├── emergency_contact_name
├── emergency_contact_phone
├── emergency_contact_relationship
├── email_verified_at
├── phone_verified_at
├── terms_accepted_at
├── language
├── timezone
├── created_at
└── updated_at

user_focus_areas
├── user_id (FK → users.id)
├── focus_area (enum)
└── created_at

medical_profiles
├── user_id (FK → users.id, unique)
├── previous_therapy (enum)
├── past_diagnosis (text)
├── trauma_history (text)
├── psychiatric_hospitalisation (boolean)
├── hospitalisation_reason (text)
├── hospitalisation_date (date)
├── presenting_concerns (text)
├── concern_duration (text)
├── daily_impact (text)
├── therapy_expectations (text)
├── medical_conditions (JSON)
├── other_conditions (text)
├── current_medications (text)
├── tobacco_use (enum)
├── alcohol_consumption (enum)
├── other_substances (text)
├── self_harm_thoughts (boolean)
├── self_harm_history (boolean)
├── harm_others_thoughts (boolean)
├── completed_at
├── created_at
└── updated_at

therapists
├── id (UUID, PK)
├── full_name
├── avatar_url
├── credentials
├── bio
├── specializations (JSON)
├── languages (JSON)
├── experience_years
├── session_fee
├── gender
├── license_number
├── license_authority
├── verification_status (enum)
├── commission_rate
├── is_active
├── created_at
└── updated_at

therapist_availability
├── id (PK)
├── therapist_id (FK → therapists.id)
├── day_of_week (0-6)
├── start_time
└── end_time

therapist_blocked_dates
├── id (PK)
├── therapist_id (FK → therapists.id)
├── blocked_date
└── reason

appointments
├── id (UUID, PK)
├── user_id (FK → users.id)
├── therapist_id (FK → therapists.id)
├── scheduled_at (datetime)
├── duration_minutes (default 50)
├── session_type (enum: video, audio)
├── status (enum: scheduled, completed, cancelled, rescheduled, no_show)
├── session_fee
├── platform_fee
├── total_amount
├── payment_status (enum: pending, paid, refunded, partially_refunded, failed)
├── payment_method (enum: card, apple_pay, google_pay)
├── stripe_payment_method_id
├── stripe_customer_id
├── stripe_payment_intent_id
├── refund_amount
├── refund_transaction_id
├── cancellation_reason (enum)
├── cancelled_at
├── rescheduled_to_appointment_id (FK → appointments.id, nullable)
├── created_at
└── updated_at

session_feedback / therapist_reviews
├── id (UUID, PK)
├── user_id (FK → users.id)
├── therapist_id (FK → therapists.id)
├── appointment_id (FK → appointments.id)
├── overall_rating (integer 1-5)
├── would_recommend (boolean)
├── positive_aspects (JSON)
├── comments (text)
└── created_at

mood_entries
├── id (UUID, PK)
├── user_id (FK → users.id)
├── mood (enum: energized, calm, okay, sad, stressed)
├── journal_text (text)
└── created_at

conversations
├── id (UUID, PK)
├── user_id (FK → users.id)
├── therapist_id (FK → therapists.id)
├── appointment_id (FK → appointments.id)
├── created_at
└── last_message_at

messages
├── id (UUID, PK)
├── conversation_id (FK → conversations.id)
├── sender_id
├── sender_type (enum: user, therapist)
├── body (text)
├── read_at
└── created_at

content
├── id (UUID, PK)
├── title
├── description
├── type (enum: article, audio, video, exercise)
├── content_url
├── duration
├── thumbnail_url
├── tags (JSON)
├── related_focus_areas (JSON)
├── difficulty (enum: beginner, intermediate, advanced)
├── creator_id
├── creator_type (enum: admin, therapist)
├── status (enum: draft, published)
├── is_featured (boolean)
├── created_at
└── updated_at

user_bookmarks
├── user_id (FK → users.id)
├── content_id (FK → content.id)
└── created_at

user_content_progress
├── user_id (FK → users.id)
├── content_id (FK → content.id)
├── status (enum: in_progress, completed)
├── progress_percent
└── completed_at

user_content_ratings
├── user_id (FK → users.id)
├── content_id (FK → content.id)
├── rating (integer 1-5)
├── review (text)
└── created_at

notifications
├── id (UUID, PK)
├── user_id (FK → users.id)
├── type (enum: appointment_reminder, booking_confirmed, session_starting, message_received, system, crisis_alert)
├── title
├── body
├── read_at
└── created_at

user_notification_preferences
├── user_id (FK → users.id)
├── event_type (enum)
├── channel (enum: in_app, email, push, sms)
└── enabled (boolean)

heali_insights
├── id (UUID, PK)
├── user_id (FK → users.id)
├── type (enum: home_insight, therapist_insight)
├── message
├── generated_at
└── is_read

therapist_payouts
├── id (UUID, PK)
├── therapist_id (FK → therapists.id)
├── appointment_id (FK → appointments.id)
├── amount
├── status (enum: pending, paid)
├── stripe_transfer_id
└── paid_at

otp_codes
├── id (PK)
├── target (email or phone)
├── code
├── purpose (enum: login, registration)
├── expires_at
├── verified_at
└── created_at
```

---

## 8. CROSS-PORTAL DATA CONSISTENCY (RESOLVED)

| Issue | Resolution |
|-------|------------|
| No user ID | UUID generated at registration, links all data |
| Onboarding disconnected from registration | Unified flow: soft onboarding → personalisation → home. Registration creates the account. |
| Medical data not stored | All medical data stored in `medical_profiles` table, visible to therapist |
| Therapist data hardcoded | All therapist data from database, managed by admin |
| Appointments not linked | Booking creates appointment record visible to user, therapist, admin |
| Payment not functional | Stripe integration, charge at booking, refund based on policy |
| Notifications hardcoded | Dynamic notification system with granular preferences |
| Content hardcoded | Content management system for admin + therapists |
| Reviews ephemeral | Stored in `therapist_reviews`, public rating + private feedback |
| Messaging non-existent | Async messaging system, unlocked after booking |
| Heali hardcoded | Rule-based system using real user data |

---

## 9. FILES REQUIRING UPDATES (SUMMARY)

### User Portal — Updates Needed

| File | Change Type | Key Changes |
|------|-------------|-------------|
| `soft-onboarding.html` | Update | Consent text, login link → login.html |
| `personalisation.html` | Update | Persist to DB, re-read on load |
| `login.html` | **Redesign** | Passwordless: email/phone → OTP → social login |
| `phone-verify.html` | **Redesign** | Universal OTP page (new + existing user) |
| `profile-completion.html` | Update | Age gate (18+), functional avatar upload, store all data |
| `contact-details.html` | Update | Pull phone/email from registration, store all data |
| `profile-success.html` | Update | Fix "Go to Home" path bug |
| `medical-profile-1.html` | Update | Store data to DB |
| `medical-profile-2.html` | Update | Store data to DB |
| `medical-profile-3.html` | Update | **Add current medications field**, store data |
| `medical-profile-4.html` | Update | Add crisis resources on "Yes", risk flag logic, store data |
| `home.html` | **Major update** | Dynamic data: appointments, stats, Heali insights, mood persistence |
| `care.html` | Update | 4th "Explore More" card, pass therapist ID to booking modal |
| `therapist-list.html` | **New** | Full directory with filters |
| `session-confirm.html` | Update | Dynamic therapist data, Stripe payment element |
| `booking-confirmed.html` | Update | Dynamic appointment data |
| `delivery-precheck.html` | Update | Session type awareness |
| `session.html` | Update | Session type toggle, persist chat messages |
| `session-feedback.html` | Update | Store to DB, one-time submission |
| `appointments.html` | **Major update** | Dynamic data, cancel/reschedule flows |
| `discover.html` | **Major update** | Dynamic content from DB, user actions |
| `profile.html` | Update | Dynamic data from DB, functional settings links |
| `settings.html` | Update | Granular notification toggles, data export, account deletion |
| `messages.html` | **New** | User ↔ Therapist chat interface |

### Therapist Portal — Updates Needed

| File | Change Type | Key Changes |
|------|-------------|-------------|
| `therapist/index.html` | Update | Add "Don't have an account? Sign Up" link to footer |
| `therapist/register.html` | Complete | Therapist registration flow (Account → Professional → Documents), terms modal, success modal |
| `dashboard.html` | **Major update** | Dynamic KPIs, today's sessions, client list, Heali insights |
| `clients.html` | Update | Dynamic client list from appointments |
| `sessions.html` | Update | Dynamic session management |
| `messages.html` | **New** | Therapist ↔ User chat interface |
| `earnings.html` | Update | Dynamic earnings from appointments |
| `content-management.html` | **New** | Therapist content creation/management |
| `profile.html` | Update | Dynamic profile data |
| `settings.html` | Update | Availability management, notification preferences |

### Admin Portal — Updates Needed

| File | Change Type | Key Changes |
|------|-------------|-------------|
| `dashboard.html` | **Major update** | Dynamic analytics, KPIs |
| `therapist.html` | **Major update** | Therapist CRUD, verification workflow |
| `clients.html` | **Major update** | Client management, risk flag visibility |
| `schedule.html` | Update | Dynamic schedule view |
| `communications.html` | Update | Broadcast messaging |
| `compliance.html` | **New** | Risk alerts, audit logs, medical data oversight |
| `content-management.html` | **New** | Content CRUD, approval workflow |
| `analytics.html` | **Major update** | Dynamic analytics dashboards |
| `financials.html` | **Major update** | Revenue, payouts, refunds |
| `Promotion.html` | Update | Promo code management |

---

## 10. PRIORITY IMPLEMENTATION ORDER

### Phase 1: Foundation (P0)
1. Database schema (all tables)
2. Authentication system (OTP via Stripe/SendGrid, social login)
3. User registration flow (unified, stores all data)
4. Medical profile storage + therapist visibility
5. Basic appointment booking (single appointment)
6. Stripe payment integration
7. Cancellation + refund logic

### Phase 2: Core Features (P1)
8. Therapist discovery (carousel + list + filters)
9. Therapist availability management
10. Appointment management (user + therapist views)
11. Messaging system (user ↔ therapist)
12. Session feedback + reviews
13. Notification system
14. Home dashboard (dynamic data)

### Phase 3: Content + Intelligence (P2)
15. Content library (CRUD for admin + therapists)
16. User content interactions (bookmark, progress, ratings)
17. Heali insights (rule-based)
18. Therapist earnings + payouts
19. Admin analytics + compliance
20. Settings (granular notifications, data export, account deletion)

---

### Changelog

| Date | Change |
|------|--------|
| Jul 18 | Added Therapist Registration Flow section (6.2) with 3 steps: Account, Professional, Documents |
| Jul 18 | Added `therapist/register.html` to Files Requiring Updates with complete status |
| Jul 18 | Updated footer on `therapist/index.html`: "Don't have an account? Sign Up" → `register.html` |
| Jul 18 | Registration page created: gradient bg, mascot, custom checkbox, terms modal, success modal |

*Document generated from actual codebase analysis and confirmed product decisions.*
