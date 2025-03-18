import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthProvider';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { ErrorMessage } from '@/components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

// Page imports
import Login from '@/pages/auth/Login';
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
import NotFound from '@/pages/NotFound';
import Membership from '@/pages/Membership';
import Classes from '@/pages/Classes';
import Blogs from '@/pages/Blogs';
import Shop from '@/pages/Shop';
import Services from '@/pages/Services';
import FitnessFacilities from '@/pages/FitnessFacilities';
import YouthPrograms from '@/pages/YouthPrograms';
import SpaWellness from '@/pages/SpaWellness';
import AboutUs from '@/pages/AboutUs';
import ContactUs from '@/pages/ContactUs';
import Timetable from '@/pages/Timetable';
import OpeningTimes from '@/pages/OpeningTimes';

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
                  <Route path="/login" element={
                    <ErrorBoundary fallback={<div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Login Error</h1>
                        <p>There was an error loading the login page.</p>
                        <button 
                          onClick={() => window.location.reload()}
                          className="mt-4 px-4 py-2 bg-gym-orange text-white rounded"
                        >
                          Reload Page
                        </button>
                      </div>
                    </div>}>
                      <Login />
                    </ErrorBoundary>
                  } />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  
                  {/* Main navigation routes */}
                  <Route path="/membership" element={<Membership />} />
                  <Route path="/classes" element={<Classes />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/shop" element={<Shop />} />
                  
                  {/* Services dropdown routes */}
                  <Route path="/services" element={<Services />} />
                  <Route path="/facilities" element={<FitnessFacilities />} />
                  <Route path="/youth-programs" element={<YouthPrograms />} />
                  <Route path="/spa-wellness" element={<SpaWellness />} />
                  
                  {/* Company dropdown routes */}
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/timetable" element={<Timetable />} />
                  <Route path="/opening-times" element={<OpeningTimes />} />
                  
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
