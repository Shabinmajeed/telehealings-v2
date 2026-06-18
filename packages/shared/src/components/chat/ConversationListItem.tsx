import React from 'react';

interface ConversationListItemProps {
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  color?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const ConversationListItem: React.FC<ConversationListItemProps> = ({
  name,
  avatar,
  lastMessage,
  time,
  unread = 0,
  color = '#3b82f6',
  isActive = false,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: isActive ? '14px 16px 14px 13px' : '14px 16px',
        cursor: 'pointer',
        transition: 'background 0.15s',
        borderBottom: '1px solid #f1f5f9',
        position: 'relative',
        background: isActive ? '#eff6ff' : 'transparent',
        borderLeft: isActive ? '3px solid #2a73d4' : '3px solid transparent',
      }}
    >
      <div style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        backgroundColor: color,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: 700,
        color: '#fff',
      }}>{avatar}</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 3,
        }}>
          <span style={{
            fontSize: 14,
            fontWeight: 600,
            color: isActive ? '#0745b1' : '#0f172a',
          }}>{name}</span>
          <span style={{ fontSize: 11, color: '#94a3b8', flexShrink: 0 }}>{time}</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{
            fontSize: 12,
            color: '#64748b',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            flex: 1,
            marginRight: 8,
          }}>{lastMessage}</span>
          {unread > 0 && (
            <span style={{
              background: '#f04438',
              color: '#fff',
              fontSize: 10,
              padding: '1px 6px',
              borderRadius: 10,
              fontWeight: 700,
              flexShrink: 0,
              minWidth: 18,
              textAlign: 'center',
            }}>{unread}</span>
          )}
        </div>
      </div>
    </div>
  );
};
