import React from 'react';
import InsightItem, { Insight, InsightPriority } from './InsightItem';

interface InsightsListProps {
  title?: string;
  insights: Insight[];
  priorityColors?: Record<InsightPriority, string>;
}

const InsightsList: React.FC<InsightsListProps> = ({
  title = 'Heali Insights',
  insights,
  priorityColors,
}) => {
  return (
    <div style={{
      background: '#fff', borderRadius: 16, padding: 24,
      boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column',
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }}>
        {title}
      </h3>
      <ul style={{
        display: 'flex', flexDirection: 'column', gap: 16,
        listStyle: 'none', padding: 0, margin: 0,
      }}>
        {insights.map((insight, i) => (
          <InsightItem key={i} insight={insight} priorityColors={priorityColors} />
        ))}
      </ul>
    </div>
  );
};

export default InsightsList;
