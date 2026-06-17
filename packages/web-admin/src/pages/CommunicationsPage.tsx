import React, { useState } from 'react';
import {
  Search, Send, Plus, X, Paperclip, CheckCircle, AlertTriangle
} from 'lucide-react';

// ─── Types ───
interface ChatMessage {
  type: 'received' | 'sent';
  text: string;
  time: string;
}

interface Chat {
  id: number;
  name: string;
  role: string;
  avatar: string;
  time: string;
  preview: string;
  unread: number;
  escalated: boolean;
  active: boolean;
  messages: ChatMessage[];
}

interface Ticket {
  id: number;
  ticketId: string;
  subject: string;
  preview: string;
  user: string;
  userRole: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Pending' | 'Resolved';
}

// ─── Sample Data ───
const initialChats: Chat[] = [
  {
    id: 1, name: 'Nathaniel Jacob', role: 'Client', avatar: 'NJ', time: '10:30 AM',
    preview: 'I need to reschedule my session...', unread: 2, escalated: true, active: true,
    messages: [
      { type: 'received', text: 'Hi, I need to reschedule my session with Dr. Smith. Something urgent came up.', time: '10:28 AM' },
      { type: 'sent', text: 'Hello Nathaniel, I understand. Let me check Dr. Smith\'s availability for you. What days work best?', time: '10:30 AM' },
      { type: 'received', text: 'I was hoping for tomorrow afternoon, but I\'m flexible. Also, I wanted to ask about the premium subscription — does it cover emergency sessions?', time: '10:32 AM' },
      { type: 'sent', text: 'Tomorrow at 2 PM is available. I\'ve held that slot for you. Regarding premium — yes, it includes 2 emergency sessions per month. Would you like me to add that to your plan?', time: '10:35 AM' },
      { type: 'received', text: 'That sounds perfect. Yes, please add the premium plan. How do I pay for the upgrade?', time: '10:38 AM' },
    ]
  },
  {
    id: 2, name: 'Dr. Sarah Smith', role: 'Therapist', avatar: 'SS', time: '09:15 AM',
    preview: 'Patient Max Mayfield has been missing...', unread: 0, escalated: false, active: false,
    messages: [
      { type: 'received', text: 'Patient Max Mayfield has been missing sessions for 2 weeks. I\'ve tried reaching out but no response.', time: '09:10 AM' },
      { type: 'sent', text: 'Thank you for flagging this, Dr. Smith. I\'ll reach out to Max directly and update you on the status.', time: '09:15 AM' },
    ]
  },
  {
    id: 3, name: 'Jane Hopper', role: 'Client', avatar: 'JH', time: 'Yesterday',
    preview: 'Thank you for the refund processing...', unread: 0, escalated: false, active: false,
    messages: [
      { type: 'received', text: 'Thank you for processing the refund. The amount has been credited to my account.', time: 'Yesterday' },
      { type: 'sent', text: 'You\'re welcome, Jane! Is there anything else I can help you with?', time: 'Yesterday' },
    ]
  },
  {
    id: 4, name: 'Mike Wheeler', role: 'Client', avatar: 'MW', time: 'Yesterday',
    preview: 'Can I switch my therapist? I feel like...', unread: 1, escalated: false, active: false,
    messages: [
      { type: 'received', text: 'Can I switch my therapist? I feel like the current match isn\'t working well for me.', time: 'Yesterday' },
    ]
  },
  {
    id: 5, name: 'Dr. Emily Chen', role: 'Therapist', avatar: 'EC', time: 'Mon',
    preview: 'Weekly availability update for next week...', unread: 0, escalated: false, active: false,
    messages: [
      { type: 'received', text: 'Here\'s my availability for next week: Mon-Wed 9 AM to 5 PM, Thu 10 AM to 3 PM, Fri off.', time: 'Mon' },
      { type: 'sent', text: 'Thanks Dr. Chen! I\'ve updated the schedule accordingly.', time: 'Mon' },
    ]
  },
];

const ticketsData: Ticket[] = [
  { id: 1, ticketId: 'TKT-001', subject: 'Session Refund Request', preview: 'Client requesting refund for cancelled session', user: 'Nathaniel Jacob', userRole: 'Client', date: '25/04/2026', priority: 'High', status: 'Open' },
  { id: 2, ticketId: 'TKT-002', subject: 'Therapist No-Show Report', preview: 'Dr. Smith did not attend scheduled session', user: 'Max Mayfield', userRole: 'Client', date: '24/04/2026', priority: 'Critical', status: 'Open' },
  { id: 3, ticketId: 'TKT-003', subject: 'Account Access Issue', preview: 'Unable to log in after password reset', user: 'Jane Hopper', userRole: 'Client', date: '24/04/2026', priority: 'Medium', status: 'Pending' },
  { id: 4, ticketId: 'TKT-004', subject: 'Subscription Upgrade Query', preview: 'Question about premium plan features', user: 'Mike Wheeler', userRole: 'Client', date: '23/04/2026', priority: 'Low', status: 'Resolved' },
  { id: 5, ticketId: 'TKT-005', subject: 'Session Quality Feedback', preview: 'Feedback on recent therapy session experience', user: 'Bethany Kay', userRole: 'Client', date: '22/04/2026', priority: 'Medium', status: 'Pending' },
];

