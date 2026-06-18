import React from 'react';

interface ChartLegendItem {
  color: string;
  label: string;
  opacity?: number;
}

interface ChartLegendProps {
  items: ChartLegendItem[];
  gap?: number;
}

const ChartLegend: React.FC<ChartLegendProps> = ({ items, gap = 16 }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap }}>
      {items.map((item, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#475569',
        }}>
          <div style={{
            width: 12, height: 12, borderRadius: 2,
            background: item.color, opacity: item.opacity ?? 1,
          }} />
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default ChartLegend;
