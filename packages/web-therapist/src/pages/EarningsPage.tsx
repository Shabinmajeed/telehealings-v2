import React from 'react';
import TherapistLayout from '../components/TherapistLayout';

const EarningsPage: React.FC = () => {
  const transactions = [
    { id: 1, date: 'Jun 10, 2026', type: 'session', typeLabel: 'Session', amount: '+₹2,500', amountColor: '#16a34a', status: 'paid' },
    { id: 2, date: 'Jun 08, 2026', type: 'session', typeLabel: 'Session', amount: '+₹2,300', amountColor: '#16a34a', status: 'paid' },
    { id: 3, date: 'Jun 05, 2026', type: 'bonus', typeLabel: 'Bonus', amount: '+₹5,000', amountColor: '#16a34a', status: 'processing' },
    { id: 4, date: 'Jun 03, 2026', type: 'session', typeLabel: 'Session', amount: '+₹2,300', amountColor: '#16a34a', status: 'pending' },
    { id: 5, date: 'May 28, 2026', type: 'refund', typeLabel: 'Refund', amount: '-₹1,500', amountColor: '#dc2626', status: 'paid' },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; color: string; dot: string }> = {
      paid: { bg: '#f0fdf4', color: '#16a34a', dot: '#22c55e' },
      pending: { bg: '#fffbeb', color: '#d97706', dot: '#f59e0b' },
      processing: { bg: '#eff6ff', color: '#2563eb', dot: '#3b82f6' },
    };
    const s = styles[status] || styles.paid;
    return (
      <span className="status-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, { bg: string; color: string; path: string }> = {
      session: {
        bg: '#eff6ff',
        color: '#2563eb',
        path: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
      },
      bonus: {
        bg: '#f0fdf4',
        color: '#16a34a',
        path: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7',
      },
      refund: {
        bg: '#fef2f2',
        color: '#dc2626',
        path: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6',
      },
    };
    const icon = icons[type] || icons.session;
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 24, height: 24, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: icon.bg, color: icon.color }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d={icon.path} />
          </svg>
        </span>
        {type === 'session' ? 'Session' : type === 'bonus' ? 'Bonus' : 'Refund'}
      </span>
    );
  };

  const handleExportCsv = () => {
    let csv = 'Date,Type,Amount,Status\n';
    transactions.forEach(tx => {
      csv += `${tx.date},${tx.typeLabel},${tx.amount.replace(/[₹,]/g, '')},${tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'earnings_transactions.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <TherapistLayout
      activeNav="earnings"
      pageTitle="Earnings"
      headerMascot
      healiInsight={{ text: "Your earnings are up 12% this month! Keep up the great work — your clients value your dedication." }}
    >
      {/* KPI Grid */}
      <div className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {/* This Month */}
        <div className="kpi-card" style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
          <div className="kpi-top" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
            <div className="kpi-icon blue" style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', background: '#3b82f6' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="kpi-value" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>₹48,000</div>
          <div className="kpi-label" style={{ fontSize: 12, color: '#475569', width: '60%', lineHeight: 1.2 }}>This Month</div>
          <div className="kpi-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} />
        </div>

        {/* Pending */}
        <div className="kpi-card" style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
          <div className="kpi-top" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
            <div className="kpi-icon amber" style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', background: '#f59e0b' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="kpi-value" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>₹4,300</div>
          <div className="kpi-label" style={{ fontSize: 12, color: '#475569', width: '60%', lineHeight: 1.2 }}>Pending</div>
          <div className="kpi-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} />
        </div>

        {/* Last Month */}
        <div className="kpi-card" style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
          <div className="kpi-top" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
            <div className="kpi-icon green" style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', background: '#22c55e' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="kpi-value" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>₹42,800</div>
          <div className="kpi-label" style={{ fontSize: 12, color: '#475569', width: '60%', lineHeight: 1.2 }}>Last Month</div>
          <div className="kpi-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} />
        </div>

        {/* Total Earned */}
        <div className="kpi-card" style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', background: '#ffffff' }}>
          <div className="kpi-top" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
            <div className="kpi-icon purple" style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', background: '#8b5cf6' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="kpi-value" style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>₹3,12,000</div>
          <div className="kpi-label" style={{ fontSize: 12, color: '#475569', width: '60%', lineHeight: 1.2 }}>Total Earned</div>
          <div className="kpi-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} />
        </div>
      </div>

      {/* Two Column Row: Chart + Transactions */}
      <div className="two-col-row" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 16 }}>
        {/* Left: Revenue Chart Card */}
        <div className="card" style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
          <h3 className="card-title" style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>Earnings Overview</h3>
          <p className="card-subtitle" style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px 0' }}>Monthly income trend for the last 6 months</p>
          <div className="chart-placeholder" style={{ flex: 1, minHeight: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderRadius: 12, border: '1.5px solid #e2e8f0', gap: 12 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
              <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <span style={{ fontSize: 14, color: '#64748b', fontWeight: 500 }}>Earnings Chart</span>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>Chart visualization will appear here</span>
          </div>
          <div className="chart-legend" style={{ display: 'flex', gap: 20, marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3b82f6' }} />
              Income
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
              Pending
            </div>
          </div>
        </div>

        {/* Right: Payout Summary / Recent Transactions Card */}
        <div className="card" style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
          <h3 className="card-title" style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 4px 0' }}>Recent Transactions</h3>
          <p className="card-subtitle" style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px 0' }}>Latest payment activity</p>

          <div className="table-toolbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: 12 }}>
            <button className="btn-export" onClick={handleExportCsv} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#111111', border: '1px solid #e2e8f0', background: '#ffffff', transition: 'all 0.2s', cursor: 'pointer', fontFamily: 'inherit' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV
            </button>
          </div>

          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Date', 'Type', 'Amount', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} style={{ transition: 'background 0.15s' }}>
                  <td style={{ padding: 12, fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>{tx.date}</td>
                  <td style={{ padding: 12, fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>
                    {getTypeIcon(tx.type)}
                  </td>
                  <td style={{ padding: 12, fontSize: 13, fontWeight: 600, color: tx.amountColor, borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>{tx.amount}</td>
                  <td style={{ padding: 12, fontSize: 13, borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' }}>
                    {getStatusBadge(tx.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .kpi-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.06); }
        .btn-export:hover { background: #f8fafc !important; border-color: #94a3b8 !important; }
        .data-table tbody tr:hover td { background: #f8fafc; }
        @media (max-width: 1024px) {
          .kpi-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .two-col-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </TherapistLayout>
  );
};

export default EarningsPage;
