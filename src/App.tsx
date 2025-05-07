
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import { OptimizedAuthProvider } from "./contexts/OptimizedAuthContext";
import { ErrorBoundary } from "./components/ui/error-boundary";
import { useOptimizedAuthContext } from "./hooks/useOptimizedAuthContext";
import { useEffect, lazy, Suspense, useState } from "react";
import AppLoadingScreen from "./components/ui/AppLoadingScreen";

// Layout components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Main pages - Eagerly loaded
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy loaded components
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Services = lazy(() => import("./pages/Services"));
const Blogs = lazy(() => import("./pages/Blogs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const FitnessFacilities = lazy(() => import("./pages/FitnessFacilities"));
const YouthPrograms = lazy(() => import("./pages/YouthPrograms"));
const SpaWellness = lazy(() => import("./pages/SpaWellness"));
const Membership = lazy(() => import("./pages/Membership"));
const Classes = lazy(() => import("./pages/Classes"));
const Timetable = lazy(() => import("./pages/Timetable"));
const OpeningTimes = lazy(() => import("./pages/OpeningTimes"));
const ShopPage = lazy(() => import("./pages/Shop"));
const CategoryPage = lazy(() => import("./pages/shop/CategoryPage"));
const ProductPage = lazy(() => import("./pages/shop/ProductPage"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

// Admin pages - Lazy loaded
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminMembers = lazy(() => import("./pages/admin/Members"));
const AdminClasses = lazy(() => import("./pages/admin/Classes"));
const AdminTrainers = lazy(() => import("./pages/admin/Trainers"));
const AdminPayments = lazy(() => import("./pages/admin/Payments"));
const AdminWorkouts = lazy(() => import("./pages/admin/Workouts"));
const AdminShop = lazy(() => import("./pages/admin/Shop"));
const AdminContent = lazy(() => import("./pages/admin/Content"));
const AdminReports = lazy(() => import("./pages/admin/Reports"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));
const AdminSupport = lazy(() => import("./pages/admin/Support"));

// Trainer subpages
const TrainerProfiles = lazy(() => import("./pages/admin/trainers/TrainerProfiles"));
const PerformanceTracking = lazy(() => import("./pages/admin/trainers/PerformanceTracking"));
const TrainerRatings = lazy(() => import("./pages/admin/trainers/TrainerRatings"));

// Customer Dashboard pages
const DashboardLayout = lazy(() => import("./pages/dashboard/DashboardLayout"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));

// Create a new query client instance with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  }
});

// Loading component for suspense fallback
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gym-dark">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
  </div>
);

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

// Admin redirect component for the home page
const AdminRedirect = () => {
  const { isAuthenticated, isAdmin, isLoading } = useOptimizedAuthContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Wait until auth checking is complete
    if (!isLoading) {
      if (isAuthenticated && isAdmin) {
        console.log('Admin user detected on homepage, redirecting to admin dashboard');
        navigate('/admin', { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, isAdmin, navigate]);
  
  // Show loading indicator while checking
  if (isLoading) {
    return <PageLoading />;
  }
  
  // Show the Index page for non-admin users
  return <Index />;
};

// Main Layout component that includes Header and Footer
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Header />
        <div className="flex-grow">
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

// Admin route guard component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin, isLoading } = useOptimizedAuthContext();
  const location = useLocation();
  
  if (isLoading) {
    return <PageLoading />;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Redirect to dashboard if not admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // User is authenticated and admin, render children
  return <>{children}</>;
};

// User route guard component
const UserRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useOptimizedAuthContext();
  const location = useLocation();
  
  if (isLoading) {
    return <PageLoading />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [appReady, setAppReady] = useState(false);

  // Simulate initial app loading and setup
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAppReady(true);
    }, 800);  // Short delay for loading screen to show
    
    return () => clearTimeout(timeout);
  }, []);

  if (!appReady) {
    return <AppLoadingScreen message="Starting Uptown Gym..." />;
  }
  
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <QueryClientProvider client={queryClient}>
        <OptimizedAuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Main Routes with Header and Footer */}
                <Route element={<MainLayout />}>
                  <Route index element={<AdminRedirect />} />
                  <Route path="/about-us" element={
                    <Suspense fallback={<PageLoading />}>
                      <AboutUs />
                    </Suspense>
                  } />
                  <Route path="/services" element={
                    <Suspense fallback={<PageLoading />}>
                      <Services />
                    </Suspense>
                  } />
                  <Route path="/services/fitness-facilities" element={
                    <Suspense fallback={<PageLoading />}>
                      <FitnessFacilities />
                    </Suspense>
                  } />
                  <Route path="/services/youth-programs" element={
                    <Suspense fallback={<PageLoading />}>
                      <YouthPrograms />
                    </Suspense>
                  } />
                  <Route path="/services/spa-wellness" element={
                    <Suspense fallback={<PageLoading />}>
                      <SpaWellness />
                    </Suspense>
                  } />
                  <Route path="/membership" element={
                    <Suspense fallback={<PageLoading />}>
                      <Membership />
                    </Suspense>
                  } />
                  <Route path="/classes" element={
                    <Suspense fallback={<PageLoading />}>
                      <Classes />
                    </Suspense>
                  } />
                  <Route path="/blogs" element={
                    <Suspense fallback={<PageLoading />}>
                      <Blogs />
                    </Suspense>
                  } />
                  <Route path="/shop" element={
                    <Suspense fallback={<PageLoading />}>
                      <ShopPage />
                    </Suspense>
                  } />
                  <Route path="/shop/category/:categoryId" element={
                    <Suspense fallback={<PageLoading />}>
                      <CategoryPage />
                    </Suspense>
                  } />
                  <Route path="/shop/product/:productId" element={
                    <Suspense fallback={<PageLoading />}>
                      <ProductPage />
                    </Suspense>
                  } />
                  <Route path="/login" element={
                    <Suspense fallback={<PageLoading />}>
                      <Login />
                    </Suspense>
                  } />
                  <Route path="/signup" element={
                    <Suspense fallback={<PageLoading />}>
                      <Signup />
                    </Suspense>
                  } />
                  <Route path="/contact-us" element={
                    <Suspense fallback={<PageLoading />}>
                      <ContactUs />
                    </Suspense>
                  } />
                  <Route path="/timetable" element={
                    <Suspense fallback={<PageLoading />}>
                      <Timetable />
                    </Suspense>
                  } />
                  <Route path="/opening-times" element={
                    <Suspense fallback={<PageLoading />}>
                      <OpeningTimes />
                    </Suspense>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Route>
                
                {/* Admin Routes with protection */}
                <Route path="/admin/*" element={
                  <AdminRoute>
                    <Suspense fallback={<PageLoading />}>
                      <AdminLayout />
                    </Suspense>
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
                    <Suspense fallback={<PageLoading />}>
                      <DashboardLayout />
                    </Suspense>
                  </UserRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </OptimizedAuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
