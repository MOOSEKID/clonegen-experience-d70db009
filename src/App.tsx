
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/ui/error-boundary";
import { useEffect, useState } from "react";
import AppLoadingScreen from "./components/ui/AppLoadingScreen";

// Layouts and shared components
import { MainLayout, ErrorFallback, PageLoading, AdminRoute, UserRoute } from "./routes/RouteComponents";

// Import page components for main routes
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { lazy, Suspense } from "react";

// Lazy loaded components for main routes
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
const GeneralSettings = lazy(() => import("./pages/admin/settings/General"));
const SecuritySettings = lazy(() => import("./pages/admin/settings/Security"));
const BusinessHours = lazy(() => import("./pages/admin/settings/BusinessHours"));
const Holidays = lazy(() => import("./pages/admin/settings/Holidays"));
const Platform = lazy(() => import("./pages/admin/settings/Platform"));
const Integrations = lazy(() => import("./pages/admin/settings/Integrations"));
const AdminSupport = lazy(() => import("./pages/admin/Support"));
const TestAccounts = lazy(() => import("./pages/admin/TestAccounts"));

// Admin Workout subpages
const AdminWorkoutPrograms = lazy(() => import("./pages/admin/workouts/WorkoutPrograms"));
const AdminExerciseLibrary = lazy(() => import("./pages/admin/workouts/ExerciseLibrary"));
const AdminProgressTracking = lazy(() => import("./pages/admin/workouts/ProgressTracking"));
const AddExercise = lazy(() => import("./pages/admin/workouts/AddExercise"));
const CreateProgram = lazy(() => import("./pages/admin/workouts/CreateProgram"));
const GenerateReports = lazy(() => import("./pages/admin/workouts/GenerateReports"));

// Trainer subpages
const TrainerProfiles = lazy(() => import("./pages/admin/trainers/TrainerProfiles"));
const PerformanceTracking = lazy(() => import("./pages/admin/trainers/PerformanceTracking"));
const TrainerRatings = lazy(() => import("./pages/admin/trainers/TrainerRatings"));

// Payment subpages
const Subscriptions = lazy(() => import("./pages/admin/payments/Subscriptions"));
const Invoices = lazy(() => import("./pages/admin/payments/Invoices"));
const PaymentMethods = lazy(() => import("./pages/admin/payments/Methods"));

// Dashboard pages
const DashboardLayout = lazy(() => import("./pages/dashboard/DashboardLayout"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Workouts = lazy(() => import("./pages/dashboard/Workouts"));
const Progress = lazy(() => import("./pages/dashboard/Progress"));
const Schedule = lazy(() => import("./pages/dashboard/Schedule"));
const Health = lazy(() => import("./pages/dashboard/Health"));
const Achievements = lazy(() => import("./pages/dashboard/Achievements"));
const Locations = lazy(() => import("./pages/dashboard/Locations"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const WorkoutPrograms = lazy(() => import("./pages/dashboard/WorkoutPrograms"));
const ExerciseLibrary = lazy(() => import("./pages/dashboard/ExerciseLibrary"));
const NutritionTracking = lazy(() => import("./pages/dashboard/NutritionTracking"));

import { QueryProvider } from "./routes/QueryProvider";

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
      <QueryProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Main Routes with Header and Footer */}
                <Route element={<MainLayout />}>
                  <Route index element={<Index />} />
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
                
                {/* Admin Routes */}
                <Route path="/admin" element={
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
                  <Route path="payments/subscriptions" element={<Subscriptions />} />
                  <Route path="payments/invoices" element={<Invoices />} />
                  <Route path="payments/methods" element={<PaymentMethods />} />
                  <Route path="workouts" element={<AdminWorkouts />} />
                  <Route path="workout-programs" element={<AdminWorkoutPrograms />} />
                  <Route path="exercises" element={<AdminExerciseLibrary />} />
                  <Route path="progress-tracking" element={<AdminProgressTracking />} />
                  {/* Workout-related routes */}
                  <Route path="workouts/create-program" element={<CreateProgram />} />
                  <Route path="workouts/add-exercise" element={<AddExercise />} />
                  <Route path="workouts/generate-reports" element={<GenerateReports />} />
                  <Route path="shop" element={<AdminShop />} />
                  <Route path="content" element={<AdminContent />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="settings/general" element={
                    <Suspense fallback={<PageLoading />}>
                      <GeneralSettings />
                    </Suspense>
                  } />
                  <Route path="settings/security" element={
                    <Suspense fallback={<PageLoading />}>
                      <SecuritySettings />
                    </Suspense>
                  } />
                  <Route path="settings/business-hours" element={
                    <Suspense fallback={<PageLoading />}>
                      <BusinessHours />
                    </Suspense>
                  } />
                  <Route path="settings/holidays" element={
                    <Suspense fallback={<PageLoading />}>
                      <Holidays />
                    </Suspense>
                  } />
                  <Route path="settings/platform" element={
                    <Suspense fallback={<PageLoading />}>
                      <Platform />
                    </Suspense>
                  } />
                  <Route path="settings/integrations" element={
                    <Suspense fallback={<PageLoading />}>
                      <Integrations />
                    </Suspense>
                  } />
                  <Route path="support" element={<AdminSupport />} />
                  <Route path="test-accounts" element={<TestAccounts />} />
                </Route>
                
                {/* Dashboard Routes */}
                <Route path="/dashboard" element={
                  <UserRoute>
                    <Suspense fallback={<PageLoading />}>
                      <DashboardLayout />
                    </Suspense>
                  </UserRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="workouts" element={<Workouts />} />
                  <Route path="progress" element={<Progress />} />
                  <Route path="workout-programs" element={<WorkoutPrograms />} />
                  <Route path="exercise-library" element={<ExerciseLibrary />} />
                  <Route path="nutrition" element={<NutritionTracking />} />
                  <Route path="schedule" element={<Schedule />} />
                  <Route path="health" element={<Health />} />
                  <Route path="achievements" element={<Achievements />} />
                  <Route path="locations" element={<Locations />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};

export default App;
