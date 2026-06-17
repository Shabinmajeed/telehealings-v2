import React, { useState } from 'react';
import TherapistLayout from '../components/TherapistLayout';

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  color: string;
  lastMsg: string;
  time: string;
  unread: number;
  status: string;
}

interface ChatMessage {
  type: 'sent' | 'received';
  text: string;
  time: string;
}

const conversations: Conversation[] = [
  { id: 1, name: 'Priya Sharma', avatar: 'PS', color: '#3b82f6', lastMsg: "I've been feeling much better since our last session...", time: '10:32 AM', unread: 2, status: 'Online' },
  { id: 2, name: 'Rahul Nair', avatar: 'RN', color: '#22c55e', lastMsg: "Could we reschedule Thursday's session?", time: '9:15 AM', unread: 1, status: 'Last seen 15 min ago' },
  { id: 3, name: 'Anjali Krishnan', avatar: 'AK', color: '#f59e0b', lastMsg: 'Thank you for the mindfulness exercises...', time: 'Yesterday', unread: 2, status: 'Last seen 2 hours ago' },
  { id: 4, name: 'Vikram Das', avatar: 'VD', color: '#8b5cf6', lastMsg: "Sounds good, I'll practice the breathing technique.", time: 'Yesterday', unread: 0, status: 'Last seen 3 hours ago' },
];

const convData: Record<number, { name: string; status: string; messages: ChatMessage[] }> = {
  1: {
    name: 'Priya Sharma',
    status: 'Online',
    messages: [
      { type: 'received', text: "Hi Dr. Thomas, I hope you're doing well. I wanted to share something about my week.", time: '10:20 AM' },
      { type: 'sent', text: "Hello Priya! I'm glad you reached out. I'm doing well, thank you. Please go ahead — I'm here to listen.", time: '10:22 AM' },
      { type: 'received', text: "I've been feeling much better since our last session. The breathing exercises you recommended have been really helpful, especially during stressful moments at work.", time: '10:25 AM' },
      { type: 'sent', text: "That's wonderful to hear, Priya! I'm so glad the techniques are making a difference. Consistency is key — keep practicing them daily, even when you're feeling calm. It builds resilience for tougher moments.", time: '10:27 AM' },
      { type: 'received', text: "Absolutely! I've been doing the 4-7-8 technique every morning. Also, I had a situation yesterday where I felt anxiety creeping in during a meeting, and I managed to ground myself using the 5-4-3-2-1 method. It worked!", time: '10:30 AM' },
      { type: 'sent', text: "That's fantastic progress! Using the 5-4-3-2-1 technique in real-time is a huge step forward. You should be proud of yourself for recognizing the anxiety and taking action. How did you feel afterward?", time: '10:31 AM' },
      { type: 'received', text: "I felt really empowered, honestly. It's like I finally have tools I can rely on. I've been feeling much better since our last session and I wanted you to know how much of a difference it's made.", time: '10:32 AM' },
    ],
  },
  2: {
    name: 'Rahul Nair',
    status: 'Last seen 15 min ago',
    messages: [
      { type: 'received', text: 'Hi Dr. Thomas, I hope this message finds you well.', time: '8:45 AM' },
      { type: 'sent', text: "Hi Rahul! Yes, I'm doing well. How are you? Is everything okay?", time: '8:50 AM' },
      { type: 'received', text: "I wanted to ask — could we reschedule Thursday's session? Something urgent has come up at work and I won't be able to make it at 11:30 AM.", time: '9:15 AM' },
    ],
  },
  3: {
    name: 'Anjali Krishnan',
    status: 'Last seen 2 hours ago',
    messages: [
      { type: 'sent', text: "Hi Anjali! Here are the mindfulness exercises we discussed. Try to practice at least 10 minutes daily and let me know how it goes.", time: 'Yesterday, 4:00 PM' },
      { type: 'received', text: "Thank you for the mindfulness exercises! I've already started the body scan meditation and it's been incredibly relaxing. I noticed I'm sleeping better too.", time: 'Yesterday, 6:30 PM' },
      { type: 'received', text: "Also, I wanted to let you know that the journaling prompts have been really eye-opening. I'm starting to notice patterns in my thoughts that I wasn't aware of before.", time: 'Yesterday, 7:15 PM' },
    ],
  },
  4: {
    name: 'Vikram Das',
    status: 'Last seen 3 hours ago',
    messages: [
      { type: 'sent', text: "Hi Vikram! Great session today. Remember to practice the diaphragmatic breathing technique we worked on. Even 5 minutes twice a day can make a big difference.", time: 'Yesterday, 2:00 PM' },
      { type: 'received', text: "Thank you, Dr. Thomas. I'll definitely keep practicing.", time: 'Yesterday, 3:30 PM' },
      { type: 'sent', text: "You're welcome! And don't worry about the progress being slow. Every small step counts. See you at our next session on Friday.", time: 'Yesterday, 3:35 PM' },
      { type: 'received', text: "Sounds good, I'll practice the breathing technique. Thank you for the encouragement!", time: 'Yesterday, 4:00 PM' },
    ],
  },
};

