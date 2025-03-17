import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, lazy } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import ScrollToTop from '@/components/ScrollToTop';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminRoute from '@/components/auth/AdminRoute';

// Lazy-loaded pages
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Classes = lazy(() => import('@/pages/Classes'));
const ClassDetails = lazy(() => import('@/pages/ClassDetails'));
const Trainers = lazy(() => import('@/pages/Trainers'));
const TrainerDetails = lazy(() => import('@/pages/TrainerDetails'));
const Contact = lazy(() => import('@/pages/Contact'));
const Login = lazy(() => import('@/pages/auth/Login'));
const Signup = lazy(() => import('@/pages/auth/Signup'));
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const PrivacyPolicy = lazy(() => import('@/pages/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('@/pages/legal/TermsOfService'));

// Dashboard pages
const DashboardLayout = lazy(() => import('@/pages/dashboard/DashboardLayout'));
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const Workouts = lazy(() => import('@/pages/dashboard/Workouts'));
const WorkoutDetails = lazy(() => import('@/pages/dashboard/WorkoutDetails'));
const Progress = lazy(() => import('@/pages/dashboard/Progress'));
const Nutrition = lazy(() => import('@/pages/dashboard/Nutrition'));
const Billing = lazy(() => import('@/pages/dashboard/Billing'));
const Notifications = lazy(() => import('@/pages/dashboard/Notifications'));
const Settings = lazy(() => import('@/pages/dashboard/Settings'));
const ClassSchedule = lazy(() => import('@/pages/dashboard/ClassSchedule'));

// Admin pages
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminMembers = lazy(() => import('@/pages/admin/AdminMembers'));
const AdminTrainers = lazy(() => import('@/pages/admin/AdminTrainers'));
const AdminClasses = lazy(() => import('@/pages/admin/AdminClasses'));
const AdminSettings = lazy(() => import('@/pages/admin/AdminSettings'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/classes/:id" element={<ClassDetails />} />
                    <Route path="/trainers" element={<Trainers />} />
                    <Route path="/trainers/:id" element={<TrainerDetails />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfService />} />

                    {/* Protected customer dashboard routes */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route index element={<Dashboard />} />
                      <Route path="workouts" element={<Workouts />} />
                      <Route path="workouts/:id" element={<WorkoutDetails />} />
                      <Route path="classes" element={<ClassSchedule />} />
                      <Route path="progress" element={<Progress />} />
                      <Route path="nutrition" element={<Nutrition />} />
                      <Route path="billing" element={<Billing />} />
                      <Route path="notifications" element={<Notifications />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>

                    {/* Protected admin routes */}
                    <Route
                      path="/admin"
                      element={
                        <AdminRoute>
                          <AdminLayout />
                        </AdminRoute>
                      }
                    >
                      <Route index element={<AdminDashboard />} />
                      <Route path="members" element={<AdminMembers />} />
                      <Route path="trainers" element={<AdminTrainers />} />
                      <Route path="classes" element={<AdminClasses />} />
                      <Route path="settings" element={<AdminSettings />} />
                    </Route>

                    {/* 404 route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </Router>
          <Toaster position="top-right" />
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
