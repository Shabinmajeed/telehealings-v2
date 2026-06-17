import React, { useState } from 'react';
import TherapistLayout from '../components/TherapistLayout';

const ClientsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const clients = [
    { id: 1, name: 'Priya Sharma', email: 'priya@email.com', sessions: 12, lastSession: 'Today', status: 'active' },
    { id: 2, name: 'Rahul Nair', email: 'rahul@email.com', sessions: 8, lastSession: 'Yesterday', status: 'active' },
    { id: 3, name: 'Anjali Krishnan', email: 'anjali@email.com', sessions: 5, lastSession: '2 days ago', status: 'active' },
    { id: 4, name: 'Vikram Das', email: 'vikram@email.com', sessions: 3, lastSession: '1 week ago', status: 'inactive' },
    { id: 5, name: 'Meera Pillai', email: 'meera@email.com', sessions: 15, lastSession: 'Today', status: 'active' },
    { id: 6, name: 'Arjun Menon', email: 'arjun@email.com', sessions: 7, lastSession: '3 days ago', status: 'inactive' },
  ];

  const tabs = [
    { key: 'all', label: 'All Clients', count: 6 },
    { key: 'active', label: 'Active', count: 4 },
    { key: 'inactive', label: 'Inactive', count: 2 },
  ];

  const filteredClients = (activeTab === 'all' ? clients : clients.filter(c => c.status === activeTab))
    .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalPages = Math.max(1, Math.ceil(filteredClients.length / perPage));
  const paginatedClients = filteredClients.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Sessions', 'Last Session', 'Status'];
    const rows = filteredClients.map(c => [c.name, c.email, c.sessions, c.lastSession, c.status]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clients.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <TherapistLayout
      activeNav="clients"
      pageTitle="My Clients"
      headerMascot
      healiInsight={{ text: "4 of your 6 clients have sessions scheduled this week. Meera Pillai has completed 15 sessions — consider a progress review." }}
    >
      {/* Card Wrapper */}
      <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
        {/* Card Header */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>All Clients</h2>
          <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Manage your client relationships</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e2e8f0' }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setCurrentPage(1); }}
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
              }}
            >
              {tab.label}
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                background: activeTab === tab.key ? '#eff6ff' : '#f1f5f9',
                color: activeTab === tab.key ? '#2a73d4' : '#64748b',
                padding: '2px 8px',
                borderRadius: 10,
              }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Table Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12, gap: 12, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '0 1 320px' }}>
            <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#64748b' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search clients..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              style={{
                width: '100%',
                padding: '10px 12px 10px 38px',
                borderRadius: 8,
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                fontSize: 13,
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleExportCSV}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 16px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: '#111111',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#94a3b8'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Client', 'Email', 'Sessions', 'Last Session', 'Status', 'Actions'].map(h => (
                <th
                  key={h}
                  style={{
                    textAlign: 'left',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    padding: '10px 12px',
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedClients.map(client => (
              <tr key={client.id} style={{ transition: 'background 0.15s' }}>
                <td style={{ padding: '14px 12px', fontSize: 13, borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img
                      src="/user-profile.jpg"
                      alt={client.name}
                      style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', background: '#e2e8f0', flexShrink: 0 }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e2e8f0', display: 'none', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#64748b', flexShrink: 0 }}>
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{client.name}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9' }}>{client.email}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9' }}>{client.sessions}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9' }}>{client.lastSession}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, borderBottom: '1px solid #f1f5f9' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      padding: '3px 10px',
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                      ...(client.status === 'active'
                        ? { background: '#f0fdf4', color: '#16a34a' }
                        : { background: '#f1f5f9', color: '#64748b' }),
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: client.status === 'active' ? '#22c55e' : '#94a3b8' }} />
                    {client.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '14px 12px', fontSize: 13, borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {/* View (eye) */}
                    <button
                      title="View"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        border: '1px solid #e2e8f0',
                        background: '#ffffff',
                        color: '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.borderColor = '#93c5fd'; e.currentTarget.style.color = '#2a73d4'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                    {/* Message (chat) */}
                    <button
                      title="Message"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        border: '1px solid #e2e8f0',
                        background: '#ffffff',
                        color: '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#94a3b8'; e.currentTarget.style.color = '#111111'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </button>
                    {/* More (dots) */}
                    <button
                      title="More"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 30,
                        height: 30,
                        borderRadius: 6,
                        border: '1px solid #e2e8f0',
                        background: '#ffffff',
                        color: '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#94a3b8'; e.currentTarget.style.color = '#111111'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedClients.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: '40px 12px', textAlign: 'center', fontSize: 13, color: '#94a3b8' }}>
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 40, borderTop: '1px solid #f1f5f9', marginTop: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>
            Showing {filteredClients.length === 0 ? 0 : (currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filteredClients.length)} of {filteredClients.length} clients
          </span>
          <div style={{ display: 'flex', gap: 2 }}>
            {/* Previous */}
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              style={{
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                color: currentPage === 1 ? '#cbd5e1' : '#475569',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                cursor: currentPage === 1 ? 'default' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                style={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: p === currentPage ? '#fff' : '#475569',
                  border: `1px solid ${p === currentPage ? '#2a73d4' : '#e2e8f0'}`,
                  background: p === currentPage ? '#2a73d4' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {p}
              </button>
            ))}
            {/* Next */}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              style={{
                width: 30,
                height: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                color: currentPage === totalPages ? '#cbd5e1' : '#475569',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                cursor: currentPage === totalPages ? 'default' : 'pointer',
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </TherapistLayout>
  );
};

export default ClientsPage;
