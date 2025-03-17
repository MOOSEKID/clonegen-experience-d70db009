
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import Login from '@/pages/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';
import Dashboard from '@/pages/dashboard/Dashboard';
import TrainerDashboard from '@/pages/trainers/TrainerDashboard';
import MemberDashboard from '@/pages/members/MemberDashboard';
import StaffDashboard from '@/pages/staff/StaffDashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import PrivateRoute from '@/components/auth/PrivateRoute';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import Index from '@/pages/Index';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Router>
            <div className="min-h-screen">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                
                {/* Protected routes */}
                <Route path="/dashboard/*" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                
                <Route path="/trainer/*" element={
                  <PrivateRoute>
                    <TrainerDashboard />
                  </PrivateRoute>
                } />
                
                <Route path="/member/*" element={
                  <PrivateRoute>
                    <MemberDashboard />
                  </PrivateRoute>
                } />
                
                <Route path="/staff/*" element={
                  <PrivateRoute>
                    <StaffDashboard />
                  </PrivateRoute>
                } />
                
                {/* Admin routes */}
                <Route path="/admin/*" element={
                  <PrivateRoute adminOnly>
                    <AdminDashboard />
                  </PrivateRoute>
                } />
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <Toaster />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
