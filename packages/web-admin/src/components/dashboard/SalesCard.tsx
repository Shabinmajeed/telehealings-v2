import React from 'react';
import { Download } from 'lucide-react';
import KpiGrid from './KpiGrid';
import { KpiData } from './KpiCard';

interface SalesCardProps {
  title?: string;
  subtitle?: string;
  kpiData: KpiData[];
  onGenerateReport?: () => void;
}

const SalesCard: React.FC<SalesCardProps> = ({
  title = "This Week's Sales",
  subtitle = 'Weekly performance overview',
  kpiData,
  onGenerateReport,
}) => {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: 24,
      boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20,
      }}>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>
            {title}
          </h2>
          <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>{subtitle}</p>
        </div>
        <button
          onClick={onGenerateReport}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: 6,
            background: 'transparent', fontSize: 12, fontWeight: 600, color: '#334155',
            cursor: 'pointer',
          }}
        >
          <Download size={14} />
          Generate Report
        </button>
      </div>
      <KpiGrid items={kpiData} />
    </div>
  );
};

export default SalesCard;
