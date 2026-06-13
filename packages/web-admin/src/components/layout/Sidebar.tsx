import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import * as Icons from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Icons.LayoutDashboard },
  { path: '/therapists', label: 'Therapists', icon: Icons.User },
  { path: '/clients', label: 'Clients', icon: Icons.Users },
  { path: '/sessions', label: 'Sessions & Schedule', icon: Icons.Calendar },
  { path: '/content', label: 'Content Management', icon: Icons.BookOpen },
  { path: '/communications', label: 'Communications', icon: Icons.MessageSquare },
  { path: '/compliance', label: 'Compliance', icon: Icons.Shield },
  { path: '/financials', label: 'Financials', icon: Icons.DollarSign },
  { path: '/analytics', label: 'Analytics & Reporting', icon: Icons.BarChart },
  { path: '/promotion', label: 'Promotion & Offers', icon: Icons.Tag },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const logout = useAuthStore((s) => s.logout);

  return (
    <aside
      className="flex flex-col border-r border-black/5 bg-white flex-shrink-0 relative z-10 transition-all duration-300"
      style={{ width: collapsed ? 88 : 280, padding: collapsed ? '30px 10px' : '30px 20px', overflow: 'visible' }}
    >
      {/* Brand */}
      <div className="flex items-center justify-between mb-8" style={{ padding: collapsed ? 0 : '0 10px' }}>
        {!collapsed && <span className="text-xl font-bold text-black">Telehealings</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-text-muted p-1 rounded-md hover:bg-surface-secondary flex items-center justify-center">
          <Icons.ChevronLeft size={20} className="transition-transform duration-300" style={{ transform: collapsed ? 'rotate(180deg)' : 'none' }} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 flex-grow overflow-y-auto">
        {navItems.map((item) => {
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
      </nav>

      {/* Logout */}
      <button onClick={logout} className="flex items-center gap-3.5 text-red-600 font-semibold text-[15px] mt-5 p-2 rounded-lg hover:bg-red-50">
        <Icons.LogOut size={20} />
        {!collapsed && <span>Logout</span>}
      </button>
    </aside>
  );
};

export default Sidebar;
