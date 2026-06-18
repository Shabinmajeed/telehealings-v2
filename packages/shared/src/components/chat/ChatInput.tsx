import React, { useState } from 'react';

interface ChatInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, placeholder = 'Type a message...' }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: 10,
      padding: '14px 20px',
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      flexShrink: 0,
    }}>
      <button
        title="Attach file"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid #e2e8f0',
          background: '#ffffff',
          color: '#64748b',
          cursor: 'pointer',
          flexShrink: 0,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
      </button>

      <div style={{ flex: 1, position: 'relative' }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={placeholder}
          rows={1}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 20,
            border: '1px solid #e2e8f0',
            background: '#f8fafc',
            fontFamily: 'inherit',
            fontSize: 14,
            outline: 'none',
            resize: 'none',
            boxSizing: 'border-box',
            minHeight: 40,
            maxHeight: 100,
            lineHeight: 1.5,
          }}
        />
      </div>

      <button
        title="Send message"
        onClick={handleSend}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#2a73d4',
          color: '#fff',
          cursor: 'pointer',
          flexShrink: 0,
          border: 'none',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  );
};
