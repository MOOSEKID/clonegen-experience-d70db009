
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/dashboard/Dashboard';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import NotFound from './components/NotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UserProfile from './pages/dashboard/UserProfile';
import WorkoutsPage from './pages/dashboard/WorkoutsPage';
import ProgressPage from './pages/dashboard/ProgressPage';
import SchedulePage from './pages/dashboard/SchedulePage';
import HealthPage from './pages/dashboard/HealthPage';
import AchievementsPage from './pages/dashboard/AchievementsPage';
import LocationsPage from './pages/dashboard/LocationsPage';
import SettingsPage from './pages/dashboard/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* User Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="workouts" element={<WorkoutsPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="health" element={<HealthPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="locations" element={<LocationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          {/* Admin routes are handled within AdminLayout */}
        </Route>
        
        {/* Fallback route for 404 errors */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
