import React from 'react';

interface BookingsCardProps {
  lastMonthLabel?: string;
  lastMonthValue?: number;
  thisMonthLabel?: string;
  thisMonthValue?: number;
  thisMonthColor?: string;
}

const BookingsCard: React.FC<BookingsCardProps> = ({
  lastMonthLabel = 'Last Month',
  lastMonthValue = 150,
  thisMonthLabel = 'This Month',
  thisMonthValue = 278,
  thisMonthColor = '#2563eb',
}) => {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: 24,
      boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>
        Number of Bookings
      </h3>
      <div style={{ position: 'relative', width: '100%', height: 180, marginBottom: 24 }}>
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="bookings-blue-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(37,99,235,0.2)" />
              <stop offset="100%" stopColor="rgba(37,99,235,0)" />
            </linearGradient>
            <linearGradient id="bookings-gray-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(148,163,184,0.2)" />
              <stop offset="100%" stopColor="rgba(148,163,184,0)" />
            </linearGradient>
          </defs>
          <path d="M0 80 L 50 100 L 100 110 L 150 110 L 200 100 L 250 100 L 300 80 L 300 120 L 0 120 Z" fill="url(#bookings-gray-grad)" />
          <path d="M0 80 L 50 100 L 100 110 L 150 110 L 200 100 L 250 100 L 300 80" fill="none" stroke="#94a3b8" strokeWidth="2" />
          {[0, 50, 100, 150, 200, 250, 300].map((x, i) => (
            <circle key={`g${i}`} cx={x} cy={[80, 100, 110, 110, 100, 100, 80][i]} r="3" fill="#94a3b8" />
          ))}
          <path d="M0 20 L 50 40 L 100 30 L 150 60 L 200 25 L 250 80 L 300 10 L 300 120 L 0 120 Z" fill="url(#bookings-blue-grad)" />
          <path d="M0 20 L 50 40 L 100 30 L 150 60 L 200 25 L 250 80 L 300 10" fill="none" stroke={thisMonthColor} strokeWidth="2" />
          {[0, 50, 100, 150, 200, 250, 300].map((x, i) => (
            <circle key={`b${i}`} cx={x} cy={[20, 40, 30, 60, 25, 80, 10][i]} r="3" fill={thisMonthColor} />
          ))}
        </svg>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 40, marginTop: 5, paddingLeft: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#94a3b8' }}>
            <div style={{ width: 16, height: 2, background: '#94a3b8', position: 'relative' }}>
              <div style={{
                position: 'absolute', top: -3, left: 4, width: 8, height: 8,
                borderRadius: '50%', background: '#94a3b8',
              }} />
            </div>
            {lastMonthLabel}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{lastMonthValue}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#94a3b8' }}>
            <div style={{ width: 16, height: 2, background: thisMonthColor, position: 'relative' }}>
              <div style={{
                position: 'absolute', top: -3, left: 4, width: 8, height: 8,
                borderRadius: '50%', background: thisMonthColor,
              }} />
            </div>
            {thisMonthLabel}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: thisMonthColor }}>{thisMonthValue}</div>
        </div>
      </div>
    </div>
  );
};

export default BookingsCard;
