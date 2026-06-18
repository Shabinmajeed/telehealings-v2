import React from 'react';

export interface KpiData {
  label: string;
  value: string;
  trend: string;
  trendDir: 'up' | 'down';
  icon: React.ReactNode;
  iconBg?: string;
}

interface KpiCardProps {
  data: KpiData;
}

const KpiCard: React.FC<KpiCardProps> = ({ data }) => {
  const iconBg = data.iconBg || '#3b82f6';

  return (
    <div style={{
      border: '1px solid #e2e8f0', borderRadius: 12, padding: 16,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'flex-start',
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: iconBg, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{data.icon}</span>
        </div>
        <div style={{ fontSize: 10, color: '#3b82f6', textAlign: 'right', lineHeight: 1.2 }}>
          {data.trend.split(' ').map((word, wi) => (
            <React.Fragment key={wi}>{wi > 0 && <br />}{word}{' '}</React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
        {data.value}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <span style={{ fontSize: 12, color: '#475569', width: '60%', lineHeight: 1.2 }}>
          {data.label}
        </span>
        <span style={{
          fontSize: 20, fontWeight: 700, lineHeight: 1,
          color: data.trendDir === 'up' ? '#22c55e' : '#ef4444',
        }}>
          {data.trendDir === 'up' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default KpiCard;
