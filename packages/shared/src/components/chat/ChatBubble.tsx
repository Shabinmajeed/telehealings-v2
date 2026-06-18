import React from 'react';

interface ChatBubbleProps {
  type: 'sent' | 'received';
  text: string;
  time: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ type, text, time }) => {
  const isSent = type === 'sent';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '70%',
      alignSelf: isSent ? 'flex-end' : 'flex-start',
      alignItems: isSent ? 'flex-end' : 'flex-start',
    }}>
      <div style={{
        padding: '10px 16px',
        borderRadius: isSent ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        fontSize: 14,
        lineHeight: 1.5,
        color: isSent ? '#fff' : '#111111',
        background: isSent ? '#2a73d4' : '#ffffff',
        border: isSent ? 'none' : '1px solid #e2e8f0',
        wordWrap: 'break-word',
      }}>{text}</div>
      <span style={{
        fontSize: 11,
        color: '#94a3b8',
        marginTop: 4,
        textAlign: isSent ? 'right' : 'left',
      }}>{time}</span>
    </div>
  );
};
