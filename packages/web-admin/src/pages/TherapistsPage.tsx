import React, { useState, useEffect } from 'react';
import {
  Search, Plus, Eye, XCircle, CheckCircle, X,
  Download
} from 'lucide-react';
import { adminApi, TherapistWithUser } from '@/api/admin-api';

interface Therapist {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialization: string;
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'REJECTED';
  sessionCount: number;
  credentials: string | null;
  experience: number;
  createdAt: string;
}

const statusConfig: Record<string, { bg: string; text: string; border: string; label: string }> = {
  PENDING: { bg: '#fffbeb', text: '#92400e', border: '#fde68a', label: 'Pending' },
  ACTIVE: { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0', label: 'Active' },
  SUSPENDED: { bg: '#fef2f2', text: '#991b1b', border: '#fecaca', label: 'Suspended' },
  REJECTED: { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0', label: 'Rejected' },
};

function getInitials(firstName: string, lastName: string) {
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
}

const TherapistsPage: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchTherapists = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getTherapists({
        page: currentPage,
        limit: rowsPerPage,
        ...(searchQuery && { search: searchQuery }),
      });
      const data = res.data;
      // Map TherapistWithUser to local Therapist interface
      const mapped: Therapist[] = (data.data || []).map((t: TherapistWithUser) => ({
        id: t.id,
        firstName: t.firstName,
        lastName: t.lastName,
        email: t.email,
        specialization: t.TherapistProfile?.specialization?.join(', ') || '',
        status: t.TherapistProfile?.isVerified ? 'ACTIVE' : 'PENDING',
        sessionCount: t.TherapistProfile?.totalSessions || 0,
        credentials: null,
        experience: t.TherapistProfile?.yearsExperience || 0,
        createdAt: (t as any).createdAt || new Date().toISOString(),
      }));
      setTherapists(mapped);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch therapists:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTherapists();
  }, [currentPage, rowsPerPage, statusFilter]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchTherapists();
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setActionLoading(id);
    try {
      await adminApi.updateTherapistStatus(id, newStatus);
      fetchTherapists();
      if (selectedTherapist?.id === id) {
        setSelectedTherapist(prev => prev ? { ...prev, status: newStatus as Therapist['status'] } : null);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));

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
            Therapists
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
                <span style={{ fontSize: 11, color: '#1e40af', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
                  {therapists.filter(t => t.status === 'PENDING').length} therapist(s) pending approval.
                </span>
              </div>
            </div>
            <img src="/Heali.png" alt="Heali" style={{ height: 32, flexShrink: 0 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: 220 }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Search therapists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              <option value="PENDING">Pending</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
              borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              border: '1px solid #e2e8f0', background: '#fff', color: '#64748b',
            }}>
              <Download size={14} /> Export
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
              borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              border: 'none', background: '#2a73d4', color: '#fff',
            }}>
              <Plus size={14} /> Add Therapist
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
                  {['Therapist', 'Specialization', 'Sessions', 'Status', 'Joined', 'Actions'].map((h, i) => (
                    <th key={i} style={{
                      textAlign: i === 5 ? 'center' : 'left',
                      fontSize: 12, fontWeight: 500, color: '#64748b',
                      padding: '8px 12px', borderBottom: '1px solid #f1f5f9',
                      textTransform: 'uppercase', whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Loading therapists...</td></tr>
                ) : therapists.length === 0 ? (
                  <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>No therapists found.</td></tr>
                ) : (
                  therapists.map((t) => {
                    const sc = statusConfig[t.status] || statusConfig.PENDING;
                    return (
                      <tr key={t.id} style={{ transition: 'background 0.2s' }} className="hover-row">
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{
                              width: 36, height: 36, borderRadius: '50%', background: '#3b82f6', color: '#fff',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 12, fontWeight: 700, flexShrink: 0,
                            }}>{getInitials(t.firstName, t.lastName)}</div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontWeight: 600, color: '#0f172a', fontSize: 13 }}>{t.firstName} {t.lastName}</span>
                              <span style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{t.email}</span>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{t.specialization}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155', fontWeight: 600 }}>{t.sessionCount}</td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                            minWidth: 80, textAlign: 'center',
                            background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`,
                          }}>{sc.label}</span>
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#64748b' }}>
                          {new Date(t.createdAt).toLocaleDateString('en-GB')}
                        </td>
                        <td style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                            <button
                              onClick={() => { setSelectedTherapist(t); setShowDetailModal(true); }}
                              style={{
                                background: 'transparent', border: '1px solid #e2e8f0', color: '#0f172a',
                                cursor: 'pointer', padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                                display: 'inline-flex', alignItems: 'center', gap: 2,
                              }}
                            >
                              <Eye size={12} /> View
                            </button>
                            {t.status === 'PENDING' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(t.id, 'ACTIVE')}
                                  disabled={actionLoading === t.id}
                                  title="Approve"
                                  style={{
                                    background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534',
                                    cursor: actionLoading === t.id ? 'not-allowed' : 'pointer', padding: '5px 8px', borderRadius: 6,
                                    display: 'inline-flex', alignItems: 'center', opacity: actionLoading === t.id ? 0.5 : 1,
                                  }}
                                >
                                  <CheckCircle size={14} />
                                </button>
                                <button
                                  onClick={() => handleStatusChange(t.id, 'REJECTED')}
                                  disabled={actionLoading === t.id}
                                  title="Reject"
                                  style={{
                                    background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b',
                                    cursor: actionLoading === t.id ? 'not-allowed' : 'pointer', padding: '5px 8px', borderRadius: 6,
                                    display: 'inline-flex', alignItems: 'center', opacity: actionLoading === t.id ? 0.5 : 1,
                                  }}
                                >
                                  <X size={14} />
                                </button>
                              </>
                            )}
                            {t.status === 'ACTIVE' && (
                              <button
                                onClick={() => handleStatusChange(t.id, 'SUSPENDED')}
                                disabled={actionLoading === t.id}
                                title="Suspend"
                                style={{
                                  background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b',
                                  cursor: actionLoading === t.id ? 'not-allowed' : 'pointer', padding: '5px 8px', borderRadius: 6,
                                  display: 'inline-flex', alignItems: 'center', opacity: actionLoading === t.id ? 0.5 : 1,
                                }}
                              >
                                <XCircle size={14} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: 16, borderTop: '1px solid #f1f5f9', marginTop: 16,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748b' }}>
                <span>Rows per page:</span>
                <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  style={{ padding: '4px 8px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, color: '#0f172a', outline: 'none', background: '#fff' }}>
                  <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
                </select>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.05, textTransform: 'uppercase' }}>
                SHOWING {total > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0}-{Math.min(currentPage * rowsPerPage, total)} OF {total}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: '#f1f5f9', color: '#334155', fontSize: 13, fontWeight: 600, cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setCurrentPage(p)}
                  style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: p === currentPage ? '#2563eb' : '#f1f5f9', color: p === currentPage ? '#fff' : '#334155', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                  {p}
                </button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: 'none', background: '#f1f5f9', color: '#334155', fontSize: 13, fontWeight: 600, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedTherapist && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
        }} onClick={() => setShowDetailModal(false)}>
          <div style={{
            background: '#fff', width: 500, maxWidth: '90%', borderRadius: 16,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Therapist Details</div>
              <button onClick={() => setShowDetailModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4, borderRadius: '50%' }}>
                <XCircle size={18} />
              </button>
            </div>
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%', background: '#3b82f6', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 700, flexShrink: 0,
                }}>{getInitials(selectedTherapist.firstName, selectedTherapist.lastName)}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{selectedTherapist.firstName} {selectedTherapist.lastName}</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>{selectedTherapist.email}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Specialization', value: selectedTherapist.specialization },
                  { label: 'Total Sessions', value: String(selectedTherapist.sessionCount) },
                  { label: 'Experience', value: `${selectedTherapist.experience} years` },
                  { label: 'Credentials', value: selectedTherapist.credentials || 'Not provided' },
                  { label: 'Status', value: statusConfig[selectedTherapist.status]?.label || selectedTherapist.status },
                  { label: 'Joined', value: new Date(selectedTherapist.createdAt).toLocaleDateString('en-GB') },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, paddingBottom: 6, borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#64748b', fontWeight: 500 }}>{row.label}</span>
                    <span style={{ color: '#0f172a', fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>
              {selectedTherapist.status === 'PENDING' && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => { handleStatusChange(selectedTherapist.id, 'ACTIVE'); setShowDetailModal(false); }}
                    style={{
                      flex: 1, padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                      border: 'none', background: '#16a34a', color: '#fff', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }}
                  >
                    <CheckCircle size={14} /> Approve
                  </button>
                  <button
                    onClick={() => { handleStatusChange(selectedTherapist.id, 'REJECTED'); setShowDetailModal(false); }}
                    style={{
                      flex: 1, padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                      border: '1px solid #fecaca', background: '#fef2f2', color: '#991b1b', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    }}
                  >
                    <X size={14} /> Reject
                  </button>
                </div>
              )}
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: 12, background: '#fafafa' }}>
              <button onClick={() => setShowDetailModal(false)} style={{
                padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: '1px solid #e2e8f0', background: '#fff', color: '#64748b',
              }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TherapistsPage;
