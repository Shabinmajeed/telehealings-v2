import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import * as Icons from 'lucide-react';

const navGroups = [
  [
    { path: '/dashboard', label: 'Dashboard', icon: Icons.LayoutDashboard },
    { path: '/therapists', label: 'Therapists', icon: Icons.User },
    { path: '/clients', label: 'Clients', icon: Icons.Users },
  ],
  [
    { path: '/sessions', label: 'Sessions & Schedule', icon: Icons.Calendar },
    { path: '/content', label: 'Content Management', icon: Icons.BookOpen },
    { path: '/communications', label: 'Communications', icon: Icons.MessageSquare },
    { path: '/compliance', label: 'Compliance', icon: Icons.Shield },
  ],
  [
    { path: '/financials', label: 'Financials', icon: Icons.DollarSign },
    { path: '/analytics', label: 'Analytics & Reporting', icon: Icons.BarChart },
    { path: '/promotion', label: 'Promotion & Offers', icon: Icons.Tag },
  ],
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  return (
    <aside
      className="flex flex-col border-r border-black/5 bg-white flex-shrink-0 relative z-10 transition-all duration-300"
      style={{ width: collapsed ? 88 : 280, padding: collapsed ? '30px 10px' : '30px 20px', overflow: 'visible' }}
    >
      {/* Brand */}
      <div className="flex items-center justify-between mb-8" style={{ padding: collapsed ? 0 : '0 10px' }}>
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Telehealings" className="w-9 h-9 rounded-lg flex-shrink-0 object-contain" />
          {!collapsed && <span className="text-xl font-bold text-black">Telehealings</span>}
        </div>
        <button onClick={() => setCollapsed(!collapsed)} className="text-text-muted p-1 rounded-md hover:bg-surface-secondary flex items-center justify-center">
          <Icons.ChevronLeft size={20} className="transition-transform duration-300" style={{ transform: collapsed ? 'rotate(180deg)' : 'none' }} />
        </button>
      </div>

      {/* Search Box */}
      {!collapsed && (
        <div className="relative mb-5">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#64748b' }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-full text-sm outline-none"
            style={{
              padding: '12px 12px 12px 40px', borderRadius: 20,
              border: '1px solid #e2e8f0', background: '#f8fafc',
            }}
          />
        </div>
      )}
      {collapsed && (
        <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-5 cursor-pointer" style={{ background: '#f8fafc' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#64748b' }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      )}

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 flex-grow overflow-y-auto overflow-x-hidden" style={{ marginBottom: 20 }}>
        {navGroups.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && (
              <div style={{ height: 1, background: '#e2e8f0', margin: '2px 16px', flexShrink: 0 }} />
            )}
            {group.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3.5 rounded-lg font-semibold text-[15px] transition-all whitespace-nowrap ${isActive ? 'bg-[#1c52b8] text-white' : 'text-[#475569] hover:bg-surface-secondary hover:text-text-main'}`}
                  style={{ padding: collapsed ? '12px' : '10px 16px', justifyContent: collapsed ? 'center' : 'flex-start' }}
                >
                  <Icon size={20} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </React.Fragment>
        ))}
      </nav>

      {/* User Profile */}
      <div className="relative mt-auto">
        <div
          className="flex flex-col items-center text-center cursor-pointer outline-none"
          tabIndex={0}
          style={{
            padding: collapsed ? '10px' : '16px',
            background: collapsed ? 'transparent' : '#fff',
            borderRadius: collapsed ? 0 : 12,
            boxShadow: collapsed ? 'none' : '0 4px 15px rgba(0,0,0,0.05)',
            border: collapsed ? 'none' : '1px solid #f1f5f9',
          }}
        >
          <img
            src="/user-profile.jpg"
            alt={user?.name || 'Dr. Ajesh Anand'}
            className="rounded-full flex-shrink-0 object-cover"
            style={{
              width: collapsed ? 40 : 75, height: collapsed ? 40 : 75,
              marginTop: collapsed ? 0 : -45,
              marginBottom: collapsed ? 0 : 10,
              border: collapsed ? 'none' : '4px solid #fff',
              boxShadow: collapsed ? 'none' : '0 4px 10px rgba(0,0,0,0.08)',
            }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          {!collapsed && (
            <>
              <h4 className="text-sm font-semibold" style={{ color: '#111111', margin: '0 0 2px 0' }}>
                {user?.name || 'Dr. Ajesh Anand'}
              </h4>
              <p className="text-xs" style={{ color: '#64748b', margin: 0 }}>Admin</p>
            </>
          )}
        </div>

        {/* Profile Dropdown */}
        {!collapsed && (
          <div
            className="absolute hidden flex-col bg-white rounded-xl border border-gray-200 py-2"
            style={{
              bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)',
              width: 220, boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              zIndex: 1000,
            }}
            ref={(el) => {
              // Show dropdown on focus/focus-within
              if (el) {
                const parent = el.parentElement;
                if (parent) {
                  parent.addEventListener('focus', () => { el.style.display = 'flex'; });
                  parent.addEventListener('focus-within', () => { el.style.display = 'flex'; });
                  parent.addEventListener('blur', () => { setTimeout(() => { if (!parent.contains(document.activeElement)) el.style.display = 'none'; }, 200); });
                  parent.addEventListener('focusout', () => { setTimeout(() => { if (!parent.contains(document.activeElement)) el.style.display = 'none'; }, 200); });
                }
              }
            }}
          >
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc] hover:text-[#111111]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              My Profile
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc] hover:text-[#111111]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Account Settings
            </Link>
            <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />
            <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#475569] hover:bg-[#f8fafc] hover:text-[#111111]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Help & Support
            </Link>
            <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium w-full text-left"
              style={{ color: '#e11d48' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
