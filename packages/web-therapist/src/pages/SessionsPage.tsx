import React, { useState } from 'react';
import TherapistLayout from '../components/TherapistLayout';

const SessionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const sessions = [
    { id: 1, client: 'Priya Sharma', avatar: 'PS', color: '#3b82f6', time: '10:30 AM', date: 'Today', type: 'Video Call', status: 'upcoming' },
    { id: 2, client: 'Rahul Nair', avatar: 'RN', color: '#22c55e', time: '01:00 PM', date: 'Today', type: 'Audio Call', status: 'upcoming' },
    { id: 3, client: 'Anjali Krishnan', avatar: 'AK', color: '#f59e0b', time: '02:00 PM', date: 'Today', type: 'Video Call', status: 'ongoing' },
    { id: 4, client: 'Vikram Das', avatar: 'VD', color: '#8b5cf6', time: '04:30 PM', date: 'Today', type: 'Chat', status: 'upcoming' },
    { id: 5, client: 'Meera Pillai', avatar: 'MP', color: '#ec4899', time: '11:00 AM', date: 'Yesterday', type: 'Video Call', status: 'completed' },
    { id: 6, client: 'Arjun Menon', avatar: 'AM', color: '#14b8a6', time: '03:00 PM', date: 'Yesterday', type: 'Audio Call', status: 'completed' },
  ];

  const tabs = [
    { key: 'upcoming', label: 'Upcoming', count: 4 },
    { key: 'ongoing', label: 'Ongoing', count: 1 },
    { key: 'completed', label: 'Completed', count: 2 },
  ];

  const filteredSessions = sessions.filter(s => s.status === activeTab);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; color: string; dot: string; label: string }> = {
      upcoming: { bg: '#eff6ff', color: '#2563eb', dot: '#2563eb', label: 'Upcoming' },
      ongoing: { bg: '#fffbeb', color: '#d97706', dot: '#f59e0b', label: 'Ongoing' },
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
    <TherapistLayout activeNav="sessions" pageTitle="Sessions" headerMascot healiInsight={{ text: "You have 4 sessions scheduled today. Your next session with Priya Sharma starts in 30 minutes." }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e2e8f0' }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 600,
              color: activeTab === tab.key ? '#2a73d4' : '#64748b',
              borderBottom: activeTab === tab.key ? '2px solid #2a73d4' : '2px solid transparent',
              marginBottom: -1,
              background: 'none',
              border: 'none',
              borderBottomWidth: 2,
              borderBottomStyle: 'solid',
              borderBottomColor: activeTab === tab.key ? '#2a73d4' : 'transparent',
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12, gap: 12, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '0 1 320px' }}>
          <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#64748b' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input type="text" placeholder="Search sessions..." style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#111111', border: '1px solid #e2e8f0', background: '#ffffff', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>Client</th>
              <th style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>Date</th>
              <th style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>Time</th>
              <th style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>Type</th>
              <th style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>Status</th>
              <th style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map(session => (
              <tr key={session.id} style={{ transition: 'background 0.2s' }}>
                <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: session.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{session.avatar}</div>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{session.client}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9' }}>{session.date}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9' }}>{session.time}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9' }}>{session.type}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, borderBottom: '1px solid #f1f5f9' }}>{getStatusBadge(session.status)}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, border: '1px solid #e2e8f0', background: '#ffffff', color: '#64748b', cursor: 'pointer' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    </button>
                    <button style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, border: '1px solid #e2e8f0', background: '#ffffff', color: '#64748b', cursor: 'pointer' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                    </button>
                    <button style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, border: '1px solid #e2e8f0', background: '#ffffff', color: '#64748b', cursor: 'pointer' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 40, borderTop: '1px solid #f1f5f9', marginTop: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>Showing 1-{filteredSessions.length} of {filteredSessions.length} sessions</span>
          <div style={{ display: 'flex', gap: 2 }}>
            {[1, 2, 3].map(p => (
              <button key={p} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontSize: 12, fontWeight: 600, color: p === 1 ? '#fff' : '#475569', border: `1px solid ${p === 1 ? '#2a73d4' : '#e2e8f0'}`, background: p === 1 ? '#2a73d4' : '#ffffff', cursor: 'pointer' }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </TherapistLayout>
  );
};

export default SessionsPage;
