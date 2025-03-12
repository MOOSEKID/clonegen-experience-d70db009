
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import FitnessFacilities from "./pages/FitnessFacilities";
import YouthPrograms from "./pages/YouthPrograms";
import SpaWellness from "./pages/SpaWellness";
import Membership from "./pages/Membership";
import Classes from "./pages/Classes";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import Timetable from "./pages/Timetable";
import OpeningTimes from "./pages/OpeningTimes";
import ShopPage from "./pages/Shop";
import AdminLayout from "./pages/admin/AdminLayout";
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

// Customer Dashboard imports
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Routes with Header and Footer */}
          <Route path="*" element={
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
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="/timetable" element={<Timetable />} />
                  <Route path="/opening-times" element={<OpeningTimes />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="classes" element={<AdminClasses />} />
            <Route path="trainers" element={<AdminTrainers />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="workouts" element={<AdminWorkouts />} />
            <Route path="shop" element={<AdminShop />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="support" element={<AdminSupport />} />
          </Route>
          
          {/* Customer Dashboard Routes */}
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            {/* Additional dashboard routes will be added as needed */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
