import React from 'react';
import KpiCard, { KpiData } from './KpiCard';

interface KpiGridProps {
  items: KpiData[];
  columns?: number;
}

const KpiGrid: React.FC<KpiGridProps> = ({ items, columns = 4 }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 16,
    }}>
      {items.map((kpi, i) => (
        <KpiCard key={i} data={kpi} />
      ))}
    </div>
  );
};

export default KpiGrid;
