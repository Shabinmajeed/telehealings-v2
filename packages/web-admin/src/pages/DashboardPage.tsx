import React from 'react';
import { UserPlus, CalendarCheck, Tag } from 'lucide-react';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import SalesCard from '../components/dashboard/SalesCard';
import { KpiData } from '../components/dashboard/KpiCard';
import HealiSaysCard from '../components/dashboard/HealiSaysCard';
import UserInsightsChart from '../components/dashboard/UserInsightsChart';
import BookingsCard from '../components/dashboard/BookingsCard';
import RevenueCard from '../components/dashboard/RevenueCard';
import InsightsList from '../components/dashboard/InsightsList';
import { Insight } from '../components/dashboard/InsightItem';
import QuickActions from '../components/dashboard/QuickActions';
import type { QuickAction } from '../components/dashboard/QuickActions';

// ─── Data ───

const kpiData: KpiData[] = [
  {
    label: 'Total Sales',
    value: '₹ 123 K',
    trend: '+8% from yesterday',
    trendDir: 'up',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="18" y="3" width="4" height="18" />
        <rect x="10" y="8" width="4" height="13" />
        <rect x="2" y="13" width="4" height="8" />
      </svg>
    ),
    iconBg: '#3b82f6',
  },
  {
    label: 'Completed Sessions',
    value: '300',
    trend: '+5% from yesterday',
    trendDir: 'up',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
    iconBg: '#3b82f6',
  },
  {
    label: 'Session Cancellation',
    value: '5',
    trend: '-1,2% from yesterday',
    trendDir: 'up',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    iconBg: '#3b82f6',
  },
  {
    label: 'New Customers',
    value: '8',
    trend: '-0.5% from yesterday',
    trendDir: 'down',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
    iconBg: '#3b82f6',
  },
];

const insights: Insight[] = [
  {
    priority: 'high',
    text: 'Churn Risk: 3 users who signed up in March (see "New Users" dip) haven\'t booked a second session. Action: Trigger "Reengagement Email" with a 10% discount code.',
  },
  {
    priority: 'low',
    text: "Revenue Optimization: Wednesday's revenue peak (₹23k) is tied to the \"Premium Wellness\" package. Action: Feature this package on the homepage for the upcoming weekend.",
  },
  {
    priority: 'medium',
    text: 'Marketing ROI: The "Promotion & Offers" campaign from Monday resulted in an 8% lift in "New Customers." Follow-up: Extend the campaign for another 48 hours to capitalize on the trend.',
  },
];

const healiSaysText = 'Wednesday is your peak revenue day. Launch a "Mid-Week Wellness" flash offer on Tuesday evenings targeting the "Others" user segment (the grey line in your User Insights). Converting just 10% of these visitors into active bookings could increase your weekly revenue by an estimated ₹12,000.';

const quickActions: QuickAction[] = [
  { icon: <UserPlus size={16} />, label: 'Add New Therapist' },
  { icon: <CalendarCheck size={16} />, label: 'Manual Session Override' },
  { icon: <Tag size={16} />, label: 'Flagged Content Review' },
];

// ─── Page ───

const DashboardPage: React.FC = () => {
  return (
    <div style={{ padding: '0 32px 16px', overflowY: 'auto', flex: 1 }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 40,
      }}>
        <DashboardHeader />

        {/* Row 1: Sales KPIs + Heali Says */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 16 }}>
          <SalesCard kpiData={kpiData} />
          <HealiSaysCard text={healiSaysText} />
        </div>

        {/* Row 2: Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
          <UserInsightsChart />
          <BookingsCard />
        </div>

        {/* Row 3: Revenue + Insights */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <RevenueCard />
          <InsightsList insights={insights} />
        </div>
      </div>

      <QuickActions actions={quickActions} />
    </div>
  );
};

export default DashboardPage;
