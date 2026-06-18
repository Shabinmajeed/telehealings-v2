import React from 'react';
import LineChart from './LineChart';
import ChartLegend from './ChartLegend';

interface UserInsightsChartProps {
  height?: number;
}

const UserInsightsChart: React.FC<UserInsightsChartProps> = ({ height = 180 }) => {
  const yAxisLabels = ['400', '300', '200', '100', '0'];
  const xAxisLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Sept', 'Oct', 'Nov', 'Dec'];

  const lines = [
    { path: 'M0 60 C 50 20, 100 20, 150 100 C 200 150, 250 100, 300 60 C 350 20, 400 120, 400 120', color: '#60a5fa' },
    { path: 'M0 120 C 50 90, 100 140, 150 140 C 200 140, 250 20, 300 40 C 350 60, 400 140, 400 140', color: '#2563eb' },
    { path: 'M0 80 C 50 120, 100 160, 150 120 C 200 80, 250 40, 300 80 C 350 120, 400 100, 400 100', color: '#94a3b8' },
  ];

  const markers = [
    { cx: 230, cy: 25, stroke: '#ef4444', strokeDasharray: '3,3' },
  ];

  const legendItems = [
    { color: '#60a5fa', label: 'Registered Users' },
    { color: '#2563eb', label: 'New Users' },
    { color: '#94a3b8', label: 'Others' },
  ];

  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: 24,
      boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>
        User Insights
      </h3>
      <div style={{ position: 'relative', width: '100%', height, marginBottom: 12, marginLeft: 30 }}>
        {/* Y Axis */}
        <div style={{
          position: 'absolute', left: -30, top: 0, bottom: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          fontSize: 10, color: '#94a3b8',
        }}>
          {yAxisLabels.map((l, i) => <span key={i}>{l}</span>)}
        </div>
        {/* Grid */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0,
        }}>
          {yAxisLabels.map((_, i) => (
            <div key={i} style={{ width: '100%', height: 1, background: '#f1f5f9' }} />
          ))}
        </div>
        <LineChart width={400} height={160} lines={lines} markers={markers} />
      </div>
      {/* X Axis */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 10, color: '#94a3b8', marginBottom: 16, paddingLeft: 30,
      }}>
        {xAxisLabels.map((l, i) => <span key={i}>{l}</span>)}
      </div>
      <ChartLegend items={legendItems} />
    </div>
  );
};

export default UserInsightsChart;
