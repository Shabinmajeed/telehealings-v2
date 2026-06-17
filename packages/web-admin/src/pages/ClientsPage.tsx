import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  ChevronLeft, X, Upload, UserPlus, Users as UsersIcon,
  ArrowUpDown, MoreHorizontal, Plus
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

const API_BASE = 'https://submit-avoiding-contributing-guards.trycloudflare.com';

// ─── Types ───
interface Client {
  id: number;
  name: string;
  email: string;
  therapist: string;
  phone: string;
  lastActiveDate: string;
  lastActiveTime: string;
  sessionStatus: string;
  sessionDate: string;
  avatar: string;
  status: 'booked' | 'pending' | 'new' | 'inactive';
}

interface GuestUser {
  id: string;
  name: string;
  tcAcceptedDate: string;
  tcAcceptedTime: string;
  personalisation: string[];
}

// ─── Helpers ───
function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
}

interface FilterState {
  name: string;
  therapist: string;
  status: string;
  lastActive: string;
}

const statusColors: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  booked: { bg: '#f0fdf4', text: '#166534', dot: '#22c55e', border: '#bbf7d0' },
  pending: { bg: '#fffbeb', text: '#92400e', dot: '#f59e0b', border: '#fde68a' },
  new: { bg: '#eff6ff', text: '#1e40af', dot: '#3b82f6', border: '#bfdbfe' },
  inactive: { bg: '#f1f5f9', text: '#475569', dot: '#94a3b8', border: '#e2e8f0' },
};

// ─── Avatar Component ───
const Avatar: React.FC<{ name: string; size?: number }> = ({ name, size = 36 }) => {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: '#3b82f6', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, flexShrink: 0
    }}>
      {getInitials(name)}
    </div>
  );
};

// ─── Status Badge Component ───
const StatusBadge: React.FC<{ status: string; label: string }> = ({ status, label }) => {
  const colors = statusColors[status] || statusColors.active;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 99,
      fontSize: 12, fontWeight: 600,
      background: colors.bg, color: colors.text,
      border: `1px solid ${colors.border}`,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: colors.dot }} />
      {label}
    </span>
  );
};

