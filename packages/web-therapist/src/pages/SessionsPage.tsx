import React, { useState } from 'react';
import TherapistLayout from '../components/TherapistLayout';

const SessionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingSessions = [
    { id: 1, client: 'Priya Sharma', dateTime: 'Jun 13, 2026', time: '10:00 AM', type: 'Video Call', duration: '45 min', status: 'upcoming' },
    { id: 2, client: 'Rahul Nair', dateTime: 'Jun 13, 2026', time: '11:30 AM', type: 'Audio Call', duration: '30 min', status: 'upcoming' },
    { id: 3, client: 'Anjali Krishnan', dateTime: 'Jun 13, 2026', time: '02:00 PM', type: 'Chat', duration: '30 min', status: 'upcoming' },
    { id: 4, client: 'Vikram Das', dateTime: 'Jun 14, 2026', time: '09:00 AM', type: 'Video Call', duration: '60 min', status: 'upcoming' },
    { id: 5, client: 'Meera Patel', dateTime: 'Jun 14, 2026', time: '03:00 PM', type: 'In-Person', duration: '50 min', status: 'upcoming' },
  ];

  const completedSessions = [
    { id: 6, client: 'Karthik Rajan', dateTime: 'Jun 12, 2026', time: '10:00 AM', type: 'Video Call', duration: '45 min', status: 'completed' },
    { id: 7, client: 'Deepa Menon', dateTime: 'Jun 12, 2026', time: '11:30 AM', type: 'Audio Call', duration: '30 min', status: 'completed' },
    { id: 8, client: 'Arjun Pillai', dateTime: 'Jun 11, 2026', time: '03:00 PM', type: 'Video Call', duration: '60 min', status: 'completed' },
    { id: 9, client: 'Lakshmi Iyer', dateTime: 'Jun 11, 2026', time: '05:00 PM', type: 'Chat', duration: '30 min', status: 'completed' },
    { id: 10, client: 'Sanjay Gupta', dateTime: 'Jun 10, 2026', time: '02:00 PM', type: 'In-Person', duration: '50 min', status: 'completed' },
  ];

  const tabs = [
    { key: 'upcoming', label: 'Upcoming', count: upcomingSessions.length },
    { key: 'completed', label: 'Completed', count: completedSessions.length },
  ];

  const sessions = activeTab === 'upcoming' ? upcomingSessions : completedSessions;

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; color: string; dot: string; label: string }> = {
      upcoming: { bg: '#eff6ff', color: '#2563eb', dot: '#2563eb', label: 'Upcoming' },
      completed: { bg: '#f0fdf4', color: '#16a34a', dot: '#22c55e', label: 'Completed' },
    };
    const s = styles[status] || styles.upcoming;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />
        {s.label}
      </span>
    );
  };

  return (
    <TherapistLayout activeNav="sessions" pageTitle="Sessions" headerMascot healiInsight={{ text: "You have 5 upcoming sessions this week. Your 2:00 PM session with Anjali Krishnan is coming up in 30 minutes — don't forget to review her progress notes beforehand!" }}>
      {/* Card Wrapper */}
      <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>All Sessions</h2>
        <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px 0' }}>Manage and track your therapy sessions</p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: '1px solid #e2e8f0' }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: 600,
                color: activeTab === tab.key ? '#2a73d4' : '#64748b',
                border: 'none',
                borderBottom: activeTab === tab.key ? '2px solid #2a73d4' : '2px solid transparent',
                marginBottom: -1,
                background: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
              <span style={{ fontSize: 11, fontWeight: 700, background: activeTab === tab.key ? '#eff6ff' : '#f1f5f9', color: activeTab === tab.key ? '#2a73d4' : '#64748b', padding: '2px 8px', borderRadius: 10 }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 12, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '0 1 320px' }}>
            <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#64748b' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" placeholder="Search sessions..." style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#111111', border: '1px solid #e2e8f0', background: '#ffffff', cursor: 'pointer' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>Client</th>
              <th style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>Date & Time</th>
              <th style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>Type</th>
              <th style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>Duration</th>
              <th style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>Status</th>
              <th style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map(session => (
              <tr key={session.id} style={{ transition: 'background 0.2s' }}>
                <td style={{ padding: '12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img
                      src="/user-profile.jpg"
                      alt={session.client}
                      style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', background: '#e2e8f0', flexShrink: 0 }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{session.client}</span>
                  </div>
                </td>
                <td style={{ padding: '12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>
                  {session.dateTime}<br /><span style={{ fontSize: 12, color: '#94a3b8' }}>{session.time}</span>
                </td>
                <td style={{ padding: '12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>{session.type}</td>
                <td style={{ padding: '12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>{session.duration}</td>
                <td style={{ padding: '12px', fontSize: 13, borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>{getStatusBadge(session.status)}</td>
                <td style={{ padding: '12px', fontSize: 13, borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {activeTab === 'upcoming' ? (
                      <>
                        <button title="Join Session" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, border: '1px solid #e2e8f0', background: '#ffffff', color: '#64748b', cursor: 'pointer' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                        </button>
                        <button title="View Details" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, border: '1px solid #e2e8f0', background: '#ffffff', color: '#64748b', cursor: 'pointer' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                        </button>
                        <button title="Reschedule" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, border: '1px solid #e2e8f0', background: '#ffffff', color: '#64748b', cursor: 'pointer' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <button title="View Summary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, border: '1px solid #e2e8f0', background: '#ffffff', color: '#64748b', cursor: 'pointer' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                        </button>
                        <button title="View Details" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, border: '1px solid #e2e8f0', background: '#ffffff', color: '#64748b', cursor: 'pointer' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                        </button>
                        <button title="Add Notes" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, border: '1px solid #e2e8f0', background: '#ffffff', color: '#64748b', cursor: 'pointer' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 40, borderTop: '1px solid #f1f5f9', marginTop: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>Showing 1–{sessions.length} of {sessions.length} sessions</span>
          <div style={{ display: 'flex', gap: 2 }}>
            <button style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontSize: 12, fontWeight: 600, color: '#475569', border: '1px solid #e2e8f0', background: '#ffffff', cursor: 'pointer' }}>‹</button>
            <button style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontSize: 12, fontWeight: 600, color: '#fff', border: '1px solid #2a73d4', background: '#2a73d4', cursor: 'pointer' }}>1</button>
            <button style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontSize: 12, fontWeight: 600, color: '#475569', border: '1px solid #e2e8f0', background: '#ffffff', cursor: 'pointer' }}>›</button>
          </div>
        </div>
      </div>
    </TherapistLayout>
  );
};

export default SessionsPage;
