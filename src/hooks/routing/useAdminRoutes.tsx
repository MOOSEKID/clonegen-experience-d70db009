
import { Suspense, lazy } from "react";
import { PageLoading } from "../../routes/RouteComponents";
import { Route } from "react-router-dom";

// Admin pages - Lazy loaded
const AdminDashboard = lazy(() => import("../../pages/admin/Dashboard"));
const AdminMembers = lazy(() => import("../../pages/admin/Members"));
const AdminClasses = lazy(() => import("../../pages/admin/Classes"));
const AdminTrainers = lazy(() => import("../../pages/admin/Trainers"));
const AdminPayments = lazy(() => import("../../pages/admin/Payments"));
const AdminWorkouts = lazy(() => import("../../pages/admin/Workouts"));
const AdminShop = lazy(() => import("../../pages/admin/Shop"));
const AdminContent = lazy(() => import("../../pages/admin/Content"));
const AdminReports = lazy(() => import("../../pages/admin/Reports"));
const AdminSettings = lazy(() => import("../../pages/admin/Settings"));
const GeneralSettings = lazy(() => import("../../pages/admin/settings/General"));
const SecuritySettings = lazy(() => import("../../pages/admin/settings/Security"));
const BusinessHours = lazy(() => import("../../pages/admin/settings/BusinessHours"));
const Holidays = lazy(() => import("../../pages/admin/settings/Holidays"));
const Platform = lazy(() => import("../../pages/admin/settings/Platform"));
const Integrations = lazy(() => import("../../pages/admin/settings/Integrations"));
const AdminSupport = lazy(() => import("../../pages/admin/Support"));
const TestAccounts = lazy(() => import("../../pages/admin/TestAccounts"));

// Admin Workout subpages
const AdminWorkoutPrograms = lazy(() => import("../../pages/admin/workouts/WorkoutPrograms"));
const AdminExerciseLibrary = lazy(() => import("../../pages/admin/workouts/ExerciseLibrary"));
const AdminProgressTracking = lazy(() => import("../../pages/admin/workouts/ProgressTracking"));
const AddExercise = lazy(() => import("../../pages/admin/workouts/AddExercise"));
const CreateProgram = lazy(() => import("../../pages/admin/workouts/CreateProgram"));
const GenerateReports = lazy(() => import("../../pages/admin/workouts/GenerateReports"));

// Trainer subpages
const TrainerProfiles = lazy(() => import("../../pages/admin/trainers/TrainerProfiles"));
const PerformanceTracking = lazy(() => import("../../pages/admin/trainers/PerformanceTracking"));
const TrainerRatings = lazy(() => import("../../pages/admin/trainers/TrainerRatings"));

// Payment subpages
const Subscriptions = lazy(() => import("../../pages/admin/payments/Subscriptions"));
const Invoices = lazy(() => import("../../pages/admin/payments/Invoices"));
const PaymentMethods = lazy(() => import("../../pages/admin/payments/Methods"));

/**
 * Hook to provide admin routes for the application
 * @returns JSX elements containing the routes
 */
export const useAdminRoutes = () => {
  return (
    <>
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
    </>
  );
};

export default useAdminRoutes;
