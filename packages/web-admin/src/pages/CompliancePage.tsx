import React, { useState } from 'react';
import {
  Search, Download, Eye,
  Shield, FileText, X
} from 'lucide-react';

interface ComplianceRecord {
  id: number;
  name: string;
  license: string;
  bgCheck: string;
  insurance: string;
  nextVerify: string;
  avatar: string;
}

const complianceData: ComplianceRecord[] = [
  { id: 1, name: 'Dr. Sarah Smith', license: 'Pending', bgCheck: 'Verified', insurance: 'Verified', nextVerify: '24/05/2026', avatar: '' },
  { id: 2, name: 'Dr. Ethan Hunt', license: 'Verified', bgCheck: 'Pending', insurance: 'Expired', nextVerify: 'Action Required', avatar: '' },
  { id: 3, name: 'Dr. Olivia Wilde', license: 'Missing', bgCheck: 'Missing', insurance: 'Pending', nextVerify: 'Action Required', avatar: '' },
  { id: 4, name: 'Dr. Ajesh Anand', license: 'Verified', bgCheck: 'Verified', insurance: 'Verified', nextVerify: '15/11/2026', avatar: '' },
  { id: 5, name: 'Dr. Emily Chen', license: 'Verified', bgCheck: 'Verified', insurance: 'Verified', nextVerify: '02/09/2026', avatar: '' },
  { id: 6, name: 'Dr. Marcus Reed', license: 'Verified', bgCheck: 'Verified', insurance: 'Verified', nextVerify: '18/12/2026', avatar: '' },
];

const badgeConfig: Record<string, { bg: string; text: string; border: string; label: string }> = {
  Verified: { bg: '#dcfce7', text: '#166534', border: '#bbf7d0', label: 'Verified' },
  'Pending Review': { bg: '#fef9c3', text: '#854d0e', border: '#fef08a', label: 'Pending Review' },
  Expired: { bg: '#fee2e2', text: '#991b1b', border: '#fecaca', label: 'Expired' },
  Missing: { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0', label: 'Missing' },
  Pending: { bg: '#fef9c3', text: '#854d0e', border: '#fef08a', label: 'Pending Review' },
};

function getBadge(status: string) {
  const config = badgeConfig[status] || badgeConfig['Missing'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
      minWidth: 80, textAlign: 'center',
      background: config.bg, color: config.text, border: `1px solid ${config.border}`,
    }}>{config.label}</span>
  );
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

const CompliancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'all' | 'expiring'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ComplianceRecord | null>(null);

  const pendingRecords = complianceData.filter(r =>
    r.license === 'Pending' || r.bgCheck === 'Pending' || r.insurance === 'Pending' ||
    r.license === 'Missing' || r.bgCheck === 'Missing' || r.insurance === 'Expired'
  );

  const displayData = activeTab === 'pending' ? pendingRecords : complianceData;
  const filtered = displayData.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));

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
            Compliance & Verification
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
                <span style={{ fontSize: 11, color: '#1e40af', lineHeight: 1.3, whiteSpace: 'nowrap' }}>3 therapists need document review. <strong style={{ fontWeight: 700, color: '#1e3a8a' }}>Dr. Olivia Wilde</strong> has 2 missing docs.</span>
              </div>
            </div>
            <img src="/Heali.png" alt="Heali" style={{ height: 32, flexShrink: 0 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid #e2e8f0', marginBottom: 12 }}>
          <button
            onClick={() => setActiveTab('pending')}
            style={{
              background: 'transparent', border: 'none', padding: '10px 4px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', position: 'relative', color: activeTab === 'pending' ? '#2a73d4' : '#64748b',
            }}
          >
            Pending Reviews
            <span style={{ background: '#ef4444', color: '#fff', borderRadius: 99, padding: '1px 5px', fontSize: 10, fontWeight: 700, marginLeft: 4 }}>3</span>
            {activeTab === 'pending' && <span style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: '#2a73d4', borderRadius: '2px 2px 0 0' }} />}
          </button>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              background: 'transparent', border: 'none', padding: '10px 4px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', position: 'relative', color: activeTab === 'all' ? '#2a73d4' : '#64748b',
            }}
          >All Records
            {activeTab === 'all' && <span style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: '#2a73d4', borderRadius: '2px 2px 0 0' }} />}
          </button>
          <button
            onClick={() => setActiveTab('expiring')}
            style={{
              background: 'transparent', border: 'none', padding: '10px 4px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', position: 'relative', color: activeTab === 'expiring' ? '#2a73d4' : '#64748b',
            }}
          >Expiring Soon
            {activeTab === 'expiring' && <span style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 2, background: '#2a73d4', borderRadius: '2px 2px 0 0' }} />}
          </button>
        </div>

        {activeTab !== 'expiring' && (
          <>
            {/* Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ position: 'relative', width: 220 }}>
                <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
                <input
                  type="text" placeholder="Search therapists..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px 8px 34px', borderRadius: 99, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, outline: 'none', color: '#0f172a' }}
                />
              </div>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: 'none', background: '#2a73d4', color: '#fff',
              }}>
                <Download size={14} /> Export Report
              </button>
            </div>

            {/* Table */}
            <div style={{
              background: '#fff', borderRadius: 16, padding: '24px 32px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
                  <thead>
                    <tr>
                      {['Therapist', 'Clinical License', 'Background Check', 'Indemnity Ins.', 'Next Verification', 'Action'].map((h, i) => (
                        <th key={i} style={{
                          textAlign: i === 5 ? 'right' : 'left',
                          fontSize: 12, fontWeight: 500, color: '#64748b',
                          padding: '8px 12px', borderBottom: '1px solid #f1f5f9',
                          textTransform: 'uppercase', whiteSpace: 'nowrap',
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r) => (
                      <tr key={r.id}>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                              width: 32, height: 32, borderRadius: '50%', background: '#3b82f6', color: '#fff',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 12, fontWeight: 700, flexShrink: 0,
                            }}>{getInitials(r.name)}</div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: 600, color: '#0f172a', fontSize: 13 }}>{r.name}</span>
                              <span style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>ID: T-100{r.id}</span>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{getBadge(r.license)}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{getBadge(r.bgCheck)}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9' }}>{getBadge(r.insurance)}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: r.nextVerify.includes('Required') ? '#dc2626' : '#475569', fontWeight: r.nextVerify.includes('Required') ? 600 : 400 }}>{r.nextVerify}</td>
                        <td style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'right' }}>
                          <button
                            onClick={() => { setSelectedRecord(r); setShowReviewModal(true); }}
                            style={{
                              background: 'transparent', border: '1px solid #e2e8f0', color: '#0f172a',
                              cursor: 'pointer', padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                              display: 'inline-flex', alignItems: 'center', gap: 2,
                            }}
                          >
                            <Eye size={12} /> Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {activeTab === 'all' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #f1f5f9', marginTop: 16 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.05, textTransform: 'uppercase' }}>SHOWING 1-6 OF 24</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[1, 2, 3].map(p => (
                      <button key={p} style={{
                        width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderRadius: 8, border: 'none', background: p === 1 ? '#2563eb' : '#f1f5f9',
                        color: p === 1 ? '#fff' : '#334155', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      }}>{p}</button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'expiring' && (
          <div style={{
            background: '#fff', borderRadius: 16, padding: 40,
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            textAlign: 'center',
          }}>
            <Shield size={48} style={{ color: '#cbd5e1', marginBottom: 12 }} />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>All Clear</h3>
            <p style={{ fontSize: 13, color: '#64748b' }}>No documents expiring within the next 30 days.</p>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedRecord && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
        }} onClick={() => setShowReviewModal(false)}>
          <div style={{
            background: '#fff', width: 600, maxWidth: '90%', borderRadius: 16,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileText size={20} /> Document Review
              </div>
              <button onClick={() => setShowReviewModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4, borderRadius: '50%' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Therapist Info */}
              <div style={{
                background: '#f8fafc', padding: 10, borderRadius: 8, border: '1px solid #e2e8f0',
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', background: '#3b82f6', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, flexShrink: 0,
                }}>{getInitials(selectedRecord.name)}</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{selectedRecord.name}</span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Therapist ID: T-100{selectedRecord.id}</span>
                </div>
              </div>

              {/* Document Meta */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { label: 'Document Type', value: 'Clinical License Renewal', color: '#2563eb' },
                  { label: 'Submitted On', value: '25/04/2026, 09:14 AM', color: '#0f172a' },
                  { label: 'Issuing Authority', value: 'National Board of Psychology', color: '#0f172a' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingBottom: 6, borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b', fontWeight: 500 }}>{row.label}</span>
                    <span style={{ color: row.color, fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Document Preview */}
              <div style={{
                background: '#f1f5f9', border: '1px dashed #cbd5e1', borderRadius: 10, height: 160,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                color: '#64748b', gap: 10,
              }}>
                <FileText size={40} style={{ color: '#94a3b8' }} />
                <span style={{ fontWeight: 500, fontSize: 13, color: '#475569' }}>Clinical_License_2026.pdf</span>
                <button style={{
                  padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  border: '1px solid #e2e8f0', background: '#fff', color: '#64748b',
                }}>Download to View</button>
              </div>
            </div>
            <div style={{ padding: '14px 22px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', background: '#fafafa', alignItems: 'center' }}>
              <button style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: '1px solid #fca5a5', background: '#fff', color: '#dc2626',
              }}>Reject Document</button>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setShowReviewModal(false)} style={{
                  padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  border: '1px solid #e2e8f0', background: '#fff', color: '#64748b',
                }}>Cancel</button>
                <button style={{
                  padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  border: 'none', background: '#16a34a', color: '#fff',
                }}>Approve & Verify</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompliancePage;
