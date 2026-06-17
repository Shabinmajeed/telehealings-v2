import React, { useState } from 'react';
import TherapistLayout from '../components/TherapistLayout';

const MessagesPage: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState('');

  const conversations = [
    { id: 1, name: 'Priya Sharma', avatar: 'PS', color: '#3b82f6', lastMsg: 'Thank you for the session notes...', time: '08:45 AM', unread: 2 },
    { id: 2, name: 'Rahul Nair', avatar: 'RN', color: '#22c55e', lastMsg: "Can we reschedule tomorrow's...", time: '2h ago', unread: 1 },
    { id: 3, name: 'Anjali Krishnan', avatar: 'AK', color: '#f59e0b', lastMsg: 'Completed the worksheet...', time: '4h ago', unread: 0 },
    { id: 4, name: 'Vikram Das', avatar: 'VD', color: '#8b5cf6', lastMsg: 'I have a question about...', time: '1d ago', unread: 0 },
    { id: 5, name: 'Meera Pillai', avatar: 'MP', color: '#ec4899', lastMsg: 'Thank you, Doctor!', time: '2d ago', unread: 0 },
  ];

  const chatMessages = [
    { from: 'client', text: 'Hello Doctor, I wanted to thank you for yesterday\'s session. The breathing exercises really helped.', time: '08:30 AM' },
    { from: 'therapist', text: "You're very welcome, Priya! I'm glad the techniques are working for you. Keep practicing them daily.", time: '08:35 AM' },
    { from: 'client', text: 'Thank you for the session notes, Doctor. Could you also recommend some reading materials?', time: '08:45 AM' },
  ];

  return (
    <TherapistLayout activeNav="messages" pageTitle="Messages" headerMascot healiInsight={{ text: "You have 3 unread messages. Priya Sharma and Rahul Nair are waiting for your reply." }}>
      <div style={{ background: '#ffffff', borderRadius: 16, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', height: 'calc(100vh - 220px)', minHeight: 500, overflow: 'hidden' }}>
        {/* Chat List */}
        <div style={{ width: 320, borderRight: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: 16, borderBottom: '1px solid #f1f5f9' }}>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#64748b' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
              <input type="text" placeholder="Search conversations..." style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {conversations.map((conv, i) => (
              <div key={conv.id} onClick={() => setSelectedChat(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', background: selectedChat === i ? '#f8fafc' : 'transparent' }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: conv.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>{conv.avatar}</div>
                  {conv.unread > 0 && <div style={{ position: 'absolute', top: -2, right: -2, width: 18, height: 18, borderRadius: '50%', background: '#f04438', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>{conv.unread}</div>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{conv.name}</span>
                    <span style={{ fontSize: 11, color: '#94a3b8', flexShrink: 0 }}>{conv.time}</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#64748b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{conv.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: conversations[selectedChat]?.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>{conversations[selectedChat]?.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{conversations[selectedChat]?.name}</div>
              <div style={{ fontSize: 11, color: '#22c55e' }}>● Online</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'therapist' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '70%', padding: '10px 14px', borderRadius: msg.from === 'therapist' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: msg.from === 'therapist' ? '#2a73d4' : '#f1f5f9', color: msg.from === 'therapist' ? '#fff' : '#334155', fontSize: 13, lineHeight: 1.5 }}>
                  {msg.text}
                  <div style={{ fontSize: 10, marginTop: 4, opacity: 0.7 }}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '16px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 8 }}>
            <button style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
            </button>
            <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
            <button style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#2a73d4', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Send</button>
          </div>
        </div>
      </div>
    </TherapistLayout>
  );
};

export default MessagesPage;
