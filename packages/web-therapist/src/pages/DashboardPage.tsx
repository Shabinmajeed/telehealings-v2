import React, { useState, useEffect } from 'react';
import { therapistApi } from '../api/therapist-api';

const DashboardPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dashboardStats, setDashboardStats] = useState<{ totalAppointments: number; upcomingAppointments: number; completedAppointments: number } | null>(null);

  useEffect(() => {
    therapistApi.getStats().then(res => setDashboardStats(res as any)).catch(console.error);
  }, []);

  const navItems: Array<{ icon?: string; label?: string; active?: boolean; badge?: number; type?: string }> = [
    { icon: 'dashboard', label: 'Dashboard', active: true },
    { icon: 'sessions', label: 'Sessions', active: false },
    { icon: 'clients', label: 'Clients', active: false },
    { type: 'separator' },
    { icon: 'calendar', label: 'Calendar', active: false },
    { icon: 'messages', label: 'Messages', active: false, badge: 5 },
    { icon: 'resources', label: 'Resources', active: false },
    { icon: 'earnings', label: 'Earnings', active: false },
    { type: 'separator' },
    { icon: 'tools', label: 'Tools', active: false },
  ];

  const sessions = [
    { time: '10:30 AM', initials: 'PS', color: '#3b82f6', name: 'Priya Sharma' },
    { time: '01:00 PM', initials: 'RN', color: '#22c55e', name: 'Rahul Nair' },
    { time: '02:00 PM', initials: 'AK', color: '#f59e0b', name: 'Anjali Krishnan' },
    { time: '04:30 PM', initials: 'VD', color: '#8b5cf6', name: 'Vikram Das' },
  ];

  const messages = [
    { initials: 'PS', color: '#3b82f6', name: 'Priya Sharma', text: 'Thank you for the session notes, Doctor...', time: '08:45 AM' },
    { initials: 'RN', color: '#22c55e', name: 'Rahul Nair', text: "Can we reschedule tomorrow's appointment?", time: '2h ago' },
    { initials: 'AK', color: '#f59e0b', name: 'Anjali Krishnan', text: 'Completed the worksheet you sent regarding core beliefs.', time: '4h ago' },
  ];

  const statCards: Array<{ label: string; value: string; trend: string; trendText: string; icon: string; iconBg: string; iconColor: string; sub?: string }> = [
    { label: 'Total Sessions', value: dashboardStats ? String(dashboardStats.totalAppointments) : '...', trend: 'up', trendText: dashboardStats ? `↑ ${dashboardStats.upcomingAppointments} upcoming` : '', icon: 'people', iconBg: '#eff6ff', iconColor: '#2563eb' },
    { label: 'Completed', value: dashboardStats ? String(dashboardStats.completedAppointments) : '...', trend: 'up', trendText: '', icon: 'star', iconBg: '#dcfce7', iconColor: '#059669' },
  ];

  const chartBars = [
    { thisWeek: 55, lastWeek: 50 },
    { thisWeek: 65, lastWeek: 48 },
    { thisWeek: 25, lastWeek: 85 },
    { thisWeek: 62, lastWeek: 40 },
    { thisWeek: 45, lastWeek: 42 },
    { thisWeek: 65, lastWeek: 50 },
    { thisWeek: 80, lastWeek: 42 },
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
      money: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
      people: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
      star: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    };
    return icons[name] || null;
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        color: '#111111',
        lineHeight: 1.5,
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
        background: 'linear-gradient(110deg, #ffffff 0%, #eef5fc 35%, #7aaaf6 100%)',
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: sidebarCollapsed ? 88 : 270,
          height: '100%',
          padding: sidebarCollapsed ? '30px 10px' : '30px 20px',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(0,0,0,0.05)',
          background: '#ffffff',
          flexShrink: 0,
          position: 'relative',
          transition: 'width 0.3s ease, padding 0.3s ease',
          overflow: 'visible',
          zIndex: 100,
          boxSizing: 'border-box',
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: 30,
            padding: sidebarCollapsed ? 0 : '0 10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 36, height: 36 }} />
            {!sidebarCollapsed && (
              <span style={{ fontSize: 20, fontWeight: 700, color: '#000' }}>Telehealings</span>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="sidebar-toggle-btn"
            style={{
              color: '#64748b',
              cursor: 'pointer',
              padding: 4,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ transition: 'transform 0.3s', transform: sidebarCollapsed ? 'rotate(180deg)' : 'none' }}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div
          style={{
            position: 'relative',
            marginBottom: 20,
            ...(sidebarCollapsed
              ? {
                  width: 40,
                  height: 40,
                  background: '#f8fafc',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  cursor: 'pointer',
                }
              : {}),
          }}
        >
          <svg
            style={
              sidebarCollapsed
                ? { width: 18, height: 18, color: '#64748b' }
                : {
                    position: 'absolute',
                    left: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 18,
                    height: 18,
                    color: '#64748b',
                  }
            }
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          {!sidebarCollapsed && (
            <input
              type="text"
              placeholder="Search"
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                borderRadius: 20,
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
            />
          )}
        </div>

        {/* Nav Menu */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, overflowY: 'auto', overflowX: 'hidden', marginBottom: 20 }}>
          {navItems.map((item, i) => {
            if (item.type === 'separator') {
              return <div key={i} style={{ height: 1, backgroundColor: '#e2e8f0', margin: '2px 16px' }} />;
            }
            return (
              <a
                key={i}
                href="#"
                className="nav-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: sidebarCollapsed ? '12px' : '10px 16px',
                  borderRadius: 8,
                  color: item.active ? '#fff' : '#475569',
                  fontWeight: 600,
                  fontSize: 15,
                  background: item.active ? '#1c52b8' : 'transparent',
                  textDecoration: 'none',
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ width: 20, height: 20, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  {item.icon ? getIcon(item.icon) : null}
                </span>
                {!sidebarCollapsed && <span>{item.label}</span>}
                {!sidebarCollapsed && item.badge && (
                  <span style={{ marginLeft: 'auto', background: '#f04438', color: '#fff', fontSize: 11, padding: '2px 6px', borderRadius: 10, fontWeight: 700 }}>
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* User Profile */}
        <div
          style={{
            background: sidebarCollapsed ? 'transparent' : '#fff',
            padding: sidebarCollapsed ? 10 : 16,
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            boxShadow: sidebarCollapsed ? 'none' : '0 4px 15px rgba(0,0,0,0.05)',
            marginTop: 'auto',
            border: sidebarCollapsed ? 'none' : '1px solid #f1f5f9',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <div style={{ position: 'relative', display: 'inline-block', marginTop: sidebarCollapsed ? 0 : -45, marginBottom: sidebarCollapsed ? 0 : 10 }}>
            <img
              src="/user-profile.jpg"
              alt="Dr. Sarah Menon"
              style={{
                width: sidebarCollapsed ? 40 : 75,
                height: sidebarCollapsed ? 40 : 75,
                borderRadius: '50%',
                objectFit: 'cover',
                border: sidebarCollapsed ? 'none' : '4px solid #fff',
                display: 'block',
              }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            {!sidebarCollapsed && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: '#f04438',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #fff',
                  transform: 'translate(30%,-30%)',
                }}
              >
                3
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <>
              <h4 style={{ fontSize: 14, margin: '0 0 2px 0', color: '#111111' }}>Dr. Sarah Menon</h4>
              <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Therapist</p>
            </>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: '0 32px 16px', overflowY: 'auto', background: 'transparent', minWidth: 0 }}>
        <div
          style={{
            width: '100%',
            maxWidth: sidebarCollapsed ? '100%' : 1080,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            paddingBottom: 20,
            transition: 'max-width 0.3s ease',
          }}
        >
          {/* Sticky Header */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 50,
              background: 'linear-gradient(110deg, #ffffff 0%, #eef5fc 35%, #7aaaf6 100%)',
              padding: '0 0 12px',
            }}
          >
            <div style={{ paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>
                  Good Morning, <span style={{ color: '#2a73d4' }}>Dr. Sarah Menon.</span>
                </h1>
                <p style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}>Here's your day at a glance.</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Tuesday, June 12
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" />
                    </svg>
                    4 Sessions today
                  </div>
                </div>
              </div>
              <div style={{ flexShrink: 0, marginLeft: 16 }}>
                <img src="/Heali.png" alt="Heali" style={{ width: 'auto', height: 48, display: 'block' }} />
              </div>
            </div>
          </div>

          {/* Top Half: Left (KPI + Sessions) | Right (Heali Insights) */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* KPI Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {statCards.map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#ffffff',
                      borderRadius: 12,
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      border: '1px solid #f1f5f9',
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        background: stat.iconBg,
                        color: stat.iconColor,
                      }}
                    >
                      <span style={{ width: 16, height: 16, display: 'flex', alignItems: 'center' }}>{getIcon(stat.icon)}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                      <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.3 }}>
                        {stat.label}
                      </span>
                      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0 }}>
                        {stat.value}
                        {stat.sub && <sub style={{ fontSize: 11 }}>{stat.sub}</sub>}
                      </h2>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: stat.trend === 'up' ? '#22c55e' : '#ef4444',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        {stat.trendText}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Today's Sessions */}
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                }}
              >
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: 14,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: 0,
                  }}
                >
                  <span>Today's Sessions</span>
                  <a href="#" style={{ fontSize: 12, fontWeight: 600, color: '#2a73d4', textDecoration: 'none' }}>View All</a>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14 }}>
                  {sessions.map((session, i) => (
                    <div
                      key={i}
                      className="session-card"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '8px 10px',
                        borderRadius: 8,
                        border: '1px solid #f1f5f9',
                        transition: 'background 0.2s',
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#2a73d4', minWidth: 55 }}>{session.time}</span>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 10,
                          fontWeight: 700,
                          color: '#fff',
                          flexShrink: 0,
                          background: session.color,
                        }}
                      >
                        {session.initials}
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', flex: 1 }}>{session.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Heali Insights */}
            <div style={{ width: 260, flexShrink: 0 }}>
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: 12,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2a73d4" strokeWidth="2">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Heali Insights
                </div>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                    border: '1px solid #bfdbfe',
                    borderRadius: 8,
                    padding: '10px 12px',
                    fontSize: 12,
                    color: '#1e40af',
                    lineHeight: 1.5,
                    marginBottom: 8,
                  }}
                >
                  <strong style={{ fontWeight: 700, color: '#1e3a8a' }}>Sarah M.</strong> has successfully completed 100% of her 'Cognitive Reframing' modules this week. Suggesting a transition to 'Core Belief Work' for the next session.
                </div>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                    border: '1px solid #bfdbfe',
                    borderRadius: 8,
                    padding: '10px 12px',
                    fontSize: 12,
                    color: '#1e40af',
                    lineHeight: 1.5,
                  }}
                >
                  <strong style={{ fontWeight: 700, color: '#1e3a8a' }}>John D.</strong> hasn't logged into the app in 4 days. Heali suggests sending a 'Gentle Nudge' notification to maintain momentum.
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Half: Left (Messages) | Right (Revenue Chart) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Unread Messages */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: 16,
                padding: 20,
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: 14,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: 0,
                }}
              >
                <span>Unread Messages</span>
                <a href="#" style={{ fontSize: 12, fontWeight: 600, color: '#2a73d4', textDecoration: 'none' }}>View All</a>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: 14 }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '10px 0',
                      borderBottom: i < messages.length - 1 ? '1px solid #f1f5f9' : 'none',
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#fff',
                        flexShrink: 0,
                        background: msg.color,
                      }}
                    >
                      {msg.initials}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', margin: 0 }}>{msg.name}</h4>
                      <p style={{ fontSize: 11, color: '#64748b', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {msg.text}
                      </p>
                    </div>
                    <span style={{ fontSize: 10, color: '#94a3b8', flexShrink: 0 }}>{msg.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Chart */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: 16,
                padding: 20,
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: 14,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: 0,
                }}
              >
                <span>Total Revenue</span>
                <a href="#" style={{ fontSize: 12, fontWeight: 600, color: '#2a73d4', textDecoration: 'none' }}>Full Report</a>
              </h3>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12, marginTop: 14 }}>
                {/* Y Axis */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    fontSize: 9,
                    color: '#64748b',
                    padding: '4px 0',
                  }}
                >
                  <span>25k</span>
                  <span>20k</span>
                  <span>15k</span>
                  <span>10k</span>
                  <span>5k</span>
                  <span>0</span>
                </div>
                {/* Chart */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <div key={i} style={{ borderTop: '1px dashed #f1f5f9', width: '100%' }} />
                    ))}
                  </div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 6, padding: '0 0 4px' }}>
                    {chartBars.map((bar, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 3, height: '100%' }}>
                        <div style={{ flex: 1, background: '#2a73d4', borderRadius: '3px 3px 0 0', minHeight: 4, height: `${bar.thisWeek}%` }} />
                        <div style={{ flex: 1, background: '#cbd5e1', borderRadius: '3px 3px 0 0', minHeight: 4, height: `${bar.lastWeek}%` }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#64748b', paddingTop: 4 }}>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#64748b' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2a73d4' }} />
                  <span>This Week</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: '#64748b' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#cbd5e1' }} />
                  <span>Last Week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Global styles for hover states */}
      <style>{`
        .nav-item:hover { background: #f1f5f9 !important; color: #111111 !important; }
        .nav-item.active:hover { background: #1c52b8 !important; color: #fff !important; }
        .session-card:hover { background: #f8fafc !important; }
        .sidebar-toggle-btn:hover { background: #f1f5f9 !important; color: #111111 !important; }
      `}</style>
    </div>
  );
};

export default DashboardPage;
