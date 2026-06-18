import React from 'react';

interface BarChartProps {
  groups: [number, number][];
  colors?: [string, string];
  opacity?: [number, number];
  yAxisLabels?: string[];
  xAxisLabels?: string[];
  height?: number;
  barWidth?: number;
  barGap?: number;
  gridColor?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  groups,
  colors = ['#2563eb', '#94a3b8'],
  opacity = [1, 0.5],
  yAxisLabels = [],
  xAxisLabels = [],
  height = 160,
  barWidth = 10,
  barGap = 4,
  gridColor = '#f1f5f9',
}) => {
  const gridLineCount = yAxisLabels.length || 5;

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      height, marginLeft: yAxisLabels.length ? 30 : 0,
      borderBottom: '1px solid #e2e8f0', position: 'relative',
    }}>
      {/* Y Axis */}
      {yAxisLabels.length > 0 && (
        <div style={{
          position: 'absolute', left: -30, top: 0, bottom: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          fontSize: 10, color: '#94a3b8',
        }}>
          {yAxisLabels.map((label, i) => <span key={i}>{label}</span>)}
        </div>
      )}
      {/* Grid Lines */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0,
      }}>
        {Array.from({ length: gridLineCount }).map((_, i) => (
          <div key={i} style={{ width: '100%', height: 1, background: gridColor }} />
        ))}
      </div>
      {/* Bar Groups */}
      {groups.map((bars, i) => (
        <div key={i} style={{
          display: 'flex', gap: barGap, alignItems: 'flex-end',
          zIndex: 1, height: '100%', width: `${100 / groups.length}%`, justifyContent: 'center',
        }}>
          {bars.map((barHeight, j) => (
            <div key={j} style={{
              width: barWidth, borderRadius: '2px 2px 0 0',
              background: colors[j], opacity: opacity[j], height: `${barHeight}%`,
            }} />
          ))}
        </div>
      ))}
      {/* X Axis */}
      {xAxisLabels.length > 0 && (
        <div style={{
          position: 'absolute', bottom: -20, left: 0, right: 0,
          display: 'flex', justifyContent: 'space-between',
          fontSize: 10, color: '#94a3b8', paddingLeft: yAxisLabels.length ? 30 : 0,
        }}>
          {xAxisLabels.map((label, i) => <span key={i}>{label}</span>)}
        </div>
      )}
    </div>
  );
};

export default BarChart;
