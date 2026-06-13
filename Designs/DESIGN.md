# Telehealings — Design Document

> Living document — updated as we progress through the redesign.

---

## 1. Design System

### 1.1 Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--primary` | `#387bd4` | Primary buttons, links, active states, focus rings |
| `--primary-hover` | `#2361b5` | Hover state for primary buttons |
| `--primary-dark` | `#1e5ab8` | Brand title text, active nav items |
| `--surface` | `#ffffff` | Cards, sidebar, table background |
| `--header-gradient` | `linear-gradient(180deg, #e7f2ff 0%, #2366bd 100%)` | User app page headers |
| `--text-main` | `#1a293b` | Body text, headings |
| `--text-muted` | `#64748b` | Secondary text, form labels |
| `--text-soft` | `#94a3b8` | Placeholders, subtle text |
| `--border` | `#e2e8f0` | Card borders, separators, input borders |
| `--border-light` | `#f1f5f9` | Table row borders, subtle dividers |
| `--success` | `#10b981` | Success badges, positive trends |
| `--danger` | `#ef4444` | Danger alerts, negative trends, logout |
| `--warning` | `#f59e0b` | Warning badges, pending states |

### 1.2 Typography

- **Font family**: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
- **Base size**: 16px

| Size | Usage |
|------|-------|
| 9px | Heali insight label |
| 10px | Filter labels, small badges, pagination info |
| 11px | Heali insight text, sub-text, table filter labels, user role |
| 12px | Inline filter inputs, small text, status badges |
| 13px | Table headers, filter tabs, small buttons, form labels, table cells |
| 14px | Body text, nav items, form inputs, modal titles |
| 15px | Nav items, chart titles |
| 16px | Card titles, modal titles |
| 20px | Page headers, tab labels |
| 24px | KPI values |

### 1.3 Spacing & Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | `8px` | Buttons, inputs, small elements |
| `--radius-md` | `12px` | Profile cards, dropdown menus, insight boxes |
| `--radius-lg` | `16px` | Cards, table containers, modals |

### 1.4 Icons

- **Style**: SVG, outlined (stroke-based)
- **Sizes**: 12px (table filter toggles), 14px (button icons), 16px (action buttons), 18px (nav items), 20px (nav items)
- **Color**: Matches text via `currentColor`, or explicit values (`#000`, `#94a3b8`, `#cbd5e1`)
- **Rule**: All icons in same context use the same color

### 1.5 Mascot & Branding

- **Logo**: `logo.png` — sidebar brand (36x36px)
- **Mascot**: `Heali.png` — page headers (32px), inline with insight
- **Login mascot**: `Heali-peak.png` — top-right of login card
- **Mascot position**: Right side of header, inline with insight box

---

## 2. Layout Patterns

### 2.1 Sidebar (Admin & Therapist)

- **Width**: 280px expanded, 88px collapsed
- **Background**: White (`--surface`), right border `1px solid rgba(0,0,0,0.05)`
- **Nav items**: `padding: 10px 16px`, `gap: 14px`, `font-size: 15px`
- **Nav menu gap**: `2px` between items
- **Nav separator**: `margin: 2px 16px` (minimal spacing)
- **Active state**: `#1c52b8` background, white text/icons
- **Search box**: Pill input with icon, `border-radius: 20px`
- **User profile**: 75px avatar (collapsed: 40px), dropdown on focus
- **Collapsed**: text hidden, icons centered, search becomes 40px circle icon
- **Overflow**: `overflow: visible` (profile dropdown), nav menu `overflow-y: auto`
- **Z-index**: 100 (above content for dropdown visibility)

### 2.2 User App (Mobile-First)

- **Max-width**: 380px centered container
- **Bottom navigation**: Fixed, 4-5 tabs, frosted glass backdrop
- **Header**: Sticky with blur backdrop
- **Safe area**: iOS notch support with `env(safe-area-inset-bottom)`

### 2.3 Page Shell

- **Background**: Gradient for all pages with sidebar
- **Page shell**: `padding: 0 32px 16px`, `overflow-y: auto`, `flex: 1`
- **Content wrapper**: `max-width: 100%`, constrained to 1100px when sidebar open

### 2.4 Sticky Zone

- **Position**: `position: sticky; top: 0; z-index: 50`
- **Padding**: `0 32px 6px`
- **Margin**: `0 -32px` (extends full width)
- **Background**: Same gradient as page (seamless)
- **Contains**: Page header, filter tabs, toolbar with search + actions

### 2.5 Page Header

