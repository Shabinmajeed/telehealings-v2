import React from 'react';

export type InsightPriority = 'high' | 'medium' | 'low';

export interface Insight {
  priority: InsightPriority;
  text: string;
}

interface InsightItemProps {
  insight: Insight;
  priorityColors?: Record<InsightPriority, string>;
}

const defaultPriorityColors: Record<InsightPriority, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
};

const InsightItem: React.FC<InsightItemProps> = ({
  insight,
  priorityColors = defaultPriorityColors,
}) => {
  return (
    <li style={{
      fontSize: 13, color: '#334155', lineHeight: 1.5,
      position: 'relative', paddingLeft: 20,
    }}>
      <span style={{
        position: 'absolute', left: 0, top: 7,
        width: 8, height: 8, borderRadius: '50%',
        background: priorityColors[insight.priority],
      }} />
      {insight.text}
    </li>
  );
};

export default InsightItem;
