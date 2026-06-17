import React from 'react';
import TherapistLayout from '../components/TherapistLayout';

const EarningsPage: React.FC = () => {
  const transactions = [
    { id: 1, client: 'Priya Sharma', date: 'Jun 12, 2025', session: 'Video Session (60 min)', amount: '₹2,500', status: 'paid' },
    { id: 2, client: 'Rahul Nair', date: 'Jun 11, 2025', session: 'Audio Session (45 min)', amount: '₹1,800', status: 'paid' },
    { id: 3, client: 'Anjali Krishnan', date: 'Jun 11, 2025', session: 'Video Session (60 min)', amount: '₹2,500', status: 'pending' },
    { id: 4, client: 'Vikram Das', date: 'Jun 10, 2025', session: 'Chat Session (30 min)', amount: '₹1,000', status: 'paid' },
    { id: 5, client: 'Meera Pillai', date: 'Jun 9, 2025', session: 'Video Session (90 min)', amount: '₹3,500', status: 'paid' },
  ];

  return (
    <TherapistLayout activeNav="earnings" pageTitle="Earnings" headerMascot healiInsight={{ text: "This month's earnings are ₹48,000 — a 12% increase from last month. You have 2 pending payouts totaling ₹4,300." }}>
      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {[
          { label: 'This Month', value: '₹48,000', sub: '+12%', color: '#22c55e' },
          { label: 'Pending', value: '₹4,300', sub: '2 payouts', color: '#f59e0b' },
          { label: 'Last Month', value: '₹42,800', sub: '56 sessions', color: '#64748b' },
          { label: 'Total Earned', value: '₹3,12,000', sub: 'All time', color: '#2a73d4' },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#ffffff', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginBottom: 8 }}>{stat.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a' }}>{stat.value}</div>
            <div style={{ fontSize: 12, color: stat.color, fontWeight: 600, marginTop: 4 }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div style={{ background: '#ffffff', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: 0 }}>Recent Transactions</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>This Month</button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Client', 'Session', 'Date', 'Amount', 'Status'].map(h => (
                <th key={h} style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.5, padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id}>
                <td style={{ padding: '14px 12px', fontSize: 13, fontWeight: 600, color: '#0f172a', borderBottom: '1px solid #f1f5f9' }}>{tx.client}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9' }}>{tx.session}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, color: '#334155', borderBottom: '1px solid #f1f5f9' }}>{tx.date}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, fontWeight: 600, color: '#0f172a', borderBottom: '1px solid #f1f5f9' }}>{tx.amount}</td>
                <td style={{ padding: '14px 12px', fontSize: 13, borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, ...(tx.status === 'paid' ? { background: '#f0fdf4', color: '#16a34a' } : { background: '#fffbeb', color: '#d97706' }) }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: tx.status === 'paid' ? '#22c55e' : '#f59e0b' }} />
                    {tx.status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, marginTop: 8 }}>
          <span style={{ fontSize: 12, color: '#64748b' }}>Showing 1-{transactions.length} of {transactions.length} transactions</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Total: ₹11,300</span>
        </div>
      </div>
    </TherapistLayout>
  );
};

export default EarningsPage;
