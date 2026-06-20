import React, { useState, useEffect } from 'react';
import { UserPlus, CalendarCheck, Tag, Users, UserCheck, Calendar, Clock } from 'lucide-react';

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
import { adminApi, DashboardStats } from '@/api/admin-api';

const healiSaysText = 'Wednesday is your peak revenue day. Launch a "Mid-Week Wellness" flash offer on Tuesday evenings targeting the "Others" user segment (the grey line in your User Insights). Converting just 10% of these visitors into active bookings could increase your weekly revenue by an estimated ₹12,000.';

const insights: Insight[] = [
  { priority: 'high', text: 'Churn Risk: 3 users who signed up in March haven\'t booked a second session. Action: Trigger "Reengagement Email" with a 10% discount code.' },
  { priority: 'low', text: 'Revenue Optimization: Wednesday\'s revenue peak is tied to the "Premium Wellness" package. Action: Feature this package on the homepage for the upcoming weekend.' },
  { priority: 'medium', text: 'Marketing ROI: The "Promotion & Offers" campaign from Monday resulted in an 8% lift in "New Customers." Follow-up: Extend the campaign for another 48 hours.' },
];

const quickActions: QuickAction[] = [
  { icon: <UserPlus size={16} />, label: 'Add New Therapist' },
  { icon: <CalendarCheck size={16} />, label: 'Manual Session Override' },
  { icon: <Tag size={16} />, label: 'Flagged Content Review' },
];

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getStats().then(setStats).catch(console.error).finally(() => setLoading(false));
  }, []);

  const kpiData: KpiData[] = [
    { label: 'Total Users', value: loading ? '...' : String(stats?.totalUsers || 0), trend: 'Registered users', trendDir: 'up', icon: <Users size={20} />, iconBg: '#3b82f6' },
    { label: 'Total Therapists', value: loading ? '...' : String(stats?.totalTherapists || 0), trend: 'Verified professionals', trendDir: 'up', icon: <UserCheck size={20} />, iconBg: '#10b981' },
    { label: 'Total Appointments', value: loading ? '...' : String(stats?.totalAppointments || 0), trend: 'All bookings', trendDir: 'up', icon: <Calendar size={20} />, iconBg: '#8b5cf6' },
    { label: 'Pending Approvals', value: loading ? '...' : String(stats?.pendingApprovals || 0), trend: 'Awaiting review', trendDir: stats && stats.pendingApprovals > 0 ? 'up' : 'down', icon: <Clock size={20} />, iconBg: '#f59e0b' },
  ];

  return (
    <div style={{ padding: '0 32px 16px', overflowY: 'auto', flex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 40 }}>
        <DashboardHeader />
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 16 }}>
          <SalesCard kpiData={kpiData} />
          <HealiSaysCard text={healiSaysText} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
          <UserInsightsChart />
          <BookingsCard />
        </div>
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