- **Layout**: Flex row, `justify-content: space-between`, `align-items: center`
- **Left**: Page title only (20px, 700 weight)
- **Title underline**: `2px solid var(--border)` with `::after` 3px dark accent line
- **Right**: Heali insight box + Heali mascot (all inline)
- **Padding-top**: 12px (inside sticky zone)
- **Margin-bottom**: 16px (gap to content below)

### 2.6 Filter Row / Toolbar

- **Layout**: Flex row, `justify-content: space-between`
- **Left**: Pill tabs with counts + search bar
- **Right**: Action buttons (Export CSV, Add/New)
- **Margin-bottom**: 8-12px

### 2.7 Tables

- **Min width**: 900px (horizontal scroll)
- **Header**: `position: sticky; top: 0; z-index: 10`, `background: --surface`
- **Cell padding**: `10px 12px` (compact), first/last child: 0
- **Row hover**: `#f8fafc` background
- **Inline filters**: Chevron arrow → click → input/select in-place
- **Avatar fallback**: Initials in colored circle if image fails

### 2.8 Buttons

| Class | Padding | Font | Radius | Usage |
|-------|---------|------|--------|-------|
| `.btn-sm` | 7px 14px | 13px | 8px | Header actions, filter row |
| `.btn-outline` | border: `--border` | `--text-soft` | — | Secondary actions |
| `.btn-primary` | 16px 24px | 15px/600 | 25px | Primary actions — fixed height avoided, padding controls size |
| `.btn-secondary` | 16px 24px | 17px/600 | 30px | Secondary/gray actions |
| `.btn-success` | bg: `#16a34a` | white | — | Success/approve actions |

**Rule**: Always use `padding` for button sizing, never `height`. This ensures text has proper breathing room and doesn't touch edges.

---

## 3. Component Patterns

### 3.1 Status Badges

- **Booked/Completed**: Green (`#dcfce7` bg, `#166534` text, `#bbf7d0` border, green dot)
- **Pending/In Review**: Amber (`#fef9c3` bg, `#854d0e` text, `#fde68a` border, amber dot)
- **Active**: Green dot + text
- **Inactive**: Grey dot + text
- **Open**: Red (`#fee2e2` bg, `#991b1b` text)
- **Resolved**: Green
- **Expired**: Red
- **Missing**: Grey
- **Published**: Green
- **Draft**: Amber
- **Archived**: Grey
- **Padding**: 3px 10px, `border-radius: 99px`, `font-size: 12px`

### 3.2 Heali Insight Box

- **Position**: Right side of header, inline with mascot
- **Layout**: `[24px icon circle] [9px label + 11px text] [12px dismiss X] [32px mascot]`
- **Background**: `#eff6ff` → `#dbeafe` gradient, `#bfdbfe` border
- **Icon**: 24px circle, lightbulb SVG, blue bg
- **Label**: 9px, uppercase, blue, bold
- **Text**: 11px, `#1e40af`, single line, non-wrapping
- **Dismiss**: 12px X button
- **Flex-shrink: 0`**: Prevents compression

### 3.3 Modals

- **Overlay**: `rgba(15,23,42,0.4)` + `backdrop-filter: blur(4px)`, `z-index: 2000`
- **Card**: 500-600px max-width, 16px radius, scale animation
- **Header**: 18-20px 22px, `#f8fafc` bg, 15-16px bold title
- **Body**: 22px padding, 14-16px gap between form groups
- **Footer**: 14-16px 22px, right-aligned buttons, `#fafafa` bg

### 3.4 Inline Table Filters

- **Default**: Column label + chevron arrow (`color: #cbd5e1`, `margin-left: 2px`)
- **Click arrow**: Label hides, input/select appears in-place
- **Position**: Absolute, `top: 100%`, contained within `th` (`position: relative`)
- **Active**: Blue border + glow, close (X) button clears filter
- **Behavior**: One at a time, auto-focus on open

### 3.5 Quick Actions Widget

- **Position**: Fixed bottom-right, below content
- **Trigger button**: 56px circle, blue gradient, `+` icon
- **Menu**: Opens upward on hover/click with 3-4 action items
- **Items**: Icon + label, hover highlight

### 3.6 Pagination

- **Info text**: 12px, 700 weight, uppercase, `#94a3b8`
- **Page buttons**: 32x32px, 8px radius, `#f1f5f9` bg
- **Active**: Blue bg, white text
- **Prev/Next**: Chevron icons

### 3.7 Stepper / Progress Indicator

