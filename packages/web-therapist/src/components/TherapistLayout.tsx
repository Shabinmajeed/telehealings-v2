import React, { useState, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  activeNav: string;
  pageTitle?: string;
  pageSubtitle?: string;
  headerMascot?: boolean;
  healiInsight?: { text: string };
}

const TherapistLayout: React.FC<LayoutProps> = ({ children, activeNav, pageTitle, pageSubtitle, headerMascot, healiInsight }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navItems: Array<{ icon?: string; label?: string; active?: boolean; badge?: number; type?: string; href?: string }> = [
    { icon: 'dashboard', label: 'Dashboard', active: activeNav === 'dashboard', href: '/dashboard' },
    { icon: 'sessions', label: 'Sessions', active: activeNav === 'sessions', href: '/sessions' },
    { icon: 'clients', label: 'Clients', active: activeNav === 'clients', href: '/clients' },
    { type: 'separator' },
    { icon: 'calendar', label: 'Calendar', active: activeNav === 'calendar', href: '/calendar' },
    { icon: 'messages', label: 'Messages', active: activeNav === 'messages', badge: 5, href: '/messages' },
    { icon: 'resources', label: 'Resources', active: activeNav === 'resources', href: '/resources' },
    { icon: 'earnings', label: 'Earnings', active: activeNav === 'earnings', href: '/earnings' },
    { type: 'separator' },
    { icon: 'tools', label: 'Tools', active: activeNav === 'tools', href: '/tools' },
    { type: 'separator' },
    { icon: 'profile', label: 'Profile', active: activeNav === 'profile', href: '/profile' },
    { icon: 'settings', label: 'Settings', active: activeNav === 'settings', href: '/settings' },
  ];

  const getIcon = (name: string): JSX.Element | null => {
    const icons: Record<string, JSX.Element> = {
      dashboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
      sessions: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
      clients: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
      calendar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
      messages: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
      resources: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
      earnings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
      tools: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
      profile: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
      settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
    };
    return icons[name] || null;
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", color: '#111111', lineHeight: 1.5, height: '100%', display: 'flex', overflow: 'hidden', background: 'linear-gradient(110deg, #ffffff 0%, #eef5fc 35%, #7aaaf6 100%)' }}>
      {/* SIDEBAR */}
      <aside style={{ width: sidebarCollapsed ? 88 : 270, height: '100%', padding: sidebarCollapsed ? '30px 10px' : '30px 20px', display: 'flex', flexDirection: 'column', borderRight: '1px solid rgba(0,0,0,0.05)', background: '#ffffff', flexShrink: 0, position: 'relative', transition: 'width 0.3s ease, padding 0.3s ease', overflow: 'visible', zIndex: 100, boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 30, padding: sidebarCollapsed ? 0 : '0 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 36, height: 36 }} />
            {!sidebarCollapsed && <span style={{ fontSize: 20, fontWeight: 700, color: '#000' }}>Telehealings</span>}
          </div>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="sidebar-toggle-btn" style={{ color: '#64748b', cursor: 'pointer', padding: 4, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: 'transform 0.3s', transform: sidebarCollapsed ? 'rotate(180deg)' : 'none' }}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        <div style={{ position: 'relative', marginBottom: 20, ...(sidebarCollapsed ? { width: 40, height: 40, background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', cursor: 'pointer' } : {}) }}>
          <svg style={sidebarCollapsed ? { width: 18, height: 18, color: '#64748b' } : { position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#64748b' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {!sidebarCollapsed && <input type="text" placeholder="Search" style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: 20, border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, overflowY: 'auto', overflowX: 'hidden', marginBottom: 20 }}>
          {navItems.map((item, i) => {
            if (item.type === 'separator') return <div key={i} style={{ height: 1, backgroundColor: '#e2e8f0', margin: '2px 16px' }} />;
            return (
              <a key={i} href={item.href || '#'} className="nav-item" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: sidebarCollapsed ? '12px' : '10px 16px', borderRadius: 8, color: item.active ? '#fff' : '#475569', fontWeight: 600, fontSize: 15, background: item.active ? '#1c52b8' : 'transparent', textDecoration: 'none', justifyContent: sidebarCollapsed ? 'center' : 'flex-start', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                <span style={{ width: 20, height: 20, flexShrink: 0, display: 'flex', alignItems: 'center' }}>{item.icon ? getIcon(item.icon) : null}</span>
                {!sidebarCollapsed && <span>{item.label}</span>}
                {!sidebarCollapsed && item.badge && <span style={{ marginLeft: 'auto', background: '#f04438', color: '#fff', fontSize: 11, padding: '2px 6px', borderRadius: 10, fontWeight: 700 }}>{item.badge}</span>}
              </a>
            );
          })}
        </nav>

        <div style={{ background: sidebarCollapsed ? 'transparent' : '#fff', padding: sidebarCollapsed ? 10 : 16, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: sidebarCollapsed ? 'none' : '0 4px 15px rgba(0,0,0,0.05)', marginTop: 'auto', border: sidebarCollapsed ? 'none' : '1px solid #f1f5f9', cursor: 'pointer', position: 'relative' }}>
          <div style={{ position: 'relative', display: 'inline-block', marginTop: sidebarCollapsed ? 0 : -45, marginBottom: sidebarCollapsed ? 0 : 10 }}>
            <img src="/user-profile.jpg" alt="Dr. Sarah Menon" style={{ width: sidebarCollapsed ? 40 : 75, height: sidebarCollapsed ? 40 : 75, borderRadius: '50%', objectFit: 'cover', border: sidebarCollapsed ? 'none' : '4px solid #fff', display: 'block' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            {!sidebarCollapsed && <div style={{ position: 'absolute', top: 0, right: 0, width: 18, height: 18, borderRadius: '50%', background: '#f04438', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff', transform: 'translate(30%,-30%)' }}>3</div>}
          </div>
          {!sidebarCollapsed && (<><h4 style={{ fontSize: 14, margin: '0 0 2px 0', color: '#111111' }}>Dr. Sarah Menon</h4><p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Therapist</p></>)}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: 24, overflowY: 'auto', background: 'transparent', minWidth: 0 }}>
        <div style={{ width: '100%', maxWidth: sidebarCollapsed ? '100%' : 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 40, transition: 'max-width 0.3s ease' }}>
          {/* Page Header */}
          {(pageTitle || headerMascot) && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
              {pageTitle && (
                <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', padding: '0 0 8px 0', position: 'relative', borderBottom: '2px solid #e2e8f0' }}>
                  <span style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 3, background: '#0f172a', borderRadius: '2px 2px 0 0' }} />
                  {pageTitle}
                </div>
              )}
              {headerMascot && <img src="/Heali.png" alt="Heali" style={{ height: 48, marginBottom: -1 }} />}
            </div>
          )}

          {/* Heali Insight */}
          {healiInsight && (
            <div style={{ background: '#ffffff', borderRadius: 16, padding: '20px 24px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flexShrink: 0 }}><img src="/Heali.png" alt="Heali" style={{ width: 48, height: 48 }} /></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#2a73d4', textTransform: 'uppercase', letterSpacing: 0.5, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                  Heali Insight
                </div>
                <p style={{ fontSize: 14, fontStyle: 'italic', color: '#334155', lineHeight: 1.6, margin: 0 }}>{healiInsight.text}</p>
              </div>
            </div>
          )}

          {children}
        </div>
      </div>

      <style>{`
        .nav-item:hover { background: #f1f5f9 !important; color: #111111 !important; }
        .nav-item.active:hover { background: #1c52b8 !important; color: #fff !important; }
        .sidebar-toggle-btn:hover { background: #f1f5f9 !important; color: #111111 !important; }
      `}</style>
    </div>
  );
};

export default TherapistLayout;
