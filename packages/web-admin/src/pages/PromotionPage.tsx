import React, { useState } from 'react';
import {
  Search, Plus, Download, MoreHorizontal, Tag, X
} from 'lucide-react';

interface Promotion {
  code: string;
  discount: string;
  type: string;
  validUntil: string;
  usageCount: number;
  status: 'active' | 'scheduled' | 'expired';
}

const activePromotions: Promotion[] = [
  { code: 'WELCOME20', discount: '20% off', type: 'Percentage', validUntil: '30/04/2026', usageCount: 145, status: 'active' },
  { code: 'FLAT500', discount: '₹500 off', type: 'Fixed', validUntil: '15/05/2026', usageCount: 89, status: 'active' },
  { code: 'SUMMER15', discount: '15% off', type: 'Percentage', validUntil: '31/05/2026', usageCount: 234, status: 'active' },
  { code: 'FREESHIP', discount: 'Free shipping', type: 'Shipping', validUntil: '30/06/2026', usageCount: 67, status: 'active' },
  { code: 'NEWUSER25', discount: '25% off', type: 'Percentage', validUntil: '31/12/2026', usageCount: 312, status: 'active' },
];

const expiredPromotions: Promotion[] = [
  { code: 'WINTER30', discount: '30% off', type: 'Percentage', validUntil: '28/02/2026', usageCount: 456, status: 'expired' },
  { code: 'FLAT200', discount: '₹200 off', type: 'Fixed', validUntil: '15/01/2026', usageCount: 201, status: 'expired' },
  { code: 'SPRING10', discount: '10% off', type: 'Percentage', validUntil: '31/03/2026', usageCount: 178, status: 'expired' },
];

const statusConfig: Record<string, { bg: string; text: string; border: string }> = {
  active: { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' },
  scheduled: { bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe' },
  expired: { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' },
};

const PromotionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'expired'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ code: '', discountType: '', discountValue: '', validUntil: '', usageLimit: '', description: '' });

  const data = activeTab === 'active' ? activePromotions : expiredPromotions;
  const filtered = data.filter(p => p.code.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ padding: '0 32px 16px', overflowY: 'auto', flex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', paddingBottom: 40 }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 40, marginBottom: 12 }}>
          <h1 style={{
            fontSize: 20, fontWeight: 700, color: '#0f172a',
            position: 'relative', padding: '0 0 8px 0',
            borderBottom: '2px solid #e2e8f0', margin: 0,
          }}>
            Promotion & Offers
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
                <span style={{ fontSize: 11, color: '#1e40af', lineHeight: 1.3, whiteSpace: 'nowrap' }}><strong style={{ fontWeight: 700, color: '#1e3a8a' }}>SUMMER15</strong> has the highest usage. Consider extending it.</span>
              </div>
            </div>
            <img src="/Heali.png" alt="Heali" style={{ height: 32, flexShrink: 0 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>

        {/* Page Tabs */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 16, borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
          <button
            onClick={() => setActiveTab('active')}
            style={{
              padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              background: 'none', border: 'none', borderBottom: activeTab === 'active' ? '2px solid #2a73d4' : '2px solid transparent',
              marginBottom: -1, color: activeTab === 'active' ? '#2a73d4' : '#64748b',
            }}
          >Active Promotions</button>
          <button
            onClick={() => setActiveTab('expired')}
            style={{
              padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              background: 'none', border: 'none', borderBottom: activeTab === 'expired' ? '2px solid #2a73d4' : '2px solid transparent',
              marginBottom: -1, color: activeTab === 'expired' ? '#2a73d4' : '#64748b',
            }}
          >Expired/Drafts</button>
        </div>

        {/* Search + Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, maxWidth: 360, position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, width: 16, height: 16, color: '#64748b', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search promotions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '9px 12px 9px 36px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, outline: 'none', color: '#0f172a' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
              borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              border: '1px solid #e2e8f0', background: '#fff', color: '#64748b',
            }}>
              <Download size={14} /> Export CSV
            </button>
            <button
              onClick={() => setShowModal(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: 'none', background: '#2a73d4', color: '#fff',
              }}
            >
              <Plus size={14} /> New Promotion
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '24px 32px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
              <thead>
                <tr>
                  {['Code', 'Discount', 'Type', 'Valid Until', 'Usage Count', 'Status', 'Actions'].map((h, i) => (
                    <th key={i} style={{
                      textAlign: i === 6 ? 'center' : 'left',
                      fontSize: 13, fontWeight: 500, color: '#64748b',
                      padding: '8px 12px 8px 0', borderBottom: '1px solid #f1f5f9',
                      verticalAlign: 'bottom', whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => {
                  const sc = statusConfig[p.status];
                  return (
                    <tr key={p.code}>
                      <td style={{ padding: '14px 12px', borderBottom: '1px solid #f1f5f9', fontFamily: 'SF Mono, Fira Code, monospace', fontWeight: 600, fontSize: 13, color: '#2563eb', background: '#eff6ff', borderRadius: 4, display: 'inline-block', margin: '8px 0' }}>{p.code}</td>
                      <td style={{ padding: '14px 12px', borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: '#0f172a' }}>{p.discount}</td>
                      <td style={{ padding: '14px 12px', borderBottom: '1px solid #f1f5f9', color: '#64748b', fontSize: 13 }}>{p.type}</td>
                      <td style={{ padding: '14px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{p.validUntil}</td>
                      <td style={{ padding: '14px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155', fontWeight: 600 }}>{p.usageCount}</td>
                      <td style={{ padding: '14px 12px', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px',
                          borderRadius: 99, fontSize: 12, fontWeight: 600,
                          background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`,
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: sc.text }} />
                          {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: '14px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                        <button style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: 8, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748b' }}>
                <span>Rows per page:</span>
                <select style={{ padding: '4px 8px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, color: '#0f172a', outline: 'none', background: '#fff' }}>
                  <option value="10">10</option><option value="25">25</option><option value="50">50</option>
                </select>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.05, textTransform: 'uppercase' }}>
                SHOWING 1-{filtered.length} OF {filtered.length}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: '#f1f5f9', color: '#334155', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>1</button>
              <button style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: '#f1f5f9', color: '#334155', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Promotion Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: '#fff', width: 540, maxWidth: '90%', borderRadius: 16,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#eff6ff', color: '#2a73d4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Tag size={14} />
                </div>
                Create New Promotion
              </div>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4, borderRadius: '50%' }}>
                <X size={18} />
              </button>
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Promotion Code</label>
                <input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="e.g. SUMMER20" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Discount Type</label>
                  <select value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff' }}>
                    <option value="">Select type...</option>
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                    <option value="shipping">Free Shipping</option>
                  </select>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Discount Value</label>
                  <input type="text" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: e.target.value })} placeholder="e.g. 20 or 500" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Valid Until</label>
                  <input type="date" value={form.validUntil} onChange={(e) => setForm({ ...form, validUntil: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Usage Limit</label>
                  <input type="number" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: e.target.value })} placeholder="e.g. 100" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the promotion..." rows={3} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: 80 }} />
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: 12, background: '#fafafa' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b' }}>Cancel</button>
              <button style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: '#2a73d4', color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Plus size={14} /> Create Promotion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionPage;