- **Style**: Pill-shaped bars, centered
- **Size**: 4px height, max 60px width, 2px border radius
- **Gap**: 6px between steps
- **Inactive**: `rgba(255,255,255,0.3)` on blue headers, `#e2e8f0` on white backgrounds
- **Active**: `#ffffff` on blue headers, `#387bd4` on white backgrounds
- **Margin top**: 12px below header content
- **Usage**: Multi-step forms (profile completion, medical profile, registration flow)

### 3.8 Toggle Switches

- **Track**: 44x24px, `#e2e8f0` (off) / `#2a73d4` (on)
- **Knob**: 20x20px white circle, `box-shadow`
- **Transition**: 0.2s ease
- **Used in**: Settings, notification preferences, availability

---

## 4. Responsive Behavior

### 4.1 Admin Panel
- Desktop-only (no mobile responsive)
- Minimum viewport: 1194px

### 4.2 Therapist Panel
- Desktop-only (same as admin)

### 4.3 User App
- Mobile-first, max-width: 380px
- iOS safe-area-inset support
- Bottom nav fixed positioning
- Sticky headers with blur backdrop

### 4.4 Table Responsive
- Horizontal scroll below 900px
- Contact column hidden below 1200px
- Sticky header always visible

---

## 5. Asset Reference

| File | Path | Usage |
|------|------|-------|
| `logo.png` | `assets/` | Sidebar brand, login page |
| `Heali.png` | `assets/` | Page headers, inline insight |
| `Heali-peak.png` | `assets/` | Login page mascot |
| `user-profile.jpg` | `assets/` | Admin/therapist profile avatar |

**Reference from subfolders**: `../assets/filename.png`

---

## 6. Page Inventory

### Admin Panel (11 pages) — ✅ Complete

| # | File | Status | Key Components |
|---|------|--------|----------------|
| 1 | `index.html` | ✅ | Login form, gradient bg, mascot |
| 2 | `dashboard.html` | ✅ | KPI cards, charts, quick actions, Heali insight |
| 3 | `clients.html` | ✅ | Table, inline filters, guest user support, Heali insight bar |
| 4 | `therapist.html` | ✅ | Table, inline filters, add/update modals |
| 5 | `schedule.html` | ✅ | List/calendar views, dynamic filtering, today highlight |
| 6 | `financials.html` | ✅ | Transactions table, rates & tiers, payout/report modals |
| 7 | `communications.html` | ✅ | Chat UI, tickets table, split-pane layout |
| 8 | `compliance.html` | ✅ | Multi-tab, document review modal, status badges |
| 9 | `content-management.html` | ✅ | Articles/resources, card + table views |
| 10 | `analytics.html` | ✅ | KPI grid, chart placeholders |
| 11 | `Promotion.html` | ✅ | Promo codes table, active/expired tabs, new promo modal |

### Therapist Panel (12 pages) — ✅ Complete

| # | File | Status | Key Components |
|---|------|--------|----------------|
| 1 | `therapist/index.html` | ✅ | Login, therapist branding, gradient bg, mascot |
| 2 | `therapist/register.html` | ✅ | 3-step registration, terms modal, success modal, gradient bg, mascot |
| 3 | `therapist/dashboard.html` | ✅ | KPI cards, upcoming sessions, messages |
| 4 | `therapist/sessions.html` | ✅ | Upcoming/completed tabs, session table |
| 5 | `therapist/clients.html` | ✅ | Client list, search, export |
| 6 | `therapist/calendar.html` | ✅ | Weekly calendar, session blocks |
| 7 | `therapist/messages.html` | ✅ | Chat UI, conversation list |
| 8 | `therapist/resources.html` | ✅ | Resource cards, shared resources table |
| 9 | `therapist/earnings.html` | ✅ | KPI cards, transactions, chart |
| 10 | `therapist/profile.html` | ✅ | Personal/professional info, settings |
| 11 | `therapist/settings.html` | ✅ | Availability, session prefs, notifications |
| 12 | `therapist/tools.html` | ✅ | Clinical assessment tools grid |

### User App (27 pages) — ✅ Complete

