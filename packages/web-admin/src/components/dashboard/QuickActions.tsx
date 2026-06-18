import React from 'react';

export interface QuickAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  actions,
  title = 'Quick Actions',
}) => {
  return (
    <div style={{
      position: 'absolute', bottom: 40, right: 40, zIndex: 1000, outline: 'none',
    }} tabIndex={0}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: '#2563eb', color: '#fff',
        boxShadow: '0 4px 15px rgba(37,99,235,0.4)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      </div>
      <div style={{
        position: 'absolute', bottom: 70, right: 0,
        background: '#fff', borderRadius: 12,
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0', width: 240,
        display: 'flex', flexDirection: 'column', padding: '8px 0',
      }}>
        <div style={{
          padding: '10px 16px', fontSize: 12, fontWeight: 700,
          color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.05,
          borderBottom: '1px solid #f1f5f9', marginBottom: 4,
        }}>
          {title}
        </div>
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={action.onClick}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 16px', fontSize: 13, fontWeight: 600,
              color: '#334155', cursor: 'pointer', background: 'none',
              border: 'none', width: '100%', textAlign: 'left',
            }}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
