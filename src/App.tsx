import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/Login';
import { RegisterPatientPage } from './pages/RegisterPatient';
import { RegisterProfessionalPage } from './pages/RegisterProfessional';
import { DashboardProfessional } from './pages/DashboardProfessional';
import { DashboardPatient } from './pages/DashboardPatient';
import { ServicesListPage } from './pages/ServicesList';
import { ScheduleWizardPage } from './pages/ScheduleWizard';
import { MyAppointmentsPage } from './pages/MyAppointments';
import { AccessibilitySettingsPage } from './pages/AccessibilitySettings';
import { NotFoundPage } from './pages/NotFound';
import { ToastProvider } from './components/ToastManager';

const Protected: React.FC<React.PropsWithChildren<{ role?: 'professional' | 'patient' }>> = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/profissional" element={<Protected role="professional"><DashboardProfessional /></Protected>} />
            <Route path="/servicos" element={<Protected role="professional"><ServicesListPage /></Protected>} />
          <Route path="/paciente" element={<Protected role="patient"><DashboardPatient /></Protected>} />
          <Route path="/agendar" element={<Protected role="patient"><ScheduleWizardPage /></Protected>} />
          <Route path="/meus-agendamentos" element={<Protected role="patient"><MyAppointmentsPage /></Protected>} />
          <Route path="/acessibilidade" element={<Protected><AccessibilitySettingsPage /></Protected>} />
          <Route path="/registrar/paciente" element={<RegisterPatientPage />} />
          <Route path="/registrar/profissional" element={<RegisterProfessionalPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </ToastProvider>
  );
};

export default App;
