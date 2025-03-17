
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthProvider';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useNavigate } from 'react-router-dom';

// Page imports
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
import Index from '@/pages/Index';
import NotFound from '@/components/NotFound';
import Header from '@/components/Header';

// Custom error fallback component to show when there's an error
const ErrorFallback = () => {
  const navigate = useNavigate();
  
  return (
    <ErrorMessage
      title="Something went wrong"
      description="We encountered an error while loading the application. Please try refreshing the page or contact support if the problem persists."
      primaryAction={{
        label: "Refresh page",
        onClick: () => window.location.reload()
      }}
      secondaryAction={{
        label: "Go to homepage",
        onClick: () => navigate('/')
      }}
    />
  );
};

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Header />
              <div className="flex-1">
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
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Toaster />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