| # | File | Status | Key Components |
|---|------|--------|----------------|
| 1 | `user/index.html` | ✅ | Splash/landing, gradient bg, Heali mascot, auto-advance timer |
| 2 | `user/marketing.html` | ✅ | Features, stats, CTA button |
| 3 | `user/soft-onboarding.html` | ✅ | Name entry, T&C modal with accept/reject, age confirmation |
| 4 | `user/personalisation.html` | ✅ | Focus area selection (6 mood cards, max 3) |
| 5 | `user/home.html` | ✅ | Greeting, mood card, appointment, recommendations, verify banner, dynamic data |
| 6 | `user/discover.html` | ✅ | Search, category tabs, featured card, trending tags, new arrivals |
| 7 | `user/care.html` | ✅ | Therapist carousel, explore more card, booking modal popup, star/favorite |
| 8 | `user/therapist-list.html` | ✅ | Full directory, search, filters (specialty, language, gender, availability) |
| 9 | `user/profile.html` | ✅ | Avatar, personal details, settings groups, logout, dynamic data |
| 10 | `user/settings.html` | ✅ | Granular notification toggles, data export, account deletion |
| 11 | `user/style-guide.html` | ✅ | Design system reference |
| 12 | `user/login.html` | ✅ | Passwordless OTP login, social login buttons |
| 13 | `user/phone-verify.html` | ✅ | Universal OTP page (email + phone toggle), country select, resend countdown |
| 14 | `user/profile-completion.html` | ✅ | Avatar upload, segmented gender control, age gate (18+), form validation |
| 15 | `user/contact-details.html` | ✅ | Verified badges, emergency contact, info banner, dynamic data |
| 16 | `user/profile-success.html` | ✅ | Success animation, secure badge, CTA buttons |
| 17 | `user/medical-profile-1.html` | ✅ | Mental health history (therapy, diagnosis, trauma, hospitalisation) |
| 18 | `user/medical-profile-2.html` | ✅ | Presenting concerns (4 textareas) |
| 19 | `user/medical-profile-3.html` | ✅ | Medical conditions, medications, substance use |
| 20 | `user/medical-profile-4.html` | ✅ | Risk & safety (3 binary questions), crisis resources modal |
| 21 | `user/session-confirm.html` | ✅ | Booking summary, payment breakdown, cancellation policy |
| 22 | `user/booking-confirmed.html` | ✅ | Confirmation, appointment summary, Heali mascot, dynamic data |
| 23 | `user/appointments.html` | ✅ | Upcoming/completed tabs, cancel modal with reason picker, reschedule flow |
| 24 | `user/delivery-precheck.html` | ✅ | Pre-session checklist, video preview, mic/cam toggles, session type awareness |
| 25 | `user/session.html` | ✅ | Video session UI, controls, timer, chat overlay, session type toggle |
| 26 | `user/session-feedback.html` | ✅ | Star rating, would recommend, feedback chips, comments, data persistence |
| 27 | `user/messages.html` | ✅ | User-therapist chat, conversation list, message persistence |

---

## 7. Changelog

