import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/ui/error-boundary";
import { useAuth } from "./hooks/useAuth";

// Layout components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardLayout from "./pages/dashboard/DashboardLayout";

// Main pages
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Blogs from "./pages/Blogs";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

// Service pages
import FitnessFacilities from "./pages/FitnessFacilities";
import YouthPrograms from "./pages/YouthPrograms";
import SpaWellness from "./pages/SpaWellness";
import Membership from "./pages/Membership";
import Classes from "./pages/Classes";
import Timetable from "./pages/Timetable";
import OpeningTimes from "./pages/OpeningTimes";

// Shop pages
import ShopPage from "./pages/Shop";
import CategoryPage from "./pages/shop/CategoryPage";
import ProductPage from "./pages/shop/ProductPage";

// Auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminMembers from "./pages/admin/Members";
import AdminClasses from "./pages/admin/Classes";
import AdminTrainers from "./pages/admin/Trainers";
import AdminPayments from "./pages/admin/Payments";
import AdminWorkouts from "./pages/admin/Workouts";
import AdminShop from "./pages/admin/Shop";
import AdminContent from "./pages/admin/Content";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";
import AdminSupport from "./pages/admin/Support";

// Trainer subpages
import TrainerProfiles from "./pages/admin/trainers/TrainerProfiles";
import PerformanceTracking from "./pages/admin/trainers/PerformanceTracking";
import TrainerRatings from "./pages/admin/trainers/TrainerRatings";

// Customer Dashboard pages
import Dashboard from "./pages/dashboard/Dashboard";

// Create a new query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

// Error fallback component
const ErrorFallback = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-red-50 text-red-800">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-4">The application encountered an error. Please try refreshing the page.</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Refresh Page
      </button>
    </div>
  );
};

// Admin route guard component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const navigate = useLocation();
  
  console.log('AdminRoute check:', { isAuthenticated, isAdmin, isLoading, path: navigate.pathname });
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login from admin route');
    return <Navigate to="/login" state={{ from: navigate.pathname }} replace />;
  }
  
  if (!isAdmin) {
    console.log('User not admin, redirecting to dashboard from admin route');
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

// User route guard component
const UserRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useLocation();
  
  console.log('UserRoute check:', { isAuthenticated, isLoading, path: navigate.pathname });
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login from user route');
    return <Navigate to="/login" state={{ from: navigate.pathname }} replace />;
  }
  
  return <>{children}</>;
};

// Admin redirect component for the home page
const AdminRedirect = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  
  console.log('Home page admin redirect check:', { isAuthenticated, isAdmin, isLoading });
  
  // Only redirect after loading is complete
  if (!isLoading && isAuthenticated && isAdmin) {
    console.log('Admin user on homepage, redirecting to admin dashboard');
    return <Navigate to="/admin" replace />;
  }
  
  // Otherwise show the Index page
  return <Index />;
};

// Main Layout component that includes Header and Footer
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Header />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

const App = () => {
  console.log("App component rendering"); // Debug log
  
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Main Routes with Header and Footer */}
                <Route element={<MainLayout />}>
                  <Route index element={<AdminRedirect />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/fitness-facilities" element={<FitnessFacilities />} />
                  <Route path="/services/youth-programs" element={<YouthPrograms />} />
                  <Route path="/services/spa-wellness" element={<SpaWellness />} />
                  <Route path="/membership" element={<Membership />} />
                  <Route path="/classes" element={<Classes />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/shop/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/shop/product/:productId" element={<ProductPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/timetable" element={<Timetable />} />
                  <Route path="/opening-times" element={<OpeningTimes />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                
                {/* Admin Routes with protection */}
                <Route path="/admin/*" element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="members" element={<AdminMembers />} />
                  <Route path="classes" element={<AdminClasses />} />
                  <Route path="trainers" element={<AdminTrainers />} />
                  <Route path="trainers/profiles" element={<TrainerProfiles />} />
                  <Route path="trainers/performance" element={<PerformanceTracking />} />
                  <Route path="trainers/ratings" element={<TrainerRatings />} />
                  <Route path="payments" element={<AdminPayments />} />
                  <Route path="workouts" element={<AdminWorkouts />} />
                  <Route path="shop" element={<AdminShop />} />
                  <Route path="content" element={<AdminContent />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="support" element={<AdminSupport />} />
                </Route>
                
                {/* Customer Dashboard Routes with protection */}
                <Route path="/dashboard/*" element={
                  <UserRoute>
                    <DashboardLayout />
                  </UserRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
