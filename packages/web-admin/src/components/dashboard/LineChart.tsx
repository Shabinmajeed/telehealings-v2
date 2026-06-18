import React from 'react';

interface LineChartProps {
  width?: number;
  height?: number;
  lines: {
    path: string;
    color: string;
    strokeWidth?: number;
    fill?: string;
  }[];
  markers?: {
    cx: number;
    cy: number;
    r?: number;
    fill?: string;
    stroke?: string;
    strokeDasharray?: string;
  }[];
  showGrid?: boolean;
  gridColor?: string;
  gridLines?: number;
  style?: React.CSSProperties;
}

const LineChart: React.FC<LineChartProps> = ({
  width = 400,
  height = 160,
  lines,
  markers = [],
  showGrid = false,
  gridColor = '#f1f5f9',
  gridLines = 5,
  style,
}) => {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1, ...style }}
    >
      {showGrid && Array.from({ length: gridLines }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1={(height / (gridLines - 1)) * i}
          x2={width}
          y2={(height / (gridLines - 1)) * i}
          stroke={gridColor}
          strokeWidth="1"
        />
      ))}
      {lines.map((line, i) => (
        <path
          key={i}
          d={line.path}
          fill={line.fill || 'none'}
          stroke={line.color}
          strokeWidth={line.strokeWidth || 2}
        />
      ))}
      {markers.map((m, i) => (
        <React.Fragment key={i}>
          {m.stroke && (
            <line
              x1={m.cx} y1={m.cy} x2={m.cx} y2={height}
              stroke={m.stroke} strokeWidth="1" strokeDasharray={m.strokeDasharray}
            />
          )}
          <circle cx={m.cx} cy={m.cy} r={m.r || 4} fill={m.fill || '#ef4444'} />
        </React.Fragment>
      ))}
    </svg>
  );
};

export default LineChart;
