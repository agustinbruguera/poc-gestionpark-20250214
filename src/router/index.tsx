import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/organisms/AppLayout';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import ParkingSpotsPage from '../pages/Parking/ParkingSpotsPage';
import ReservationsPage from '../pages/Reservations/ReservationsPage';
import BillingPage from '../pages/Billing/BillingPage';
import SettingsPage from '../pages/Settings/SettingsPage';
import LoginPage from '../pages/Auth/LoginPage';

export const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<AppLayout />}>
      <Route index element={<DashboardPage />} />
      <Route path="parking" element={<ParkingSpotsPage />} />
      <Route path="reservations" element={<ReservationsPage />} />
      <Route path="billing" element={<BillingPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
