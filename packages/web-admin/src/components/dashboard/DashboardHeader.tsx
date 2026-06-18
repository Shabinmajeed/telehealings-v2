import React from 'react';

interface DashboardHeaderProps {
  title?: string;
  logoSrc?: string;
  logoAlt?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title = 'Dashboard',
  logoSrc = '/Heali.png',
  logoAlt = 'Heali AI',
}) => {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      paddingTop: 20, marginBottom: 12,
    }}>
      <h1 style={{
        fontSize: 20, fontWeight: 700, color: '#0f172a',
        position: 'relative', padding: '0 0 8px 0',
        borderBottom: '2px solid #e2e8f0', margin: 0,
      }}>
        {title}
        <span style={{
          position: 'absolute', bottom: -2, left: 0, right: 0,
          height: 3, background: '#0f172a', borderRadius: '2px 2px 0 0',
        }} />
      </h1>
      <img
        src={logoSrc}
        alt={logoAlt}
        style={{ height: 48, marginBottom: -1 }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
      />
    </div>
  );
};

export default DashboardHeader;