// ─── Helpers ───
function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

const priorityColors: Record<string, { bg: string; text: string }> = {
  Low: { bg: '#f0fdf4', text: '#166534' },
  Medium: { bg: '#fffbeb', text: '#92400e' },
  High: { bg: '#fef2f2', text: '#991b1b' },
  Critical: { bg: '#fee2e2', text: '#7f1d1d' },
};

const statusColors: Record<string, { bg: string; text: string }> = {
  Open: { bg: '#fee2e2', text: '#991b1b' },
  Pending: { bg: '#fef9c3', text: '#854d0e' },
  Resolved: { bg: '#dcfce7', text: '#166534' },
};

const CommunicationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'messages' | 'tickets'>('messages');
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState(1);
  const [chatInput, setChatInput] = useState('');
  const [chatFilter, setChatFilter] = useState('All');
  const [healiInsightVisible, setHealiInsightVisible] = useState(true);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketSearch, setTicketSearch] = useState('');

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];
  const filteredChats = chats.filter(c => {
    if (chatFilter === 'All') return true;
    if (chatFilter === 'Open') return c.unread > 0;
    if (chatFilter === 'Pending') return c.unread > 0;
    if (chatFilter === 'Resolved') return c.unread === 0;
    return true;
  });

  const filteredTickets = ticketsData.filter(t =>
    t.subject.toLowerCase().includes(ticketSearch.toLowerCase()) ||
    t.ticketId.toLowerCase().includes(ticketSearch.toLowerCase()) ||
    t.user.toLowerCase().includes(ticketSearch.toLowerCase())
  );

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChats(prev => prev.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          messages: [...c.messages, { type: 'sent' as const, text: chatInput, time: 'Just now' }],
          preview: chatInput,
        };
      }
      return c;
    }));
    setChatInput('');
  };

  return (
    <div style={{ padding: '0 32px 16px', overflowY: 'auto', flex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', paddingBottom: 40 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 40, marginBottom: 12 }}>
          <h1 style={{
            fontSize: 20, fontWeight: 700, color: '#0f172a',
            position: 'relative', padding: '0 0 8px 0',
            borderBottom: '2px solid #e2e8f0', margin: 0,
          }}>
            Communications & Escalations
            <span style={{
              position: 'absolute', bottom: -2, left: 0, right: 0,
              height: 3, background: '#0f172a', borderRadius: '2px 2px 0 0',
            }} />
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {healiInsightVisible && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                border: '1px solid #bfdbfe', borderRadius: 8, flexShrink: 0,
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', background: '#2563eb', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z"/>
                    <path d="M9 21h6"/>
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: 0.3, lineHeight: 1.2 }}>Heali Insight</span>
                  <span style={{ fontSize: 11, color: '#1e40af', lineHeight: 1.3, whiteSpace: 'nowrap' }}>3 escalated threads require attention. <strong style={{ fontWeight: 700, color: '#1e3a8a' }}>Max Mayfield</strong> waiting 48+ hrs.</span>
                </div>
                <button onClick={() => setHealiInsightVisible(false)} style={{
                  background: 'none', border: 'none', color: '#93c5fd', cursor: 'pointer',
                  padding: 2, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            )}
            <img src="/Heali.png" alt="Heali" style={{ height: 32, flexShrink: 0 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid #e2e8f0', marginBottom: 0 }}>
          <button
            onClick={() => setActiveTab('messages')}
            style={{
              background: 'transparent', border: 'none', padding: '10px 4px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', position: 'relative', color: activeTab === 'messages' ? '#2a73d4' : '#64748b',
            }}
          >Messages
            {activeTab === 'messages' && <span style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: '#2a73d4', borderRadius: '2px 2px 0 0' }} />}
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            style={{
              background: 'transparent', border: 'none', padding: '10px 4px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', position: 'relative', color: activeTab === 'tickets' ? '#2a73d4' : '#64748b',
            }}
          >Support Tickets
            {activeTab === 'tickets' && <span style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: '#2a73d4', borderRadius: '2px 2px 0 0' }} />}
          </button>
        </div>

        {/* ─── MESSAGES TAB ─── */}
        {activeTab === 'messages' && (
          <div style={{
            display: 'flex', flex: 1, height: 'calc(100vh - 220px)', background: '#fff',
            borderRadius: 16, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden',
          }}>
            {/* Chat Sidebar */}
            <div style={{
              width: 320, borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column',
              background: '#f8fafc', flexShrink: 0,
            }}>
              <div style={{ padding: 16, borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                  <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: '#64748b', pointerEvents: 'none' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    type="text" placeholder="Search messages..."
                    style={{
                      width: '100%', padding: '8px 10px 8px 32px', borderRadius: 8,
                      border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto' }}>
                  {['All', 'Open (1)', 'Pending (1)', 'Resolved (1)'].map(f => (
                    <button
                      key={f}
                      onClick={() => setChatFilter(f)}
                      style={{
                        background: chatFilter === f ? '#eff6ff' : '#f1f5f9',
                        border: `1px solid ${chatFilter === f ? '#bfdbfe' : 'transparent'}`,
                        color: chatFilter === f ? '#2563eb' : '#475569',
                        padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                        cursor: 'pointer', whiteSpace: 'nowrap',
                      }}
                    >{f}</button>
                  ))}
                </div>
              </div>

              {/* Chat List */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {filteredChats.map(chat => (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    style={{
                      display: 'flex', padding: '14px 16px', gap: 10, cursor: 'pointer',
                      borderBottom: '1px solid #f1f5f9',
                      background: chat.id === activeChatId ? '#eff6ff' : 'transparent',
                      borderLeft: chat.id === activeChatId ? '3px solid #2a73d4' : '3px solid transparent',
                      paddingLeft: chat.id === activeChatId ? 13 : 16,
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: chat.escalated ? '#ef4444' : '#3b82f6',
                      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, flexShrink: 0,
                    }}>{chat.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2, alignItems: 'center' }}>
                        <span style={{ fontWeight: 600, fontSize: 13, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.name}</span>
                        <span style={{ fontSize: 11, color: '#64748b', whiteSpace: 'nowrap' }}>{chat.time}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 180 }}>{chat.preview}</span>
                        {chat.unread > 0 && (
                          <span style={{ background: '#ef4444', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 5px', borderRadius: 99 }}>{chat.unread}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Main */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', minWidth: 0, height: '100%' }}>
              {/* Chat Header */}
              <div style={{
                padding: '14px 20px', borderBottom: '1px solid #e2e8f0',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', background: activeChat.escalated ? '#ef4444' : '#3b82f6',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, flexShrink: 0,
                  }}>{activeChat.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{activeChat.name}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{activeChat.role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {activeChat.escalated && (
                    <div style={{
                      background: '#fee2e2', color: '#991b1b', padding: '4px 10px', borderRadius: 6,
                      fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2,
                    }}>
                      <AlertTriangle size={12} /> Escalated
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{
                      background: '#fff', border: '1px solid #e2e8f0', color: '#0f172a',
                      padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: 2,
                    }}>
                      <CheckCircle size={12} /> Resolve
                    </button>
                    <button style={{
                      background: '#fff', border: '1px solid #fca5a5', color: '#dc2626',
                      padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: 2,
                    }}>
                      <AlertTriangle size={12} /> Escalate
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div style={{
                flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 14,
                background: '#fafafa', minHeight: 400,
              }}>
                {activeChat.messages.map((msg, i) => (
                  <div key={i} style={{
                    minWidth: '60%', maxWidth: '75%', display: 'flex', flexDirection: 'column',
                    alignSelf: msg.type === 'received' ? 'flex-start' : 'flex-end',
                  }}>
                    <div style={{
                      padding: '10px 14px', borderRadius: 10, fontSize: 13, lineHeight: 1.5,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)', minHeight: 36, display: 'flex', alignItems: 'center',
                      background: msg.type === 'received' ? '#fff' : '#2563eb',
                      color: msg.type === 'received' ? '#334155' : '#fff',
                      border: msg.type === 'received' ? '1px solid #e2e8f0' : 'none',
                      borderTopLeftRadius: msg.type === 'received' ? 4 : 10,
                      borderTopRightRadius: msg.type === 'sent' ? 4 : 10,
                    }}>{msg.text}</div>
                    <div style={{
                      fontSize: 10, color: '#94a3b8', marginTop: 4,
                      textAlign: msg.type === 'sent' ? 'right' : 'left',
                    }}>{msg.time}</div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div style={{
                padding: '14px 20px', borderTop: '1px solid #e2e8f0',
                display: 'flex', gap: 10, alignItems: 'center', background: '#fff',
              }}>
                <button style={{
                  background: 'transparent', color: '#64748b', border: 'none', cursor: 'pointer',
                  padding: 6, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  style={{
                    flex: 1, padding: '10px 16px', borderRadius: 20, border: '1px solid #e2e8f0',
                    outline: 'none', fontSize: 13, background: '#f8fafc',
                  }}
                />
                <button
                  onClick={handleSendChat}
                  style={{
                    background: '#2563eb', color: '#fff', border: 'none', width: 38, height: 38,
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                  }}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── SUPPORT TICKETS TAB ─── */}
        {activeTab === 'tickets' && (
          <>
            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ position: 'relative', width: 220 }}>
                <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
                <input
                  type="text" placeholder="Search tickets..." value={ticketSearch}
                  onChange={(e) => setTicketSearch(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: 99, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, outline: 'none', color: '#0f172a' }}
                />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                  borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  border: '1px solid #e2e8f0', background: '#fff', color: '#64748b',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg> Export CSV
                </button>
                <button
                  onClick={() => setShowTicketModal(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                    borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    border: 'none', background: '#2a73d4', color: '#fff',
                  }}
                >
                  <Plus size={14} /> New Ticket
                </button>
              </div>
            </div>

            {/* Tickets Table */}
            <div style={{
              background: '#fff', borderRadius: 16, padding: '24px 32px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Sl No', 'Ticket ID', 'Subject', 'User', 'Date', 'Priority', 'Status', ''].map((h, i) => (
                      <th key={i} style={{
                        textAlign: i === 7 ? 'center' : 'left',
                        fontSize: 12, fontWeight: 500, color: '#64748b',
                        padding: '8px 12px 8px 0', borderBottom: '1px solid #f1f5f9',
                        textTransform: 'uppercase', whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((t) => {
                    const pc = priorityColors[t.priority];
                    const sc = statusColors[t.status];
                    return (
                      <tr key={t.id}>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#64748b' }}>{t.id}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 12, color: '#475569', background: '#f8fafc', paddingLeft: 6, borderRadius: 4, fontFamily: 'SF Mono, Consolas, monospace' }}>{t.ticketId}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                          <div style={{ fontWeight: 600, color: '#0f172a', fontSize: 13 }}>{t.subject}</div>
                          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{t.preview}</div>
                        </td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                              width: 32, height: 32, borderRadius: '50%', background: '#3b82f6', color: '#fff',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 12, fontWeight: 700, flexShrink: 0,
                            }}>{getInitials(t.user)}</div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: 600, color: '#0f172a', fontSize: 13 }}>{t.user}</span>
                              <span style={{ fontSize: 11, color: '#64748b' }}>{t.userRole}</span>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{t.date}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                            minWidth: 80, textAlign: 'center',
                            background: pc.bg, color: pc.text,
                          }}>{t.priority}</span>
                        </td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                            minWidth: 80, textAlign: 'center',
                            background: sc.bg, color: sc.text,
                          }}>{t.status}</span>
                        </td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                          <button style={{
                            background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe',
                            borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                          }}>View</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Pagination */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #f1f5f9', marginTop: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.05, textTransform: 'uppercase' }}>SHOWING 1-5 OF 24</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: '#f1f5f9', color: '#334155', cursor: 'pointer' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                  </button>
                  {[1, 2, 3].map(p => (
                    <button key={p} style={{
                      width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 8, border: 'none', background: p === 1 ? '#2563eb' : '#f1f5f9',
                      color: p === 1 ? '#fff' : '#334155', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    }}>{p}</button>
                  ))}
                  <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: '#f1f5f9', color: '#334155', cursor: 'pointer' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* New Ticket Modal */}
      {showTicketModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
        }} onClick={() => setShowTicketModal(false)}>
          <div style={{
            background: '#fff', width: 450, maxWidth: '90%', borderRadius: 16,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Create New Ticket</div>
              <button onClick={() => setShowTicketModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4, borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Subject', type: 'input', placeholder: 'Brief description of the issue' },
                { label: 'User', type: 'select', options: ['Select User', 'Nathaniel Jacob (Client)', 'Dr. Sarah Smith (Therapist)', 'Jane Hopper (Client)'] },
                { label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
              ].map((field, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>{field.label}</label>
                  {field.type === 'input' ? (
                    <input type="text" placeholder={field.placeholder} style={{ width: '100%', padding: '9px 11px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
                  ) : (
                    <select style={{ width: '100%', padding: '9px 11px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box', background: '#fff' }}>
                      {field.options?.map((opt, j) => <option key={j}>{opt}</option>)}
                    </select>
                  )}
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Description</label>
                <textarea rows={3} placeholder="Detailed description..." style={{ width: '100%', padding: '9px 11px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
              </div>
            </div>
            <div style={{ padding: '14px 22px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: 10, background: '#fafafa' }}>
              <button onClick={() => setShowTicketModal(false)} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b' }}>Cancel</button>
              <button style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#2a73d4', color: '#fff' }}>Create Ticket</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationsPage;
