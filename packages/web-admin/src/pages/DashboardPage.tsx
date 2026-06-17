import React from 'react';
import {
  UserPlus, CalendarCheck, Tag,
  Download, Lightbulb
} from 'lucide-react';

// ─── KPI Data ───
const kpiData = [
  {
    label: 'Total Sales',
    value: '₹ 123 K',
    trend: '+8% from yesterday',
    trendDir: 'up' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/>
      </svg>
    ),
    iconBg: '#3b82f6',
  },
  {
    label: 'Completed Sessions',
    value: '300',
    trend: '+5% from yesterday',
    trendDir: 'up' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/>
      </svg>
    ),
    iconBg: '#3b82f6',
  },
  {
    label: 'Session Cancellation',
    value: '5',
    trend: '-1,2% from yesterday',
    trendDir: 'up' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
    iconBg: '#3b82f6',
  },
  {
    label: 'New Customers',
    value: '8',
    trend: '-0.5% from yesterday',
    trendDir: 'down' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/>
        <line x1="23" y1="11" x2="17" y2="11"/>
      </svg>
    ),
    iconBg: '#3b82f6',
  },
];

const insights = [
  {
    priority: 'high' as const,
    text: 'Churn Risk: 3 users who signed up in March (see "New Users" dip) haven\'t booked a second session. Action: Trigger "Reengagement Email" with a 10% discount code.',
  },
  {
    priority: 'low' as const,
    text: "Revenue Optimization: Wednesday's revenue peak (₹23k) is tied to the \"Premium Wellness\" package. Action: Feature this package on the homepage for the upcoming weekend.",
  },
  {
    priority: 'medium' as const,
    text: 'Marketing ROI: The "Promotion & Offers" campaign from Monday resulted in an 8% lift in "New Customers." Follow-up: Extend the campaign for another 48 hours to capitalize on the trend.',
  },
];

const priorityColors: Record<string, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
};

