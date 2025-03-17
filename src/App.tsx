
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthProvider';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import Header from '@/components/Header';

// Public pages
import Index from '@/pages/Index';
import AboutUs from '@/pages/AboutUs';
import Classes from '@/pages/Classes';
import ContactUs from '@/pages/ContactUs';
import FitnessFacilities from '@/pages/services/FitnessFacilities';
import Login from '@/pages/auth/Login';
import Membership from '@/pages/Membership';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/auth/Register';
import SpaWellness from '@/pages/services/SpaWellness';
import YouthPrograms from '@/pages/services/YouthPrograms';
import Timetable from '@/pages/Timetable';
import Blogs from '@/pages/Blogs';
import Shop from '@/pages/Shop';

// Dashboard pages
import DashboardLayout from '@/pages/dashboard/DashboardLayout';
import Dashboard from '@/pages/dashboard/Dashboard';
import CustomerDashboard from '@/pages/dashboard/CustomerDashboard';

// Admin dashboard
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminHome from '@/pages/admin/DashboardHome';
import MemberManagement from "./pages/admin/MemberManagement";
import Members from '@/pages/admin/Members';
import Trainers from '@/pages/admin/Trainers';
import AdminClasses from '@/pages/admin/Classes';
import Reports from '@/pages/admin/Reports';
import Settings from '@/pages/admin/Settings';
import TrainerProfiles from '@/pages/admin/trainers/TrainerProfiles';
import TrainerRatings from '@/pages/admin/trainers/TrainerRatings';
import PerformanceTracking from '@/pages/admin/trainers/PerformanceTracking';

function App() {
  console.log("App component rendering");
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/facilities" element={<FitnessFacilities />} />
            <Route path="/login" element={<Login />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/register" element={<Register />} />
            <Route path="/spa-wellness" element={<SpaWellness />} />
            <Route path="/youth-programs" element={<YouthPrograms />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/services" element={<FitnessFacilities />} />

            {/* Dashboard routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="customer" element={<CustomerDashboard />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="dashboard" element={<AdminHome />} />
              <Route path="members" element={<Members />} />
              <Route path="trainers" element={<Trainers />}>
                <Route path="profiles" element={<TrainerProfiles />} />
                <Route path="ratings" element={<TrainerRatings />} />
                <Route path="performance" element={<PerformanceTracking />} />
              </Route>
              <Route path="classes" element={<AdminClasses />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <SonnerToaster position="top-right" />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
