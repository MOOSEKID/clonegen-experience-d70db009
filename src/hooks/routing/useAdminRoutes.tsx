import React from 'react';
import { Route } from 'react-router-dom';

// Admin pages
import Dashboard from '@/pages/admin/Dashboard';
import Members from '@/pages/admin/Members';
import Classes from '@/pages/admin/Classes';
import Trainers from '@/pages/admin/Trainers';
import Payments from '@/pages/admin/Payments';
import Reports from '@/pages/admin/Reports';
import Workouts from '@/pages/admin/Workouts';
import Content from '@/pages/admin/Content';
import Shop from '@/pages/admin/Shop';
import Support from '@/pages/admin/Support';
import TestAccounts from '@/pages/admin/TestAccounts';
import Settings from '@/pages/admin/Settings';

// Settings pages
import GeneralSettings from '@/pages/admin/settings/General';
import BusinessHoursSettings from '@/pages/admin/settings/BusinessHours';
import HolidaysSettings from '@/pages/admin/settings/Holidays';
import SecuritySettings from '@/pages/admin/settings/Security';
import PlatformSettings from '@/pages/admin/settings/Platform';
import IntegrationsSettings from '@/pages/admin/settings/Integrations';
import UserPermissionsSettings from '@/pages/admin/settings/Permissions';
import MemberDefaultsSettings from '@/pages/admin/settings/MemberDefaults';
import CompanyAutomationSettings from '@/pages/admin/settings/Automation';
import AutomationRulesSettings from '@/pages/admin/settings/AutomationRules';
import TestingAccountsSettings from '@/pages/admin/settings/TestAccounts';
import CMSSettings from '@/pages/admin/settings/CMS';

// Payment pages
const Invoices = React.lazy(() => import('@/pages/admin/payments/Invoices'));
const PaymentMethods = React.lazy(() => import('@/pages/admin/payments/Methods'));
const Subscriptions = React.lazy(() => import('@/pages/admin/payments/Subscriptions'));

// Trainer pages
const TrainerProfiles = React.lazy(() => import('@/pages/admin/trainers/TrainerProfiles'));
const TrainerPerformance = React.lazy(() => import('@/pages/admin/trainers/PerformanceTracking'));
const TrainerRatings = React.lazy(() => import('@/pages/admin/trainers/TrainerRatings'));
const TrainerScheduling = React.lazy(() => import('@/pages/admin/trainers/TrainerScheduling')); // New import

// Workout pages
const ExerciseLibrary = React.lazy(() => import('@/pages/admin/workouts/ExerciseLibrary'));
const WorkoutPrograms = React.lazy(() => import('@/pages/admin/workouts/WorkoutPrograms'));
const AddExercise = React.lazy(() => import('@/pages/admin/workouts/AddExercise'));
const CreateProgram = React.lazy(() => import('@/pages/admin/workouts/CreateProgram'));
const ProgressTracking = React.lazy(() => import('@/pages/admin/workouts/ProgressTracking'));
const WorkoutReports = React.lazy(() => import('@/pages/admin/workouts/GenerateReports'));

// Shop pages
const ECommerce = React.lazy(() => import('@/pages/admin/shop/ECommerce'));
const MemberPOS = React.lazy(() => import('@/pages/admin/shop/MemberPOS'));
const ShopSettings = React.lazy(() => import('@/pages/admin/shop/Settings'));

const useAdminRoutes = () => {
  return (
    <>
      <Route index element={<Dashboard />} />
      <Route path="members" element={<Members />} />
      <Route path="classes" element={<Classes />} />
      <Route path="trainers" element={<Trainers />} />
      <Route path="trainers/profiles" element={<TrainerProfiles />} />
      <Route path="trainers/performance" element={<TrainerPerformance />} />
      <Route path="trainers/ratings" element={<TrainerRatings />} />
      <Route path="trainers/scheduling" element={<TrainerScheduling />} /> {/* New route */}
      <Route path="payments" element={<Payments />}>
        <Route index element={<Invoices />} />
        <Route path="methods" element={<PaymentMethods />} />
        <Route path="subscriptions" element={<Subscriptions />} />
      </Route>
      <Route path="reports" element={<Reports />} />
      <Route path="workouts" element={<Workouts />}>
        <Route index element={<ExerciseLibrary />} />
        <Route path="programs" element={<WorkoutPrograms />} />
        <Route path="add-exercise" element={<AddExercise />} />
        <Route path="create-program" element={<CreateProgram />} />
        <Route path="progress" element={<ProgressTracking />} />
        <Route path="reports" element={<WorkoutReports />} />
      </Route>
      <Route path="content" element={<Content />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/ecommerce" element={<ECommerce />} />
      <Route path="shop/member-pos" element={<MemberPOS />} />
      <Route path="shop/settings" element={<ShopSettings />} />
      <Route path="support" element={<Support />} />
      <Route path="test-accounts" element={<TestAccounts />} />
      <Route path="settings" element={<Settings />} />
      <Route path="settings/general" element={<GeneralSettings />} />
      <Route path="settings/business-hours" element={<BusinessHoursSettings />} />
      <Route path="settings/holidays" element={<HolidaysSettings />} />
      <Route path="settings/security" element={<SecuritySettings />} />
      <Route path="settings/platform" element={<PlatformSettings />} />
      <Route path="settings/integrations" element={<IntegrationsSettings />} />
      <Route path="settings/permissions" element={<UserPermissionsSettings />} />
      <Route path="settings/member-defaults" element={<MemberDefaultsSettings />} />
      <Route path="settings/company-automation" element={<CompanyAutomationSettings />} />
      <Route path="settings/automation-rules" element={<AutomationRulesSettings />} />
      <Route path="settings/test-accounts" element={<TestingAccountsSettings />} />
      <Route path="settings/cms" element={<CMSSettings />} />
    </>
  );
};

export default useAdminRoutes;