const DashboardPage: React.FC = () => {

  return (
    <div style={{ padding: '0 32px 16px', overflowY: 'auto', flex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 40 }}>

        {/* ─── Page Header ─── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 20, marginBottom: 12 }}>
          <h1 style={{
            fontSize: 20, fontWeight: 700, color: '#0f172a',
            position: 'relative', padding: '0 0 8px 0',
            borderBottom: '2px solid #e2e8f0', margin: 0,
          }}>
            Dashboard
            <span style={{
              position: 'absolute', bottom: -2, left: 0, right: 0,
              height: 3, background: '#0f172a', borderRadius: '2px 2px 0 0',
            }} />
          </h1>
          <img src="/Heali.png" alt="Heali AI" style={{ height: 48, marginBottom: -1 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>

        {/* ─── Row 1: Sales KPIs + Heali Says ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 16 }}>

          {/* Sales Card */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: 24,
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>This Week's Sales</h2>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Weekly performance overview</p>
              </div>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: 6,
                background: 'transparent', fontSize: 12, fontWeight: 600, color: '#334155',
                cursor: 'pointer',
              }}>
                <Download size={14} />
                Generate Report
              </button>
            </div>

            {/* KPI Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {kpiData.map((kpi, i) => (
                <div key={i} style={{
                  border: '1px solid #e2e8f0', borderRadius: 12, padding: 16,
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: kpi.iconBg, color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{kpi.icon}</span>
                    </div>
                    <div style={{ fontSize: 10, color: '#3b82f6', textAlign: 'right', lineHeight: 1.2 }}>
                      {kpi.trend.split(' ').map((word, wi) => (
                        <React.Fragment key={wi}>{wi > 0 && <br />}{word}{' '}</React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{kpi.value}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <span style={{ fontSize: 12, color: '#475569', width: '60%', lineHeight: 1.2 }}>{kpi.label}</span>
                    <span style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: kpi.trendDir === 'up' ? '#22c55e' : '#ef4444' }}>
                      {kpi.trendDir === 'up' ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Heali Says Panel */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: 24,
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: 12,
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: '#2a73d4', textTransform: 'uppercase', letterSpacing: 0.5,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Lightbulb size={16} />
              Heali says
            </div>
            <p style={{ fontSize: 14, fontStyle: 'italic', color: '#334155', lineHeight: 1.6, margin: 0 }}>
              Wednesday is your peak revenue day. Launch a "Mid-Week Wellness" flash offer on Tuesday evenings targeting the "Others" user segment (the grey line in your User Insights). Converting just 10% of these visitors into active bookings could increase your weekly revenue by an estimated ₹12,000.
            </p>
          </div>
        </div>

        {/* ─── Row 2: Charts ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>

          {/* User Insights Chart */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: 24,
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>User Insights</h3>
            <div style={{ position: 'relative', width: '100%', height: 180, marginBottom: 12, marginLeft: 30 }}>
              {/* Y Axis */}
              <div style={{
                position: 'absolute', left: -30, top: 0, bottom: 0,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                fontSize: 10, color: '#94a3b8',
              }}>
                <span>400</span><span>300</span><span>200</span><span>100</span><span>0</span>
              </div>
              {/* Grid Lines */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0,
              }}>
                {[0,1,2,3,4].map(i => (
                  <div key={i} style={{ width: '100%', height: 1, background: '#f1f5f9' }} />
                ))}
              </div>
              {/* SVG Chart */}
              <svg viewBox="0 0 400 160" preserveAspectRatio="none" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
                <path d="M0 60 C 50 20, 100 20, 150 100 C 200 150, 250 100, 300 60 C 350 20, 400 120, 400 120" fill="none" stroke="#60a5fa" strokeWidth="2"/>
                <path d="M0 120 C 50 90, 100 140, 150 140 C 200 140, 250 20, 300 40 C 350 60, 400 140, 400 140" fill="none" stroke="#2563eb" strokeWidth="2"/>
                <path d="M0 80 C 50 120, 100 160, 150 120 C 200 80, 250 40, 300 80 C 350 120, 400 100, 400 100" fill="none" stroke="#94a3b8" strokeWidth="2"/>
                <line x1="230" y1="25" x2="230" y2="160" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,3"/>
                <circle cx="230" cy="25" r="4" fill="#ef4444"/>
              </svg>
            </div>
            {/* X Axis */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8', marginBottom: 16, paddingLeft: 30 }}>
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
              <span>Jun</span><span>Jul</span><span>Sept</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#475569' }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: '#60a5fa' }} />Registered Users
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#475569' }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: '#2563eb' }} />New Users
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#475569' }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: '#94a3b8' }} />Others
              </div>
            </div>
          </div>

          {/* Number of Bookings Chart */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: 24,
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>Number of Bookings</h3>
            <div style={{ position: 'relative', width: '100%', height: 180, marginBottom: 24 }}>
              <svg viewBox="0 0 300 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(37,99,235,0.2)"/>
                    <stop offset="100%" stopColor="rgba(37,99,235,0)"/>
                  </linearGradient>
                  <linearGradient id="gray-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(148,163,184,0.2)"/>
                    <stop offset="100%" stopColor="rgba(148,163,184,0)"/>
                  </linearGradient>
                </defs>
                <path d="M0 80 L 50 100 L 100 110 L 150 110 L 200 100 L 250 100 L 300 80 L 300 120 L 0 120 Z" fill="url(#gray-grad)"/>
                <path d="M0 80 L 50 100 L 100 110 L 150 110 L 200 100 L 250 100 L 300 80" fill="none" stroke="#94a3b8" strokeWidth="2"/>
                <circle cx="0" cy="80" r="3" fill="#94a3b8"/><circle cx="50" cy="100" r="3" fill="#94a3b8"/>
                <circle cx="100" cy="110" r="3" fill="#94a3b8"/><circle cx="150" cy="110" r="3" fill="#94a3b8"/>
                <circle cx="200" cy="100" r="3" fill="#94a3b8"/><circle cx="250" cy="100" r="3" fill="#94a3b8"/>
                <circle cx="300" cy="80" r="3" fill="#94a3b8"/>
                <path d="M0 20 L 50 40 L 100 30 L 150 60 L 200 25 L 250 80 L 300 10 L 300 120 L 0 120 Z" fill="url(#blue-grad)"/>
                <path d="M0 20 L 50 40 L 100 30 L 150 60 L 200 25 L 250 80 L 300 10" fill="none" stroke="#2563eb" strokeWidth="2"/>
                <circle cx="0" cy="20" r="3" fill="#2563eb"/><circle cx="50" cy="40" r="3" fill="#2563eb"/>
                <circle cx="100" cy="30" r="3" fill="#2563eb"/><circle cx="150" cy="60" r="3" fill="#2563eb"/>
                <circle cx="200" cy="25" r="3" fill="#2563eb"/><circle cx="250" cy="80" r="3" fill="#2563eb"/>
                <circle cx="300" cy="10" r="3" fill="#2563eb"/>
              </svg>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 40, marginTop: 5, paddingLeft: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#94a3b8' }}>
                  <div style={{ width: 16, height: 2, background: '#94a3b8', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: -3, left: 4, width: 8, height: 8, borderRadius: '50%', background: '#94a3b8' }} />
                  </div>
                  Last Month
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>150</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#94a3b8' }}>
                  <div style={{ width: 16, height: 2, background: '#2563eb', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: -3, left: 4, width: 8, height: 8, borderRadius: '50%', background: '#2563eb' }} />
                  </div>
                  This Month
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#2563eb' }}>278</div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Row 3: Revenue Bar Chart + Insights ─── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

          {/* Total Revenue Bar Chart */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: 24,
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>Total Revenue</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 160, marginLeft: 30, borderBottom: '1px solid #e2e8f0', position: 'relative' }}>
              {/* Y Axis */}
              <div style={{
                position: 'absolute', left: -30, top: 0, bottom: 0,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                fontSize: 10, color: '#94a3b8',
              }}>
                <span>25k</span><span>20k</span><span>15k</span><span>10k</span><span>5k</span><span>0</span>
              </div>
              {/* Grid Lines */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0,
              }}>
                {[0,1,2,3,4,5].map(i => (
                  <div key={i} style={{ width: '100%', height: 1, background: '#f1f5f9' }} />
                ))}
              </div>
              {/* Bar Groups */}
              {[
                [55, 45], [70, 50], [25, 85], [60, 25], [45, 40], [65, 55], [85, 35]
              ].map((bars, i) => (
                <div key={i} style={{ display: 'flex', gap: 4, alignItems: 'flex-end', zIndex: 1, height: '100%', width: '12%', justifyContent: 'center' }}>
                  <div style={{ width: 10, borderRadius: '2px 2px 0 0', background: '#2563eb', height: `${bars[0]}%` }} />
                  <div style={{ width: 10, borderRadius: '2px 2px 0 0', background: '#94a3b8', opacity: 0.5, height: `${bars[1]}%` }} />
                </div>
              ))}
            </div>
            {/* X Axis */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#94a3b8', marginTop: 8, paddingLeft: 30 }}>
              <span>Monday</span><span>Tuesday</span><span>Wednesday</span><span>Thursday</span>
              <span>Friday</span><span>Saturday</span><span>Sunday</span>
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#475569' }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: '#2563eb' }} />This Week
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#475569' }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: '#94a3b8', opacity: 0.5 }} />Last Week
              </div>
            </div>
          </div>

          {/* Heali Insights */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: 24,
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>Heali Insights</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 16, listStyle: 'none', padding: 0, margin: 0 }}>
              {insights.map((insight, i) => (
                <li key={i} style={{
                  fontSize: 13, color: '#334155', lineHeight: 1.5,
                  position: 'relative', paddingLeft: 20,
                }}>
                  <span style={{
                    position: 'absolute', left: 0, top: 7,
                    width: 8, height: 8, borderRadius: '50%', background: priorityColors[insight.priority],
                  }} />
                  {insight.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Quick Actions Widget ─── */}
      <div style={{ position: 'absolute', bottom: 40, right: 40, zIndex: 1000, outline: 'none' }} tabIndex={0}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: '#2563eb', color: '#fff',
          boxShadow: '0 4px 15px rgba(37,99,235,0.4)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
          </svg>
        </div>
        <div style={{
          position: 'absolute', bottom: 70, right: 0,
          background: '#fff', borderRadius: 12,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid #e2e8f0', width: 240,
          display: 'flex', flexDirection: 'column', padding: '8px 0',
        }}>
          <div style={{
            padding: '10px 16px', fontSize: 12, fontWeight: 700,
            color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.05,
            borderBottom: '1px solid #f1f5f9', marginBottom: 4,
          }}>Quick Actions</div>
          {[
            { icon: <UserPlus size={16} />, label: 'Add New Therapist' },
            { icon: <CalendarCheck size={16} />, label: 'Manual Session Override' },
            { icon: <Tag size={16} />, label: 'Flagged Content Review' },
          ].map((action, i) => (
            <button key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px', fontSize: 13, fontWeight: 600,
              color: '#334155', cursor: 'pointer', background: 'none',
              border: 'none', width: '100%', textAlign: 'left',
            }}>
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
