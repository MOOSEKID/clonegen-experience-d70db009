import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

// Import pages
import Index from './pages/Index';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Membership from './pages/Membership';
import Classes from './pages/Classes';
import Blogs from './pages/Blogs';
import Services from './pages/Services';
import FitnessFacilities from './pages/services/FitnessFacilities';
import YouthPrograms from './pages/services/YouthPrograms';
import SpaWellness from './pages/services/SpaWellness';
import Timetable from './pages/Timetable';
import OpeningTimes from './pages/OpeningTimes';
import Shop from './pages/Shop';
import CategoryPage from './pages/shop/CategoryPage';
import ProductPage from './pages/shop/ProductPage';

// Import Admin pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import Members from './pages/admin/Members';
import Trainers from './pages/admin/Trainers';
import TrainerProfiles from './pages/admin/trainers/TrainerProfiles';
import PerformanceTracking from './pages/admin/trainers/PerformanceTracking';
import TrainerRatings from './pages/admin/trainers/TrainerRatings';
import AdminClasses from './pages/admin/Classes';
import Workouts from './pages/admin/Workouts';
import AdminShop from './pages/admin/Shop';
import Content from './pages/admin/Content';
import Payments from './pages/admin/Payments';
import Reports from './pages/admin/Reports';
import Settings from './pages/admin/Settings';
import Support from './pages/admin/Support';

// Import Customer Dashboard pages
import DashboardLayout from './pages/dashboard/DashboardLayout';
import CustomerDashboard from './pages/dashboard/CustomerDashboard';

import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';

function App() {
  const location = useLocation();
  const [isInAdminPanel, setIsInAdminPanel] = useState(false);
  const [isInCustomerDashboard, setIsInCustomerDashboard] = useState(false);

  useEffect(() => {
    setIsInAdminPanel(location.pathname.startsWith('/admin'));
    setIsInCustomerDashboard(location.pathname.startsWith('/dashboard'));
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      {!isInAdminPanel && !isInCustomerDashboard && <Header />}
      
      <main className={cn(
        "flex-1", 
        isInAdminPanel && "bg-gray-100",
        isInCustomerDashboard && "bg-gym-dark"
      )}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/fitness-facilities" element={<FitnessFacilities />} />
          <Route path="/services/youth-programs" element={<YouthPrograms />} />
          <Route path="/services/spa-wellness" element={<SpaWellness />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/opening-times" element={<OpeningTimes />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<CategoryPage />} />
          <Route path="/shop/product/:id" element={<ProductPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} />
          
          {/* Customer Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<CustomerDashboard />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="trainers" element={<Trainers />} />
            <Route path="trainers/profiles" element={<TrainerProfiles />} />
            <Route path="trainers/performance" element={<PerformanceTracking />} />
            <Route path="trainers/ratings" element={<TrainerRatings />} />
            <Route path="classes" element={<AdminClasses />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="shop" element={<AdminShop />} />
            <Route path="content" element={<Content />} />
            <Route path="payments" element={<Payments />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {!isInAdminPanel && !isInCustomerDashboard && <Footer />}
    </div>
  );
}

export default App;
