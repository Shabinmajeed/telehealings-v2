import React, { useState } from 'react';
import { Download, Calendar } from 'lucide-react';

const kpiData = [
  { label: 'Total Revenue', value: '₹4,28,500', change: '+23%', up: true },
  { label: 'Active Users', value: '1,847', change: '+12%', up: true },
  { label: 'Sessions Completed', value: '342', change: '+8%', up: true },
  { label: 'Avg. Rating', value: '4.8', change: '-0.1', up: false },
];

const AnalyticsPage: React.FC = () => {
  const [healiInsightVisible, setHealiInsightVisible] = useState(true);

  return (
    <div style={{ padding: '0 32px 16px', overflowY: 'auto', flex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 40 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 40, marginBottom: 12 }}>
          <h1 style={{
            fontSize: 20, fontWeight: 700, color: '#0f172a',
            position: 'relative', padding: '0 0 8px 0',
            borderBottom: '2px solid #e2e8f0', margin: 0,
          }}>
            Analytics & Reporting
            <span style={{
              position: 'absolute', bottom: -2, left: 0, right: 0,
              height: 3, background: '#0f172a', borderRadius: '2px 2px 0 0',
            }} />
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {healiInsightVisible && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                border: '1px solid #bfdbfe', borderRadius: 8, flexShrink: 0,
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', background: '#2563eb', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
                    <path d="M9 21h6"/>
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: 0.3, lineHeight: 1.2 }}>Heali Insight</span>
                  <span style={{ fontSize: 11, color: '#1e40af', lineHeight: 1.3, whiteSpace: 'nowrap' }}>Revenue up <strong style={{ fontWeight: 700, color: '#1e3a8a' }}>23%</strong> this month. Peak booking: <strong style={{ fontWeight: 700, color: '#1e3a8a' }}>Tue 2-4 PM</strong>.</span>
                </div>
                <button onClick={() => setHealiInsightVisible(false)} style={{
                  background: 'none', border: 'none', color: '#93c5fd', cursor: 'pointer',
                  padding: 2, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            )}
            <img src="/Heali.png" alt="Heali" style={{ height: 32, flexShrink: 0 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>

        {/* Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginBottom: 16 }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
            borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            border: '1px solid #e2e8f0', background: '#fff', color: '#64748b',
          }}>
            <Calendar size={14} /> This Month
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
            borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            border: 'none', background: '#2a73d4', color: '#fff',
          }}>
            <Download size={14} /> Export Report
          </button>
        </div>

        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {kpiData.map((kpi, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 12, padding: '18px 20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9',
            }}>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 6 }}>{kpi.label}</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>{kpi.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4, color: kpi.up ? '#16a34a' : '#dc2626' }}>
                {kpi.up ? '↑' : '↓'} {kpi.change} vs last month
              </div>
            </div>
          ))}
        </div>

        {/* Chart Row 1 */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
          <div style={{
            background: '#fff', borderRadius: 12, padding: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9',
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Revenue Trend (Last 6 Months)</h3>
            <div style={{ height: 200, background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 13 }}>
              📊 Revenue chart visualization
            </div>
          </div>
          <div style={{
            background: '#fff', borderRadius: 12, padding: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9',
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Session Distribution</h3>
            <div style={{ height: 200, background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 13 }}>
              🥧 Pie chart visualization
            </div>
          </div>
        </div>

        {/* Chart Row 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{
            background: '#fff', borderRadius: 12, padding: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9',
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>User Growth</h3>
            <div style={{ height: 200, background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 13 }}>
              📈 Line chart visualization
            </div>
          </div>
          <div style={{
            background: '#fff', borderRadius: 12, padding: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9',
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Therapist Performance</h3>
            <div style={{ height: 200, background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 13 }}>
              📊 Bar chart visualization
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
