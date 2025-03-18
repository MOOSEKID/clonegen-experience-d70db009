
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthProvider';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { ErrorMessage } from '@/components/ErrorMessage';
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
  console.log("App component rendering");
  
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Header />
              <div className="flex-1 pt-16 md:pt-20"> {/* Added padding top to account for fixed header */}
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
                  <Route path="/membership" element={
                    <ErrorBoundary fallback={<div className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Failed to load Membership page</h2>
                      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gym-orange text-white rounded">
                        Reload
                      </button>
                    </div>}>
                      <Membership />
                    </ErrorBoundary>
                  } />
                  <Route path="/classes" element={
                    <ErrorBoundary fallback={<div className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Failed to load Classes page</h2>
                      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gym-orange text-white rounded">
                        Reload
                      </button>
                    </div>}>
                      <Classes />
                    </ErrorBoundary>
                  } />
                  <Route path="/blogs" element={
                    <ErrorBoundary fallback={<div className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Failed to load Blogs page</h2>
                      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gym-orange text-white rounded">
                        Reload
                      </button>
                    </div>}>
                      <Blogs />
                    </ErrorBoundary>
                  } />
                  <Route path="/shop" element={
                    <ErrorBoundary fallback={<div className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Failed to load Shop page</h2>
                      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gym-orange text-white rounded">
                        Reload
                      </button>
                    </div>}>
                      <Shop />
                    </ErrorBoundary>
                  } />
                  
                  {/* Services dropdown routes */}
                  <Route path="/services" element={
                    <ErrorBoundary fallback={<div className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Failed to load Services page</h2>
                      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gym-orange text-white rounded">
                        Reload
                      </button>
                    </div>}>
                      <Services />
                    </ErrorBoundary>
                  } />
                  <Route path="/facilities" element={
                    <ErrorBoundary fallback={<div className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Failed to load Facilities page</h2>
                      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gym-orange text-white rounded">
                        Reload
                      </button>
                    </div>}>
                      <FitnessFacilities />
                    </ErrorBoundary>
                  } />
                  <Route path="/youth-programs" element={
                    <ErrorBoundary fallback={<div className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Failed to load Youth Programs page</h2>
                      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gym-orange text-white rounded">
                        Reload
                      </button>
                    </div>}>
                      <YouthPrograms />
                    </ErrorBoundary>
                  } />
                  <Route path="/spa-wellness" element={
                    <ErrorBoundary fallback={<div className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Failed to load Spa & Wellness page</h2>
                      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gym-orange text-white rounded">
                        Reload
                      </button>
                    </div>}>
                      <SpaWellness />
                    </ErrorBoundary>
                  } />
                  
                  {/* Company dropdown routes */}
                  <Route path="/about-us" element={
                    <ErrorBoundary fallback={<div className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Failed to load About Us page</h2>
                      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gym-orange text-white rounded">
                        Reload
                      </button>
                    </div>}>
                      <AboutUs />
                    </ErrorBoundary>
                  } />
                  <Route path="/contact-us" element={
                    <ErrorBoundary fallback={<div className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Failed to load Contact Us page</h2>
                      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gym-orange text-white rounded">
                        Reload
                      </button>
                    </div>}>
                      <ContactUs />
                    </ErrorBoundary>
                  } />
                  <Route path="/timetable" element={
                    <ErrorBoundary fallback={<div className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Failed to load Timetable page</h2>
                      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gym-orange text-white rounded">
                        Reload
                      </button>
                    </div>}>
                      <Timetable />
                    </ErrorBoundary>
                  } />
                  <Route path="/opening-times" element={
                    <ErrorBoundary fallback={<div className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Failed to load Opening Times page</h2>
                      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-gym-orange text-white rounded">
                        Reload
                      </button>
                    </div>}>
                      <OpeningTimes />
                    </ErrorBoundary>
                  } />
                  
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