// ─── Modal Component ───
const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}> = ({ open, onClose, title, icon, children, footer }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff', width: 500, maxWidth: '90%',
          borderRadius: 16, boxShadow: '0 20px 40px rgba(0,0,0,1)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
            {icon}
            {title}
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', padding: 4, borderRadius: '50%' }}>
            <X size={18} />
          </button>
        </div>
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {children}
        </div>
        {footer && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', gap: 12, background: '#fafafa' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main Component ───
const ClientsPage: React.FC = () => {
  const adminKey = useAuthStore((s) => s.adminKey) || '';
  const [activeTab, setActiveTab] = useState('all');
  const [currentMode, setCurrentMode] = useState<'normal' | 'guest'>('normal');
  const [filters, setFilters] = useState<FilterState>({ name: '', therapist: '', status: '', lastActive: '' });
  const [openFilterCol, setOpenFilterCol] = useState<string | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [healiInsightVisible, setHealiInsightVisible] = useState(true);

  // Modal states
  const [addClientModal, setAddClientModal] = useState(false);
  const [switchTherapistModal, setSwitchTherapistModal] = useState(false);
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [addClientForm, setAddClientForm] = useState({ name: '', email: '', phone: '', therapist: '' });
  const [newTherapist, setNewTherapist] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [dataTransfer, setDataTransfer] = useState(true);
  const [guestUsersData, setGuestUsersData] = useState<GuestUser[]>([]);
  const [guestsLoading, setGuestsLoading] = useState(false);
  const [usersData, setUsersData] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  // Fetch guests from backend when guest tab is active
  useEffect(() => {
    if (currentMode !== 'guest') return;
    setGuestsLoading(true);
    fetch(`${API_BASE}/guest?page=1&limit=50`, {
      headers: { 'x-admin-key': adminKey },
    })
      .then(res => res.json())
      .then(data => {
        const mapped = (data.data || []).map((g: any) => ({
          id: g.id,
          name: g.name || '',
          tcAcceptedDate: g.tcAcceptedAt ? new Date(g.tcAcceptedAt).toLocaleDateString('en-GB') : '',
          tcAcceptedTime: g.tcAcceptedAt ? new Date(g.tcAcceptedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '',
          personalisation: Array.isArray(g.personalisation) ? g.personalisation : [],
        }));
        setGuestUsersData(mapped);
      })
      .catch(err => console.error('Failed to fetch guests:', err))
      .finally(() => setGuestsLoading(false));
  }, [currentMode, adminKey]);

  // Fetch full users from backend when normal tab is active
  useEffect(() => {
    if (currentMode !== 'normal') return;
    setUsersLoading(true);
    fetch(`${API_BASE}/user?page=1&limit=50`, {
      headers: { 'x-admin-key': adminKey },
    })
      .then(res => res.json())
      .then(data => {
        setUsersData(data.data || []);
      })
      .catch(err => console.error('Failed to fetch users:', err))
      .finally(() => setUsersLoading(false));
  }, [currentMode, adminKey]);

  // Close filter dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenFilterCol(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ─── Computed Data ───
  const filteredData = useMemo(() => {
    if (currentMode === 'guest') {
      let data = [...guestUsersData];
      if (filters.name) {
        data = data.filter((g) => g.name.toLowerCase().includes(filters.name.toLowerCase()));
      }
      return data;
    }

    let data = usersData.filter((c: any) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'active') return c.status === 'ACTIVE';
      if (activeTab === 'pending') return c.status === 'PENDING';
      if (activeTab === 'new') return c.status === 'ACTIVE';
      if (activeTab === 'inactive') return c.status === 'INACTIVE' || c.status === 'SUSPENDED';
      return true;
    });

    if (filters.name) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(filters.name.toLowerCase()) ||
        c.email.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.therapist) {
      data = data.filter((c) => c.therapist === filters.therapist);
    }
    if (filters.status) {
      data = data.filter((c) => c.status === filters.status);
    }
    if (filters.lastActive === 'old') {
      data = data.filter((c) => c.status === 'pending');
    } else if (filters.lastActive === 'today') {
      data = data.filter((c) => c.status === 'booked');
    }

    return data;
  }, [currentMode, activeTab, filters, guestUsersData]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage]);

  // Tab counts
  const tabCounts = useMemo(() => ({
    all: usersData.length,
    active: usersData.filter((c: any) => c.status === 'ACTIVE').length,
    pending: usersData.filter((c: any) => c.status === 'PENDING').length,
    new: usersData.filter((c: any) => c.status === 'ACTIVE').length,
    inactive: usersData.filter((c: any) => c.status === 'INACTIVE' || c.status === 'SUSPENDED').length,
    guest: guestUsersData.length,
  }), [usersData, guestUsersData]);

  // Reset page on filter/tab change
  useEffect(() => { setCurrentPage(1); }, [activeTab, currentMode, filters, rowsPerPage]);

  // ─── Handlers ───
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setFilters({ name: '', therapist: '', status: '', lastActive: '' });
    setCurrentMode(tab === 'guest' ? 'guest' : 'normal');
  };

  const handleAddClient = () => {
    console.log('Add client:', addClientForm);
    setAddClientModal(false);
    setAddClientForm({ name: '', email: '', phone: '', therapist: '' });
  };

  const handleConvertGuest = async (guestId: string) => {
    try {
      const res = await fetch(`${API_BASE}/guest/${guestId}/convert`, {
        method: 'POST',
        headers: { 'x-admin-key': adminKey },
      });
      if (res.ok) {
        // Refresh the guest list
        const refreshed = await fetch(`${API_BASE}/guest?page=1&limit=50`, {
          headers: { 'x-admin-key': adminKey },
        });
        const data = await refreshed.json();
        const mapped: GuestUser[] = (data.data || []).map((g: any) => ({
          id: g.id.slice(0, 8).toUpperCase(),
          name: g.name,
          tcAcceptedDate: new Date(g.tcAcceptedAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
          tcAcceptedTime: new Date(g.tcAcceptedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          personalisation: Array.isArray(g.personalisation) ? g.personalisation : [],
        }));
        setGuestUsersData(mapped);
      }
    } catch (err) {
      console.error('Failed to convert guest:', err);
    }
  };

  const handleSwitchTherapist = () => {
    console.log('Switch therapist:', selectedClient?.name, '->', newTherapist);
    setSwitchTherapistModal(false);
    setNewTherapist('');
  };

  const handleChangeStatus = () => {
    console.log('Change status:', selectedClient?.name, '->', newStatus);
    setChangeStatusModal(false);
    setNewStatus('');
  };

  // ─── Styles ───
  const css = `
    .th-btn { background:none; border:none; color:#cbd5e1; cursor:pointer; padding:2px; border-radius:4px; display:inline-flex; align-items:center; justify-content:center; transition:all 0.2s; flex-shrink:0; margin-left:2px; }
    .th-btn:hover { background:#f1f5f9; color:#0f172a; }
    .th-btn.active { color:#2563eb; }
    .th-input-wrap { display:none; align-items:center; gap:4px; position:absolute; top:100%; left:0; right:0; z-index:5; background:#fff; padding:4px 0; }
    .th-input-wrap.open { display:flex; }
    .th-input { flex:1; padding:4px 8px; border-radius:6px; border:1px solid #2a73d4; font-size:12px; font-family:inherit; color:#0f172a; outline:none; background:#fff; box-shadow:0 0 0 2px rgba(42,115,212,0.1); }
    .th-select { flex:1; padding:4px 8px; border-radius:6px; border:1px solid #2a73d4; font-size:12px; font-family:inherit; color:#0f172a; outline:none; background:#fff; cursor:pointer; box-shadow:0 0 0 2px rgba(42,115,212,0.1); }
    .action-btn { background:transparent; border:none; color:#64748b; cursor:pointer; padding:10px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; transition:all 0.2s; }
    .action-btn:hover { background:#f1f5f9; color:#0f172a; }
  `;

  return (
    <>
      <style>{css}</style>
      <div style={{ padding: '0 32px 16px' }} ref={filterRef}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Heali Insight Banner */}
          {healiInsightVisible && currentMode === 'normal' && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '6px 12px', margin: '40px 0 12px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              border: '1px solid #bfdbfe', borderRadius: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: '#2563eb', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                    <path d="M9 21h6" />
                  </svg>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#2563eb', textTransform: 'uppercase', letterSpacing: 0.3, lineHeight: 1.2 }}>Heali Insight</span>
                  <span style={{ fontSize: 11, color: '#1e40af', lineHeight: 1.3, whiteSpace: 'nowrap' }}>
                    2 clients unmatched for 7+ days. Prioritize <strong style={{ fontWeight: 700, color: '#1e3a8a' }}>Max Mayfield</strong> &amp; <strong style={{ fontWeight: 700, color: '#1e3a8a' }}>Mike Wheeler</strong>.
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => setHealiInsightVisible(false)} style={{
                  background: 'none', border: 'none', color: '#93c5fd', cursor: 'pointer',
                  padding: 2, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div style={{ width: 32, height: 32, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/Heali.png" alt="Heali" style={{ height: 32, width: 'auto' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              </div>
            </div>
          )}

          {/* ─── Page Header ─── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <h1 style={{
              fontSize: 20, fontWeight: 700, color: '#0f172a',
              position: 'relative', padding: '0 0 8px 0',
              borderBottom: '2px solid #e2e8f0', margin: 0,
            }}>
              Clients
              <span style={{
                position: 'absolute', bottom: -2, left: 0, right: 0,
                height: 3, background: '#0f172a', borderRadius: '2px 2px 0 0',
              }} />
            </h1>
          </div>

          {/* ─── Filter Tabs + Actions ─── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              {(['all', 'active', 'pending', 'new', 'inactive', 'guest'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  style={{
                    padding: '6px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600,
                    border: `1px solid ${activeTab === tab ? '#0f172a' : '#e2e8f0'}`,
                    background: activeTab === tab ? '#0f172a' : '#fff',
                    color: activeTab === tab ? '#fff' : '#64748b',
                    cursor: 'pointer', transition: 'all 0.2s',
                    textTransform: tab === 'guest' ? 'none' : 'capitalize',
                  }}
                >
                  {tab === 'all' ? 'All' : tab === 'guest' ? 'Guest' : tab.charAt(0).toUpperCase() + tab.slice(1)}{' '}
                  <span style={{ fontWeight: 700 }}>{tabCounts[tab]}</span>
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                  border: '1px solid #e2e8f0', background: '#fff', color: '#64748b',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <Upload size={14} />
                Export CSV
              </button>
              <button
                onClick={() => setAddClientModal(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                  border: 'none', background: '#2a73d4', color: '#fff',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <Plus size={14} />
                Add User
              </button>
            </div>
          </div>

          {/* ─── Table Card ─── */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: '24px 32px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: currentMode === 'guest' ? 700 : 900 }}>
                {/* ─── Table Head ─── */}
                <thead style={{ position: 'sticky', top: 0, zIndex: 10, background: '#fff' }}>
                  <tr>
                    {currentMode === 'guest' ? (
                      <>
                        <th style={{ width: '5%', textAlign: 'left', fontSize: 13, fontWeight: 500, color: '#64748b', padding: '8px 12px 8px 0', borderBottom: '1px solid #f1f5f9', verticalAlign: 'bottom' }}>ID</th>
                        <th style={{ width: '25%', textAlign: 'left', fontSize: 13, fontWeight: 500, color: '#64748b', padding: '8px 12px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'bottom', position: 'relative' }}>
                          <RenderFilterHeader col="name" label="Name" openFilterCol={openFilterCol} setOpenFilterCol={setOpenFilterCol} filters={filters} setFilters={setFilters} type="text" />
                        </th>
                        <th style={{ width: '25%', textAlign: 'left', fontSize: 13, fontWeight: 500, color: '#64748b', padding: '8px 12px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'bottom' }}>T&C Accepted</th>
                        <th style={{ width: '30%', textAlign: 'left', fontSize: 13, fontWeight: 500, color: '#64748b', padding: '8px 12px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'bottom' }}>Personalisation</th>
                        <th style={{ width: '15%', textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#64748b', padding: '8px 0 8px 12px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'bottom' }}>Actions</th>
                      </>
                    ) : (
                      <>
                        <th style={{ width: '5%', textAlign: 'left', fontSize: 13, fontWeight: 500, color: '#64748b', padding: '8px 12px 8px 0', borderBottom: '1px solid #f1f5f9', verticalAlign: 'bottom' }}>Sl No</th>
                        <th style={{ width: '22%', textAlign: 'left', fontSize: 13, fontWeight: 500, color: '#64748b', padding: '8px 12px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'bottom', position: 'relative' }}>
                          <RenderFilterHeader col="name" label="User Name" openFilterCol={openFilterCol} setOpenFilterCol={setOpenFilterCol} filters={filters} setFilters={setFilters} type="text" />
                        </th>
                        <th style={{ width: '15%', textAlign: 'left', fontSize: 13, fontWeight: 500, color: '#64748b', padding: '8px 12px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'bottom', position: 'relative' }}>
                          <RenderFilterHeader col="therapist" label="Therapist" openFilterCol={openFilterCol} setOpenFilterCol={setOpenFilterCol} filters={filters} setFilters={setFilters} type="select" options={['Dr. Ajesh Anand', 'Dr. Sarah Smith', 'Unassigned']} />
                        </th>
                        <th style={{ width: '13%', textAlign: 'left', fontSize: 13, fontWeight: 500, color: '#64748b', padding: '8px 12px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'bottom' }}>Contact Number</th>
                        <th style={{ width: '13%', textAlign: 'left', fontSize: 13, fontWeight: 500, color: '#64748b', padding: '8px 12px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'bottom', position: 'relative' }}>
                          <RenderFilterHeader col="lastActive" label="Last Active" openFilterCol={openFilterCol} setOpenFilterCol={setOpenFilterCol} filters={filters} setFilters={setFilters} type="select" options={[]} selectOptions={[{ value: '', label: 'Any time' }, { value: 'today', label: 'Today' }, { value: 'week', label: 'This week' }, { value: 'month', label: 'This month' }, { value: 'old', label: '30+ days ago' }]} />
                        </th>
                        <th style={{ width: '18%', textAlign: 'left', fontSize: 13, fontWeight: 500, color: '#64748b', padding: '8px 12px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'bottom', position: 'relative' }}>
                          <RenderFilterHeader col="status" label="Session Details" openFilterCol={openFilterCol} setOpenFilterCol={setOpenFilterCol} filters={filters} setFilters={setFilters} type="select" options={[]} selectOptions={[{ value: '', label: 'All Statuses' }, { value: 'booked', label: 'Schedule Booked' }, { value: 'pending', label: 'Pending' }, { value: 'new', label: 'New' }]} />
                        </th>
                        <th style={{ width: '12%', textAlign: 'center', fontSize: 13, fontWeight: 500, color: '#64748b', padding: '8px 0 8px 12px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'bottom' }}>Actions</th>
                      </>
                    )}
                  </tr>
                </thead>

                {/* ─── Table Body ─── */}
                <tbody>
                  {currentMode === 'guest' && guestsLoading && (
                    <tr><td colSpan={5} style={{ padding: 40, textAlign: 'center', color: '#64748b', fontSize: 14 }}>Loading guests...</td></tr>
                  )}
                  {currentMode === 'guest' && !guestsLoading && paginatedData.map((g: any) => (
                    <tr key={g.id} style={{ transition: 'background 0.2s' }} className="hover-row">
                      <td style={{ padding: '12px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#64748b' }}>{g.id}</td>
                      <td style={{ padding: '12px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: '#dbeafe', color: '#2563eb',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 12, fontWeight: 700, flexShrink: 0,
                          }}>
                            {getInitials(g.name)}
                          </div>
                          <span style={{ fontWeight: 600, color: '#0f172a', fontSize: 14 }}>{g.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>
                        {g.tcAcceptedDate}
                        <span style={{ display: 'block', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{g.tcAcceptedTime}</span>
                      </td>
                      <td style={{ padding: '12px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                        <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                          {g.personalisation && g.personalisation.length > 0 ? (
                            g.personalisation.map((p: string, i: number) => (
                              <span key={i} style={{
                                display: 'inline-flex', alignItems: 'center',
                                padding: '2px 8px', borderRadius: 99,
                                background: '#eff6ff', color: '#2563eb',
                                fontSize: 11, fontWeight: 600,
                                border: '1px solid #bfdbfe',
                              }}>{p}</span>
                            ))
                          ) : (
                            <span style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>No preferences</span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '12px 0 12px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                        <button className="action-btn" title="Convert to Full User" onClick={() => handleConvertGuest(g.id)}>
                          <UserPlus size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {currentMode === 'normal' && usersLoading && (
                    <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#64748b', fontSize: 14 }}>Loading users...</td></tr>
                  )}
                  {currentMode === 'normal' && !usersLoading && paginatedData.map((client: any) => (
                    <tr key={client.id} style={{ transition: 'background 0.2s' }} className="hover-row">
                      <td style={{ padding: '12px 12px 12px 0', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#64748b' }}>{client.id?.slice(0, 8).toUpperCase()}</td>
                      <td style={{ padding: '12px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <Avatar name={`${client.firstName || ''} ${client.lastName || ''}`.trim() || client.email} />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 600, color: '#0f172a', fontSize: 14 }}>{`${client.firstName || ''} ${client.lastName || ''}`.trim() || client.email}</span>
                            <span style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{client.email}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{client.occupation || '—'}</td>
                      <td style={{ padding: '12px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>{client.phone || '—'}</td>
                      <td style={{ padding: '12px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>
                        {client.createdAt ? new Date(client.createdAt).toLocaleDateString('en-GB') : '—'}
                        <span style={{ display: 'block', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>
                          {client.createdAt ? new Date(client.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </td>
                      <td style={{ padding: '12px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                        <StatusBadge status={client.status?.toLowerCase() || 'active'} label={client.status || 'Active'} />
                        {client.medicalProfile?.completed ? (
                          <span style={{ display: 'block', fontSize: 11, color: '#10b981', marginTop: 4 }}>Medical profile complete</span>
                        ) : (
                          <span style={{ display: 'block', fontSize: 11, color: '#94a3b8', marginTop: 4 }}>Medical profile pending</span>
                        )}
                      </td>
                      <td style={{ padding: '12px 0 12px 12px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
                        <button
                          className="action-btn"
                          title="Switch Therapist"
                          onClick={() => { setSelectedClient(client); setSwitchTherapistModal(true); }}
                        >
                          <ArrowUpDown size={18} />
                        </button>
                        <button
                          className="action-btn"
                          title="Change Status"
                          onClick={() => { setSelectedClient(client); setChangeStatusModal(true); }}
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan={currentMode === 'guest' ? 5 : 7} style={{ padding: '60px 20px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <UsersIcon size={64} style={{ color: '#cbd5e1', marginBottom: 16 }} />
                          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>No clients found</h3>
                          <p style={{ fontSize: 14, color: '#64748b' }}>Try adjusting your search or filter criteria.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ─── Pagination ─── */}
            {filteredData.length > 0 && (
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingTop: 16, borderTop: '1px solid #f1f5f9', marginTop: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#64748b' }}>
                    <span>Rows per page:</span>
                    <select
                      value={rowsPerPage}
                      onChange={e => setRowsPerPage(Number(e.target.value))}
                      style={{ padding: '4px 8px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, color: '#0f172a', outline: 'none', background: '#fff' }}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.05, textTransform: 'uppercase' }}>
                    Showing {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    style={{
                      width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 8, border: 'none',
                      background: currentPage === 1 ? '#f8fafc' : '#f1f5f9',
                      color: currentPage === 1 ? '#cbd5e1' : '#334155',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        style={{
                          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          borderRadius: 8, border: 'none',
                          background: currentPage === page ? '#2563eb' : '#f1f5f9',
                          color: currentPage === page ? '#fff' : '#334155',
                          fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        }}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    style={{
                      width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 8, border: 'none',
                      background: currentPage >= totalPages ? '#f8fafc' : '#f1f5f9',
                      color: currentPage >= totalPages ? '#cbd5e1' : '#334155',
                      cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Add Client Modal ─── */}
      <Modal
        open={addClientModal}
        onClose={() => setAddClientModal(false)}
        title="Add New Client"
        icon={<UserPlus size={18} style={{ color: '#2563eb' }} />}
        footer={
          <>
            <button onClick={() => setAddClientModal(false)} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600,
              border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer',
            }}>Cancel</button>
            <button onClick={handleAddClient} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600,
              border: 'none', background: '#2a73d4', color: '#fff', cursor: 'pointer',
            }}>Add Client</button>
          </>
        }
      >
        <FormField label="Full Name">
          <input className="form-input" placeholder="Enter full name" value={addClientForm.name} onChange={e => setAddClientForm(f => ({ ...f, name: e.target.value }))} />
        </FormField>
        <FormField label="Email Address">
          <input className="form-input" type="email" placeholder="Enter email address" value={addClientForm.email} onChange={e => setAddClientForm(f => ({ ...f, email: e.target.value }))} />
        </FormField>
        <FormField label="Phone Number">
          <input className="form-input" placeholder="Enter phone number" value={addClientForm.phone} onChange={e => setAddClientForm(f => ({ ...f, phone: e.target.value }))} />
        </FormField>
        <FormField label="Assign Therapist">
          <select className="form-input" value={addClientForm.therapist} onChange={e => setAddClientForm(f => ({ ...f, therapist: e.target.value }))}>
            <option value="">Select therapist</option>
            <option>Dr. Ajesh Anand</option>
            <option>Dr. Sarah Smith</option>
          </select>
        </FormField>
      </Modal>

      {/* ─── Switch Therapist Modal ─── */}
      <Modal
        open={switchTherapistModal}
        onClose={() => setSwitchTherapistModal(false)}
        title={`Switch Therapist — ${selectedClient?.name || ''}`}
        icon={<ArrowUpDown size={18} style={{ color: '#2563eb' }} />}
        footer={
          <>
            <button onClick={() => setSwitchTherapistModal(false)} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600,
              border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer',
            }}>Cancel</button>
            <button onClick={handleSwitchTherapist} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600,
              border: 'none', background: '#2a73d4', color: '#fff', cursor: 'pointer',
            }}>Confirm Switch</button>
          </>
        }
      >
        <p style={{ fontSize: 14, color: '#64748b' }}>Current therapist: <strong>{selectedClient?.therapist}</strong></p>
        <FormField label="New Therapist">
          <select className="form-input" value={newTherapist} onChange={e => setNewTherapist(e.target.value)}>
            <option value="">Select new therapist</option>
            <option>Dr. Ajesh Anand</option>
            <option>Dr. Sarah Smith</option>
            <option>Unassigned</option>
          </select>
        </FormField>
        <label style={{
          display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569',
          background: '#f0fdf4', padding: 12, border: '1px solid #bbf7d0', borderRadius: 8,
        }}>
          <input type="checkbox" checked={dataTransfer} onChange={e => setDataTransfer(e.target.checked)} />
          <div>
            <strong style={{ color: '#166534', display: 'block', marginBottom: 2 }}>Transfer session data</strong>
            Carry over session history and notes to the new therapist.
          </div>
        </label>
      </Modal>

      {/* ─── Change Status Modal ─── */}
      <Modal
        open={changeStatusModal}
        onClose={() => setChangeStatusModal(false)}
        title={`Change Status — ${selectedClient?.name || ''}`}
        icon={<MoreHorizontal size={18} style={{ color: '#2563eb' }} />}
        footer={
          <>
            <button onClick={() => setChangeStatusModal(false)} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600,
              border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', cursor: 'pointer',
            }}>Cancel</button>
            <button onClick={handleChangeStatus} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600,
              border: 'none', background: '#2a73d4', color: '#fff', cursor: 'pointer',
            }}>Update Status</button>
          </>
        }
      >
        <p style={{ fontSize: 14, color: '#64748b' }}>Current status: {selectedClient && <StatusBadge status={selectedClient.status} label={selectedClient.sessionStatus} />}</p>
        <FormField label="New Status">
          <select className="form-input" value={newStatus} onChange={e => setNewStatus(e.target.value)}>
            <option value="">Select new status</option>
            <option value="booked">Schedule Booked</option>
            <option value="pending">Pending</option>
            <option value="new">New</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>
      </Modal>

      {/* Hover styles */}
      <style>{`
        .hover-row:hover { background: #f8fafc !important; }
        .form-input { width:100%; padding:10px 12px; border-radius:8px; border:1px solid #cbd5e1; font-size:14px; font-family:inherit; outline:none; transition:border 0.2s; box-sizing:border-box; background:#fff; color:#0f172a; }
        .form-input:focus { border-color:#2563eb; }
      `}</style>
    </>
  );
};

// ─── Filter Header Component ───
const RenderFilterHeader: React.FC<{
  col: string;
  label: string;
  openFilterCol: string | null;
  setOpenFilterCol: (col: string | null) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  type: 'text' | 'select';
  options?: string[];
  selectOptions?: { value: string; label: string }[];
}> = ({ col, label, openFilterCol, setOpenFilterCol, filters, setFilters, type, options = [], selectOptions }) => {
  const isOpen = openFilterCol === col;
  const currentValue = (filters as any)[col] || '';

  const handleToggle = () => {
    setOpenFilterCol(isOpen ? null : col);
  };

  const handleClose = () => {
    setOpenFilterCol(null);
    setFilters(f => ({ ...f, [col]: '' }));
  };

  const handleChange = (value: string) => {
    setFilters(f => ({ ...f, [col]: value }));
  };

  const selOptions = selectOptions || options.map(o => ({ value: o, label: o }));

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <span>{label}</span>
        <button
          className={`th-btn ${currentValue ? 'active' : ''}`}
          onClick={handleToggle}
          title={`Filter ${label}`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
      <div className={`th-input-wrap ${isOpen ? 'open' : ''}`}>
        {type === 'text' ? (
          <>
            <input
              className="th-input"
              placeholder="Search..."
              value={currentValue}
              onChange={e => handleChange(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setOpenFilterCol(null)}
            />
            <button className="th-btn" style={{ padding: 2 }} onClick={handleClose} title="Close">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </>
        ) : (
          <>
            <select
              className="th-select"
              value={currentValue}
              onChange={e => handleChange(e.target.value)}
            >
              {selOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <button className="th-btn" style={{ padding: 2 }} onClick={handleClose} title="Close">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Form Field Component ───
const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>{label}</label>
    {children}
  </div>
);

export default ClientsPage;
