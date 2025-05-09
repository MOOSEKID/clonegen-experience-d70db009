
import { Route } from "react-router-dom";
import AdminLayout from "@/pages/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Members from "@/pages/admin/Members";
import Classes from "@/pages/admin/Classes";
import Trainers from "@/pages/admin/Trainers";
import TrainerProfiles from "@/pages/admin/trainers/TrainerProfiles";
import TrainerRatings from "@/pages/admin/trainers/TrainerRatings";
import PerformanceTracking from "@/pages/admin/trainers/PerformanceTracking";
import Reports from "@/pages/admin/Reports";
import Settings from "@/pages/admin/Settings";
import GeneralSettings from "@/pages/admin/settings/General";
import SecuritySettings from "@/pages/admin/settings/Security";
import BusinessHours from "@/pages/admin/settings/BusinessHours";
import Holidays from "@/pages/admin/settings/Holidays";
import Platform from "@/pages/admin/settings/Platform";
import Integrations from "@/pages/admin/settings/Integrations";
import Content from "@/pages/admin/Content";
import Workouts from "@/pages/admin/Workouts";
import ExerciseLibrary from "@/pages/admin/workouts/ExerciseLibrary";
import CreateProgram from "@/pages/admin/workouts/CreateProgram";
import WorkoutPrograms from "@/pages/admin/workouts/WorkoutPrograms";
import AddExercise from "@/pages/admin/workouts/AddExercise";
import ProgressTracking from "@/pages/admin/workouts/ProgressTracking";
import GenerateReports from "@/pages/admin/workouts/GenerateReports";
import Support from "@/pages/admin/Support";
import TestAccounts from "@/pages/admin/TestAccounts";
import Shop from "@/pages/admin/Shop";
import Payments from "@/pages/admin/Payments";
import Subscriptions from "@/pages/admin/payments/Subscriptions";
import Methods from "@/pages/admin/payments/Methods";
import Invoices from "@/pages/admin/payments/Invoices";

const AdminRoutes = () => (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="members" element={<Members />} />
    <Route path="classes" element={<Classes />} />
    <Route path="trainers" element={<Trainers />} />
    <Route path="trainers/profiles" element={<TrainerProfiles />} />
    <Route path="trainers/ratings" element={<TrainerRatings />} />
    <Route path="trainers/performance" element={<PerformanceTracking />} />
    <Route path="reports" element={<Reports />} />
    <Route path="content" element={<Content />} />
    <Route path="workouts" element={<Workouts />} />
    <Route path="workouts/exercises" element={<ExerciseLibrary />} />
    <Route path="workouts/create-program" element={<CreateProgram />} />
    <Route path="workouts/programs" element={<WorkoutPrograms />} />
    <Route path="workouts/add-exercise" element={<AddExercise />} />
    <Route path="workouts/progress" element={<ProgressTracking />} />
    <Route path="workouts/reports" element={<GenerateReports />} />
    <Route path="settings" element={<Settings />} />
    <Route path="settings/general" element={<GeneralSettings />} />
    <Route path="settings/security" element={<SecuritySettings />} />
    <Route path="settings/business-hours" element={<BusinessHours />} />
    <Route path="settings/holidays" element={<Holidays />} />
    <Route path="settings/platform" element={<Platform />} />
    <Route path="settings/integrations" element={<Integrations />} />
    <Route path="support" element={<Support />} />
    <Route path="test" element={<TestAccounts />} />
    <Route path="shop" element={<Shop />} />
    <Route path="payments" element={<Payments />} />
    <Route path="payments/subscriptions" element={<Subscriptions />} />
    <Route path="payments/methods" element={<Methods />} />
    <Route path="payments/invoices" element={<Invoices />} />
  </Route>
);

export default AdminRoutes;