| Date | Change |
|------|--------|
| Jun 11 | Design system defined — colors, typography, spacing |
| Jun 11 | Login page — gradient bg, compact card, mascot |
| Jun 11 | Dashboard — sidebar, KPI cards, charts, quick actions |
| Jun 11 | Clients page — table, inline filters, guest user support, Heali insight bar |
| Jun 11 | Heali insight bar — inline with pills, compact sizing |
| Jun 11 | Guest user support — personalisation tags, T&C dates |
| Jun 11 | Filter tabs + Actions row — combined in one toolbar |
| Jun 11 | Schedule page — list/calendar views, dynamic filtering |
| Jun 11 | Financials page — transactions, rates & tiers, modals |
| Jun 12 | Communications page — chat UI, tickets, split-pane |
| Jun 12 | Compliance page — multi-tab, document review modal |
| Jun 12 | Content management — articles/resources, card + table |
| Jun 12 | Analytics page — KPI grid, chart placeholders |
| Jun 12 | Promotion page — promo codes, active/expired tabs |
| Jun 12 | All 11 therapist pages generated |
| Jun 12 | All 7 user pages generated |
| Jun 12 | Split into DESIGN.md and PRODUCT.md |
| Jun 12 | Sidebar width standardized to 280px across all admin pages |
| Jun 12 | Nav spacing reduced: padding 12px→10px, gap 4px→2px, separator 8px→2px |
| Jul 15 | User app expanded: 25 total pages with full workflow flows |
| Jul 15 | Added login, phone verification, profile completion flows |
| Jul 15 | Added medical profile (4 steps), session booking, session delivery flows |
| Jul 15 | Added T&C modal with accept/reject in soft-onboarding |
| Jul 15 | Added booking summary with payment breakdown |
| Jul 15 | Added video session UI with controls and timer |
| Jul 15 | Added post-session feedback with star rating |
| Jul 15 | Added pull-to-refresh, skeleton loaders, search clear button |
| Jul 15 | Added carousel pagination dots on care page |
| Jul 15 | Added swipe hint on therapist carousel |
| Jul 15 | Updated bottom nav: glass-style with center Heali button |
| Jul 15 | Header gradient standardized: #e7f2ff → #2366bd |
| Jul 15 | All navigation links verified and connected |
| Jul 16 | Rebuilt medical profile pages to match original content exactly |
| Jul 16 | Added form validation with green checkmarks on profile completion |
| Jul 16 | Added loading state spinner on Save & Next buttons |
| Jul 16 | Added confetti celebration animation on profile success |
| Jul 16 | Standardized stepper style: 4px pills, centered, max 60px width |
| Jul 16 | Fixed button sizing: padding-based instead of fixed height |
| Jul 16 | Updated DESIGN.md with new stepper, button, and color standards |
| Jul 17 | Added booking modal popup to care page (date/time/session preference) |
| Jul 17 | Added payment modal to session-confirm (Apple Pay, Google Pay, card form) |
| Jul 17 | Rebuilt delivery-precheck page with video preview and mic/cam toggles |
| Jul 17 | Fixed session-feedback button paths and padding |
| Jul 17 | Fixed home page "Join Session" and "Book a Session" button links |
| Jul 17 | Added Heali AI chat modal to all pages (home, discover, care, profile) |
|| Jul 17 | Fixed Heali mascot button onclick handler across all pages |
| Jul 17 | Updated user app page inventory to 28 pages |
| Jul 18 | Added therapist registration page (register.html) matching original design |
| Jul 18 | Updated therapist login footer: "Don't have an account? Sign Up" link |
| Jul 18 | Registration page: gradient bg, mascot, terms modal, success modal — all matching login design |
| Jul 18 | Updated all design documents (DESIGN.md, DESIGN-PRODUCT.md) with current page counts |
| Jul 18 | User app: 27 pages total, Therapist: 12 pages, Admin: 11 pages |

---

## 8. Modal Patterns

### 8.1 Booking Modal
- **Trigger**: "Book an Appointment" button on care page carousel cards
- **Style**: Bottom sheet sliding up, grayish-blue (`#8291a4`) background
- **Content**: Session details card, date scroller, time slot grid (3-col), session preference (Video/Audio/Chat)
- **Actions**: Close (back), "Confirm Appointment" → session-confirm.html

### 8.2 Payment Modal
- **Trigger**: "Proceed to Payment" button on session-confirm page
- **Style**: Bottom sheet sliding up, white background
- **Content**: Express checkout (Apple Pay, Google Pay), card form (name, number, expiry, CVV), save card checkbox
- **Actions**: Close (back), "Pay & Book" → booking-confirmed.html

### 8.3 Heali Chat Modal
- **Trigger**: Heali mascot button (`.nav-center-btn`) in bottom nav
- **Style**: Bottom sheet sliding up, white background, 75vh height, chat bubble tail pointing to mascot
- **Content**: Header (avatar, "Heali AI", online status, close), message area, input with auto-resize
- **AI Responses**: Keyword-based (booking, stress/anxiety, greetings, thanks)
- **Typing Indicator**: 3-dot bounce animation, 1.5-2.5s delay
- **Close**: Click outside, X button, or back navigation

### 8.4 Success Modal
- **Trigger**: Last step of medical profile (Risk & Safety)
- **Style**: Centered modal with green checkmark icon
- **Content**: "Profile Saved!" message
- **Auto-redirect**: 2 seconds → session-confirm.html

---

## 9. Form Validation Patterns

### 9.1 Inline Field Validation
- **Green checkmark**: Appears when field passes validation
- **Red border**: Shows on invalid fields after submit attempt
- **Error message**: Red text below field, shown/hidden via `.show` class
- **Shake animation**: Invalid fields shake on failed submit

### 9.2 Required Field Indicators
- **Red asterisk (`*`)**: Next to required field labels
- **Color change**: Asterisk turns green when field is filled (medical profile)

### 9.3 Positive Reinforcement
- **Checkmark indicators**: Appear in textareas when 10+ characters typed (medical profile presenting concerns)
- **Green border**: Fields get green border when valid

### 9.4 Button States
- **Loading state**: Spinner replaces button text, button disabled
- **Disabled state**: Gray background (`#cbd5e1`), no shadow
- **Active state**: Scale down on press (0.97)
