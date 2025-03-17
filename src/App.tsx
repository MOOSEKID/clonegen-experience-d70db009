import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RouteGuard } from "@/components/auth/RouteGuard";

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
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Admin pages
import AdminClasses from "./pages/admin/Classes";
import AdminTrainers from "./pages/admin/Trainers";
import AdminPayments from "./pages/admin/Payments";
import AdminWorkouts from "./pages/admin/Workouts";
import AdminShop from "./pages/admin/Shop";
import AdminContent from "./pages/admin/Content";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";
import AdminSupport from "./pages/admin/Support";

// Trainer pages
import TrainerProfiles from "./pages/admin/trainers/TrainerProfiles";
import PerformanceTracking from "./pages/admin/trainers/PerformanceTracking";
import TrainerRatings from "./pages/admin/trainers/TrainerRatings";
import TrainerDashboard from "./pages/trainer/TrainerDashboard";

// Customer pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";

// Staff pages
import StaffDashboard from "./pages/staff/StaffDashboard";

// Create a new query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.PROD ? '/clonegen-experience' : '/'}>
            <Routes>
              {/* Public Routes with Header and Footer */}
              <Route path="/" element={
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <div className="flex-grow">
                    <Routes>
                      <Route index element={<Index />} />
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
                      <Route path="/contact-us" element={<ContactUs />} />
                      <Route path="/timetable" element={<Timetable />} />
                      <Route path="/opening-times" element={<OpeningTimes />} />
                    </Routes>
                  </div>
                  <Footer />
                </div>
              } />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Admin Routes */}
              <Route path="/admin/*" element={
                <RouteGuard requiredAccess="full" allowedCategories={['management']}>
                  <AdminLayout />
                </RouteGuard>
              }>
                <Route index element={<Navigate to="trainers" replace />} />
                <Route path="trainers" element={<AdminTrainers />} />
                <Route path="trainers/profiles" element={<TrainerProfiles />} />
                <Route path="trainers/performance" element={<PerformanceTracking />} />
                <Route path="trainers/ratings" element={<TrainerRatings />} />
                <Route path="classes" element={<AdminClasses />} />
                <Route path="payments" element={<AdminPayments />} />
                <Route path="workouts" element={<AdminWorkouts />} />
                <Route path="shop" element={<AdminShop />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="support" element={<AdminSupport />} />
              </Route>
              
              {/* Trainer Routes */}
              <Route path="/trainer/*" element={
                <RouteGuard requiredAccess="basic" allowedCategories={['training']}>
                  <DashboardLayout />
                </RouteGuard>
              }>
                <Route index element={<TrainerDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Customer Routes */}
              <Route path="/customer/*" element={
                <RouteGuard requiredAccess="limited" allowedCategories={['customer']}>
                  <DashboardLayout />
                </RouteGuard>
              }>
                <Route index element={<CustomerDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Staff Routes */}
              <Route path="/staff/*" element={
                <RouteGuard requiredAccess="basic" allowedCategories={['operations', 'reception', 'maintenance']}>
                  <DashboardLayout />
                </RouteGuard>
              }>
                <Route index element={<StaffDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
