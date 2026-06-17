import { Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/sessions" element={<SessionsPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/earnings" element={<EarningsPage />} />
      <Route path="/tools" element={<ToolsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
