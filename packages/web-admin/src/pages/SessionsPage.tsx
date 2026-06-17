import React, { useState } from 'react';
import {
  Search, Plus, ChevronLeft, ChevronRight, MoreHorizontal
} from 'lucide-react';

interface Session {
  id: number;
  clientName: string;
  therapistName: string;
  date: string;
  time: string;
  duration: string;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  notes: string;
}

const sessionsData: Session[] = [
  { id: 1, clientName: 'Ajesh Anand', therapistName: 'Dr. Sarah Smith', date: '25/04/2026', time: '10:00 AM', duration: '50 min', type: 'Video Call', status: 'confirmed', notes: 'Follow-up on anxiety management' },
  { id: 2, clientName: 'Nathaniel Jacob', therapistName: 'Dr. Emily Chen', date: '25/04/2026', time: '11:30 AM', duration: '50 min', type: 'Video Call', status: 'confirmed', notes: 'Relationship counseling session 3' },
  { id: 3, clientName: 'Bethany Kay', therapistName: 'Dr. Marcus Reed', date: '25/04/2026', time: '02:00 PM', duration: '60 min', type: 'In-Person', status: 'pending', notes: 'Initial trauma assessment' },
  { id: 4, clientName: 'Nancy Wheeler', therapistName: 'Dr. Sarah Smith', date: '26/04/2026', time: '09:00 AM', duration: '50 min', type: 'Video Call', status: 'confirmed', notes: 'Weekly check-in' },
  { id: 5, clientName: 'Victor Martinez', therapistName: 'Dr. James Wilson', date: '26/04/2026', time: '11:00 AM', duration: '50 min', type: 'Phone', status: 'confirmed', notes: 'Addiction counseling session 5' },
  { id: 6, clientName: 'Jane Hopper', therapistName: 'Dr. Emily Chen', date: '26/04/2026', time: '03:00 PM', duration: '50 min', type: 'Video Call', status: 'cancelled', notes: 'Client requested reschedule' },
  { id: 7, clientName: 'Max Mayfield', therapistName: 'Dr. Lisa Park', date: '27/04/2026', time: '10:00 AM', duration: '50 min', type: 'Video Call', status: 'pending', notes: 'CBT session 2' },
  { id: 8, clientName: 'Will Byers', therapistName: 'Dr. Robert Kim', date: '27/04/2026', time: '01:00 PM', duration: '90 min', type: 'In-Person', status: 'confirmed', notes: 'Family therapy session' },
];

const statusConfig: Record<string, { bg: string; text: string; border: string; label: string }> = {
  confirmed: { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0', label: 'Confirmed' },
  pending: { bg: '#fffbeb', text: '#92400e', border: '#fde68a', label: 'Pending' },
  cancelled: { bg: '#fef2f2', text: '#991b1b', border: '#fecaca', label: 'Cancelled' },
  completed: { bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe', label: 'Completed' },
};

const SessionsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const filtered = sessionsData.filter(s => {
    const matchesSearch = s.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.therapistName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div style={{ padding: '0 32px 16px', overflowY: 'auto', flex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 40 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 40, marginBottom: 12 }}>
          <h1 style={{
            fontSize: 20, fontWeight: 700, color: '#0f172a',
            position: 'relative', padding: '0 0 8px 0',
            borderBottom: '2px solid #e2e8f0', margin: 0,
          }}>
            Sessions & Schedule
            <span style={{
              position: 'absolute', bottom: -2, left: 0, right: 0,
              height: 3, background: '#0f172a', borderRadius: '2px 2px 0 0',
            }} />
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
                <span style={{ fontSize: 11, color: '#1e40af', lineHeight: 1.3, whiteSpace: 'noopener' }}>5 sessions scheduled today. <strong style={{ fontWeight: 700, color: '#1e3a8a' }}>2 pending</strong> confirmation.</span>
              </div>
            </div>
            <img src="/Heali.png" alt="Heali" style={{ height: 32, flexShrink: 0 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>

        {/* View Toggle + Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #e2e8f0' }}>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                background: 'none', border: 'none', borderBottom: viewMode === 'list' ? '2px solid #2a73d4' : '2px solid transparent',
                marginBottom: -1, color: viewMode === 'list' ? '#2a73d4' : '#64748b',
              }}
            >List View</button>
            <button
              onClick={() => setViewMode('calendar')}
              style={{
                padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                background: 'none', border: 'none', borderBottom: viewMode === 'calendar' ? '2px solid #2a73d4' : '2px solid transparent',
                marginBottom: -1, color: viewMode === 'calendar' ? '#2a73d4' : '#64748b',
              }}
            >Calendar View</button>
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: 220 }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{
                  width: '100%', padding: '8px 12px 8px 34px', borderRadius: 99,
                  border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, outline: 'none', color: '#0f172a',
                }}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, color: '#0f172a', outline: 'none', background: '#fff', cursor: 'pointer' }}
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
            borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            border: 'none', background: '#2a73d4', color: '#fff',
          }}>
            <Plus size={14} /> Schedule Session
          </button>
        </div>

        {viewMode === 'list' ? (
          /* List View Table */
          <div style={{
            background: '#fff', borderRadius: 16, padding: '24px 32px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
                <thead>
                  <tr>
                    {['Client', 'Therapist', 'Date & Time', 'Duration', 'Type', 'Status', 'Actions'].map((h, i) => (
                      <th key={i} style={{
                        textAlign: i === 6 ? 'center' : 'left',
                        fontSize: 12, fontWeight: 500, color: '#64748b',
                        padding: '8px 12px', borderBottom: '1px solid #f1f5f9',
                        textTransform: 'uppercase', whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((s) => {
                    const sc = statusConfig[s.status];
                    return (
                      <tr key={s.id} style={{ transition: 'background 0.2s' }}>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{s.clientName}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{s.therapistName}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>
                          <div>{s.date}</div>
                          <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{s.time}</div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{s.duration}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{s.type}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                            minWidth: 80, textAlign: 'center',
                            background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`,
                          }}>{sc.label}</span>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                          <button style={{
                            background: 'transparent', border: 'none', color: '#64748b',
                            cursor: 'pointer', padding: 8, borderRadius: '50%',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <MoreHorizontal size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #f1f5f9', marginTop: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.05, textTransform: 'uppercase' }}>
                SHOWING {filtered.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0}-{Math.min(currentPage * rowsPerPage, filtered.length)} OF {filtered.length}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: '#f1f5f9', color: '#334155', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}>
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setCurrentPage(p)}
                    style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: p === currentPage ? '#2563eb' : '#f1f5f9', color: p === currentPage ? '#fff' : '#334155', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: '#f1f5f9', color: '#334155', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Calendar View */
          <div style={{
            background: '#fff', borderRadius: 16, padding: 24,
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} style={{ padding: '8px 4px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>{d}</div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const dayNum = i - 5;
                const isValid = dayNum > 0 && dayNum <= 30;
                const hasSession = [24, 25, 26, 27, 28].includes(dayNum);
                return (
                  <div key={i} style={{
                    minHeight: 80, padding: 4, border: '1px solid #f1f5f9',
                    background: hasSession ? '#eff6ff' : isValid ? '#fff' : '#fafafa',
                    opacity: isValid ? 1 : 0.4,
                  }}>
                    {isValid && (
                      <>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>{dayNum}</div>
                        {hasSession && (
                          <div style={{ fontSize: 9, padding: '1px 4px', borderRadius: 3, background: '#2563eb', color: '#fff', marginBottom: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Session
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionsPage;
