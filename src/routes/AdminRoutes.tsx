
import { lazy, Suspense, Fragment } from "react";
import { Route } from "react-router-dom";
import { AdminRoute, PageLoading } from "./RouteComponents";

// Admin pages - Lazy loaded
const AdminLayout = lazy(() => import("../pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminMembers = lazy(() => import("../pages/admin/Members"));
const AdminClasses = lazy(() => import("../pages/admin/Classes"));
const AdminTrainers = lazy(() => import("../pages/admin/Trainers"));
const AdminPayments = lazy(() => import("../pages/admin/Payments"));
const AdminWorkouts = lazy(() => import("../pages/admin/Workouts"));
const AdminShop = lazy(() => import("../pages/admin/Shop"));
const AdminContent = lazy(() => import("../pages/admin/Content"));
const AdminReports = lazy(() => import("../pages/admin/Reports"));
const AdminSettings = lazy(() => import("../pages/admin/Settings"));
const AdminSupport = lazy(() => import("../pages/admin/Support"));
const TestAccounts = lazy(() => import("../pages/admin/TestAccounts"));

// Trainer subpages
const TrainerProfiles = lazy(() => import("../pages/admin/trainers/TrainerProfiles"));
const PerformanceTracking = lazy(() => import("../pages/admin/trainers/PerformanceTracking"));
const TrainerRatings = lazy(() => import("../pages/admin/trainers/TrainerRatings"));

// Payment subpages
const Subscriptions = lazy(() => import("../pages/admin/payments/Subscriptions"));
const Invoices = lazy(() => import("../pages/admin/payments/Invoices"));
const PaymentMethods = lazy(() => import("../pages/admin/payments/Methods"));

const AdminRoutes = () => {
  return (
    <Fragment>
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
        <Route path="shop" element={<AdminShop />} />
        <Route path="content" element={<AdminContent />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="support" element={<AdminSupport />} />
        <Route path="test-accounts" element={<TestAccounts />} />
      </Route>
    </Fragment>
  );
};

export default AdminRoutes;