const MessagesPage: React.FC = () => {
  const [selectedConvId, setSelectedConvId] = useState(1);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedConv = conversations.find(c => c.id === selectedConvId) || conversations[0];
  const chatData = convData[selectedConvId] || convData[1];

  const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

  const filteredConversations = conversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TherapistLayout
      activeNav="messages"
      pageTitle="Messages"
      headerMascot
      healiInsight={{ text: `You have ${totalUnread} unread messages. Priya Sharma and Rahul Nair are waiting for your reply.` }}
    >
      <div style={{
        display: 'flex',
        gap: 0,
        background: '#ffffff',
        borderRadius: 16,
        boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
        overflow: 'hidden',
        flex: 1,
        minHeight: 0,
        height: 'calc(100vh - 220px)',
      }}>
        {/* ─── Left Pane: Conversation List ─── */}
        <div style={{
          width: 340,
          flexShrink: 0,
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 16px 12px',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              Conversations
            </h3>
            <span style={{
              fontSize: 12,
              color: '#64748b',
              background: '#f1f5f9',
              padding: '2px 8px',
              borderRadius: 10,
              fontWeight: 600,
            }}>
              {conversations.length}
            </span>
          </div>

          {/* Search */}
          <div style={{
            padding: '8px 16px',
            borderBottom: '1px solid #f1f5f9',
            position: 'relative',
          }}>
            <svg
              style={{
                position: 'absolute',
                left: 26,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
                color: '#64748b',
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: 20,
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                fontFamily: 'inherit',
                fontSize: 13,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Conversation Items */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: selectedConvId === conv.id ? '14px 16px 14px 13px' : '14px 16px',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  borderBottom: '1px solid #f1f5f9',
                  position: 'relative',
                  background: selectedConvId === conv.id ? '#eff6ff' : 'transparent',
                  borderLeft: selectedConvId === conv.id ? '3px solid #2a73d4' : '3px solid transparent',
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  objectFit: 'cover' as const,
                  background: '#e2e8f0',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#fff',
                  position: 'relative',
                }}>
                  <img
                    src="/assets/user-profile.jpg"
                    alt={conv.name}
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <span style={{ position: 'relative', zIndex: 1 }}>{conv.avatar}</span>
                </div>

                {/* Info */}
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
                      color: selectedConvId === conv.id ? '#0745b1' : '#0f172a',
                    }}>
                      {conv.name}
                    </span>
                    <span style={{
                      fontSize: 11,
                      color: '#94a3b8',
                      flexShrink: 0,
                    }}>
                      {conv.time}
                    </span>
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
                    }}>
                      {conv.lastMsg}
                    </span>
                    {conv.unread > 0 && (
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
                      }}>
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Right Pane: Chat Window ─── */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          background: '#fafbfc',
        }}>
          {/* Chat Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 20px',
            background: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            flexShrink: 0,
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              flexShrink: 0,
              position: 'relative',
            }}>
              <img
                src="/assets/user-profile.jpg"
                alt={selectedConv.name}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  background: '#e2e8f0',
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>
                {chatData.name}
              </div>
              <div style={{
                fontSize: 11,
                color: chatData.status === 'Online' ? '#22c55e' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}>
                {chatData.status === 'Online' && (
                  <span style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#22c55e',
                    display: 'inline-block',
                  }} />
                )}
                {chatData.status}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {/* Phone Call */}
              <button
                title="Voice Call"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#64748b',
                  cursor: 'pointer',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </button>
              {/* Video Call */}
              <button
                title="Video Call"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#64748b',
                  cursor: 'pointer',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </button>
              {/* More Options */}
              <button
                title="More Options"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#64748b',
                  cursor: 'pointer',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            {/* Date Separator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              margin: '4px 0',
            }}>
              <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#94a3b8',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Today
              </span>
              <div style={{ flex: 1, height: 1, background: '#e2e8f0' }} />
            </div>

            {/* Messages */}
            {chatData.messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '70%',
                  alignSelf: msg.type === 'sent' ? 'flex-end' : 'flex-start',
                  alignItems: msg.type === 'sent' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  padding: '10px 16px',
                  borderRadius: msg.type === 'sent' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: msg.type === 'sent' ? '#fff' : '#111111',
                  background: msg.type === 'sent' ? '#2a73d4' : '#ffffff',
                  border: msg.type === 'received' ? '1px solid #e2e8f0' : 'none',
                  wordWrap: 'break-word',
                }}>
                  {msg.text}
                </div>
                <span style={{
                  fontSize: 11,
                  color: '#94a3b8',
                  marginTop: 4,
                  textAlign: msg.type === 'sent' ? 'right' : 'left',
                }}>
                  {msg.time}
                </span>
              </div>
            ))}

            {/* Typing Indicator (hidden by default) */}
            <div style={{ display: 'none' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: '10px 16px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '18px 18px 18px 4px',
                width: 'fit-content',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8', display: 'inline-block' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8', display: 'inline-block' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#94a3b8', display: 'inline-block' }} />
              </div>
            </div>
          </div>

          {/* Chat Input Area */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 10,
            padding: '14px 20px',
            background: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            flexShrink: 0,
          }}>
            {/* Attachment Button */}
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

            {/* Text Input */}
            <div style={{ flex: 1, position: 'relative' }}>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type a message..."
                rows={1}
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

            {/* Send Button */}
            <button
              title="Send message"
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
        </div>
      </div>
    </TherapistLayout>
  );
};

export default MessagesPage;
