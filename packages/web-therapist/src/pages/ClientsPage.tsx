import React, { useState } from 'react';
import TherapistLayout from '../components/TherapistLayout';

const ClientsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  const clients = [
    { id: 1, name: 'Priya Sharma', avatar: 'PS', color: '#3b82f6', email: 'priya@email.com', sessions: 12, lastSession: 'Today', status: 'active' },
    { id: 2, name: 'Rahul Nair', avatar: 'RN', color: '#22c55e', email: 'rahul@email.com', sessions: 8, lastSession: 'Yesterday', status: 'active' },
    { id: 3, name: 'Anjali Krishnan', avatar: 'AK', color: '#f59e0b', email: 'anjali@email.com', sessions: 5, lastSession: '2 days ago', status: 'active' },
    { id: 4, name: 'Vikram Das', avatar: 'VD', color: '#8b5cf6', email: 'vikram@email.com', sessions: 3, lastSession: '1 week ago', status: 'inactive' },
    { id: 5, name: 'Meera Pillai', avatar: 'MP', color: '#ec4899', email: 'meera@email.com', sessions: 15, lastSession: 'Today', status: 'active' },
    { id: 6, name: 'Arjun Menon', avatar: 'AM', color: '#14b8a6', email: 'arjun@email.com', sessions: 7, lastSession: '3 days ago', status: 'inactive' },
  ];

  const tabs = [
    { key: 'all', label: 'All Clients', count: 6 },
    { key: 'active', label: 'Active', count: 4 },
    { key: 'inactive', label: 'Inactive', count: 2 },
  ];

  const filteredClients = activeTab === 'all' ? clients : clients.filter(c => c.status === activeTab);

  return (
    <TherapistLayout activeNav="clients" pageTitle="My Clients" headerMascot healiInsight={{ text: "4 of your 6 clients have sessions scheduled this week. Meera Pillai has completed 15 sessions — consider a progress review." }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e2e8f0' }}>
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: '10px 20px', fontSize: 14, fontWeight: 600, color: activeTab === tab.key ? '#2a73d4' : '#64748b', border: 'none', borderBottom: activeTab === tab.key ? '2px solid #2a73d4' : '2px solid transparent', marginBottom: -1, background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            {tab.label}
            <span style={{ fontSize: 11, fontWeight: 700, background: activeTab === tab.key ? '#eff6ff' : '#f1f5f9', color: activeTab === tab.key ? '#2a73d4' : '#64748b', padding: '2px 8px', borderRadius: 10 }}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12, gap: 12, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '0 1 320px' }}>
          <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#64748b' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input type="text" placeholder="Search clients..." style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Client', 'Email', 'Sessions', 'Last Session', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id}>
                <td style={{ padding: '14px 12px', fontSize: 13, borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: client.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{client.avatar}</div>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{client.name}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9' }}>{client.email}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9' }}>{client.sessions}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9' }}>{client.lastSession}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, ...(client.status === 'active' ? { background: '#f0fdf4', color: '#16a34a' } : { background: '#f1f5f9', color: '#64748b' }) }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: client.status === 'active' ? '#22c55e' : '#94a3b8' }} />
                    {client.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '14px 12px', fontSize: 13, borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {[
                      { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> },
                      { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
                      { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg> },
                    ].map((btn, i) => (
                      <button key={i} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: 6, border: '1px solid #e2e8f0', background: '#ffffff', color: '#64748b', cursor: 'pointer' }}>{btn.icon}</button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 40, borderTop: '1px solid #f1f5f9', marginTop: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>Showing 1-{filteredClients.length} of {filteredClients.length} clients</span>
          <div style={{ display: 'flex', gap: 2 }}>
            {[1, 2].map(p => (
              <button key={p} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, fontSize: 12, fontWeight: 600, color: p === 1 ? '#fff' : '#475569', border: `1px solid ${p === 1 ? '#2a73d4' : '#e2e8f0'}`, background: p === 1 ? '#2a73d4' : '#ffffff', cursor: 'pointer' }}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </TherapistLayout>
  );
};

export default ClientsPage;
