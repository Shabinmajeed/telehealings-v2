import React from 'react';
import BarChart from './BarChart';
import ChartLegend from './ChartLegend';

interface RevenueCardProps {
  title?: string;
  barGroups?: [number, number][];
  yAxisLabels?: string[];
  xAxisLabels?: string[];
  thisWeekColor?: string;
  lastWeekColor?: string;
}

const RevenueCard: React.FC<RevenueCardProps> = ({
  title = 'Total Revenue',
  barGroups = [[55, 45], [70, 50], [25, 85], [60, 25], [45, 40], [65, 55], [85, 35]],
  yAxisLabels = ['25k', '20k', '15k', '10k', '5k', '0'],
  xAxisLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  thisWeekColor = '#2563eb',
  lastWeekColor = '#94a3b8',
}) => {
  const legendItems = [
    { color: thisWeekColor, label: 'This Week' },
    { color: lastWeekColor, label: 'Last Week', opacity: 0.5 },
  ];

  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: 24,
      boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>
        {title}
      </h3>
      <div style={{ height: 160, marginBottom: 8, paddingBottom: 20 }}>
        <BarChart
          groups={barGroups}
          colors={[thisWeekColor, lastWeekColor]}
          opacity={[1, 0.5]}
          yAxisLabels={yAxisLabels}
          xAxisLabels={xAxisLabels}
          height={160}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12 }}>
        <ChartLegend items={legendItems} />
      </div>
    </div>
  );
};

export default RevenueCard;
