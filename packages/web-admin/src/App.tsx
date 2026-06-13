import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TherapistsPage from './pages/TherapistsPage';
import ClientsPage from './pages/ClientsPage';
import SessionsPage from './pages/SessionsPage';
import FinancialsPage from './pages/FinancialsPage';
import CommunicationsPage from './pages/CommunicationsPage';
import CompliancePage from './pages/CompliancePage';
import ContentPage from './pages/ContentPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PromotionPage from './pages/PromotionPage';
import DashboardLayout from './components/layout/DashboardLayout';

function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="therapists" element={<TherapistsPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="sessions" element={<SessionsPage />} />
        <Route path="financials" element={<FinancialsPage />} />
        <Route path="communications" element={<CommunicationsPage />} />
        <Route path="compliance" element={<CompliancePage />} />
        <Route path="content" element={<ContentPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="promotion" element={<PromotionPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
