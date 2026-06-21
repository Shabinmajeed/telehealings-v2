import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import customInstance from './api/custom-instance';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SessionsPage from './pages/SessionsPage';
import ClientsPage from './pages/ClientsPage';
import CalendarPage from './pages/CalendarPage';
import MessagesPage from './pages/MessagesPage';
import ResourcesPage from './pages/ResourcesPage';
import EarningsPage from './pages/EarningsPage';
import ToolsPage from './pages/ToolsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

// Simple auth check
function isAuthenticated(): boolean {
  try {
    return !!localStorage.getItem('auth_token');
  } catch {
    return false;
  }
}

function logout() {
  try { localStorage.removeItem('auth_token'); } catch { /* ignore */ }
  window.location.href = '/login';
}

function App() {
  const authed = isAuthenticated();

  // Validate token on app load
  useEffect(() => {
    if (authed) {
      customInstance.get('/api/auth/me').catch(() => {
        logout();
      });
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={authed ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/register" element={authed ? <Navigate to="/dashboard" /> : <RegisterPage />} />
      <Route path="/dashboard" element={authed ? <DashboardPage /> : <Navigate to="/login" />} />
      <Route path="/sessions" element={authed ? <SessionsPage /> : <Navigate to="/login" />} />
      <Route path="/clients" element={authed ? <ClientsPage /> : <Navigate to="/login" />} />
      <Route path="/calendar" element={authed ? <CalendarPage /> : <Navigate to="/login" />} />
      <Route path="/messages" element={authed ? <MessagesPage /> : <Navigate to="/login" />} />
      <Route path="/resources" element={authed ? <ResourcesPage /> : <Navigate to="/login" />} />
      <Route path="/earnings" element={authed ? <EarningsPage /> : <Navigate to="/login" />} />
      <Route path="/tools" element={authed ? <ToolsPage /> : <Navigate to="/login" />} />
      <Route path="/profile" element={authed ? <ProfilePage /> : <Navigate to="/login" />} />
      <Route path="/settings" element={authed ? <SettingsPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={authed ? '/dashboard' : '/login'} />} />
    </Routes>
  );
}

export default App;
