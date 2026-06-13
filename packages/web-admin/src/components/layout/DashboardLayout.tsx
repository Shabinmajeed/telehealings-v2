import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'linear-gradient(110deg, #ffffff 0%, #eef5fc 35%, #7aaaf6 100%)' }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
