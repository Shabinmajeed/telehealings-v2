import React, { useState } from 'react';
import {
  Search, Download, TrendingUp,
  ArrowUpRight, ArrowDownRight, RefreshCw
} from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  client: string;
  therapist: string;
  amount: number;
  type: 'session' | 'refund' | 'payout';
  status: 'completed' | 'pending' | 'failed';
  method: string;
}

const transactions: Transaction[] = [
  { id: 'TXN-001', date: '25/04/2026', client: 'Ajesh Anand', therapist: 'Dr. Sarah Smith', amount: 2500, type: 'session', status: 'completed', method: 'Card' },
  { id: 'TXN-002', date: '25/04/2026', client: 'Nathaniel Jacob', therapist: 'Dr. Emily Chen', amount: 3000, type: 'session', status: 'completed', method: 'UPI' },
  { id: 'TXN-003', date: '24/04/2026', client: 'Bethany Kay', therapist: 'Dr. Marcus Reed', amount: -500, type: 'refund', status: 'completed', method: 'Card' },
  { id: 'TXN-004', date: '24/04/2026', client: 'Dr. Sarah Smith', therapist: '—', amount: -15000, type: 'payout', status: 'completed', method: 'Bank Transfer' },
  { id: 'TXN-005', date: '23/04/2026', client: 'Nancy Wheeler', therapist: 'Dr. James Wilson', amount: 2500, type: 'session', status: 'pending', method: 'Card' },
  { id: 'TXN-006', date: '23/04/2026', client: 'Victor Martinez', therapist: 'Dr. Emily Chen', amount: 2800, type: 'session', status: 'completed', method: 'UPI' },
  { id: 'TXN-007', date: '22/04/2026', client: 'Jane Hopper', therapist: 'Dr. Robert Kim', amount: 3200, type: 'session', status: 'completed', method: 'Card' },
  { id: 'TXN-008', date: '22/04/2026', client: 'Dr. Emily Chen', therapist: '—', amount: -12000, type: 'payout', status: 'pending', method: 'Bank Transfer' },
];

const statusConfig: Record<string, { bg: string; text: string; border: string }> = {
  completed: { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' },
  pending: { bg: '#fffbeb', text: '#92400e', border: '#fde68a' },
  failed: { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' },
};

const typeLabels: Record<string, string> = {
  session: 'Session Payment',
  refund: 'Refund',
  payout: 'Therapist Payout',
};

const FinancialsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const filtered = transactions.filter(t => {
    const matchesSearch = t.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const totalRevenue = transactions.filter(t => t.type === 'session' && t.status === 'completed').reduce((s, t) => s + t.amount, 0);
  const totalPayouts = Math.abs(transactions.filter(t => t.type === 'payout' && t.status === 'completed').reduce((s, t) => s + t.amount, 0));
  const pendingAmount = transactions.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0);
  const refunds = Math.abs(transactions.filter(t => t.type === 'refund').reduce((s, t) => s + t.amount, 0));

  return (
    <div style={{ padding: '0 32px 16px', overflowY: 'auto', flex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 40 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 40, marginBottom: 12 }}>
          <h1 style={{
            fontSize: 20, fontWeight: 700, color: '#0f172a',
            position: 'relative', padding: '0 0 8px 0',
            borderBottom: '2px solid #e2e8f0', margin: 0,
          }}>
            Financials
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
                <span style={{ fontSize: 11, color: '#1e40af', lineHeight: 1.3, whiteSpace: 'nowrap' }}>Monthly revenue up <strong style={{ fontWeight: 700, color: '#1e3a8a' }}>23%</strong>. Payouts processed: <strong style={{ fontWeight: 700, color: '#1e3a8a' }}>₹27,000</strong>.</span>
              </div>
            </div>
            <img src="/Heali.png" alt="Heali" style={{ height: 32, flexShrink: 0 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { label: 'Total Revenue', value: `₹${(totalRevenue / 1000).toFixed(1)}K`, icon: <TrendingUp size={16} />, change: '+23%', up: true },
            { label: 'Total Payouts', value: `₹${(totalPayouts / 1000).toFixed(1)}K`, icon: <ArrowDownRight size={16} />, change: '+8%', up: true },
            { label: 'Pending', value: `₹${(pendingAmount / 1000).toFixed(1)}K`, icon: <RefreshCw size={16} />, change: '2 items', up: false },
            { label: 'Refunds', value: `₹${(refunds / 1000).toFixed(1)}K`, icon: <ArrowUpRight size={16} />, change: '-5%', up: false },
          ].map((kpi, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 12, padding: '18px 20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{kpi.label}</span>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{kpi.icon}</div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a' }}>{kpi.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4, color: kpi.up ? '#16a34a' : '#dc2626' }}>{kpi.change}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: 220 }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: 99, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, outline: 'none', color: '#0f172a' }}
              />
            </div>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, color: '#0f172a', outline: 'none', background: '#fff', cursor: 'pointer' }}>
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
            borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
            border: '1px solid #e2e8f0', background: '#fff', color: '#64748b',
          }}>
            <Download size={14} /> Export
          </button>
        </div>

        {/* Transactions Table */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '24px 32px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
              <thead>
                <tr>
                  {['Transaction ID', 'Date', 'Client / Therapist', 'Type', 'Amount', 'Status', 'Method'].map((h, i) => (
                    <th key={i} style={{ textAlign: 'left', fontSize: 12, fontWeight: 500, color: '#64748b', padding: '8px 12px', borderBottom: '1px solid #f1f5f9', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((t) => {
                  const sc = statusConfig[t.status];
                  return (
                    <tr key={t.id}>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, fontWeight: 600, color: '#2563eb', fontFamily: 'SF Mono, Fira Code, monospace' }}>{t.id}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{t.date}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>
                        <div>{t.client}</div>
                        {t.therapist !== '—' && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{t.therapist}</div>}
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#64748b' }}>{typeLabels[t.type]}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, fontWeight: 600, color: t.amount < 0 ? '#dc2626' : '#16a34a' }}>
                        {t.amount < 0 ? '-' : ''}₹{Math.abs(t.amount).toLocaleString()}
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, minWidth: 80, textAlign: 'center', background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
                          {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{t.method}</td>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setCurrentPage(p)}
                  style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: p === currentPage ? '#2563eb' : '#f1f5f9', color: p === currentPage ? '#fff' : '#334155', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{p}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: '#f1f5f9', color: '#334155', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialsPage;
