import React from 'react';
import AdminDashboard from '@/pages/admin/Dashboard';
import Members from '@/pages/admin/Members';
import Classes from '@/pages/admin/Classes';
import Staff from '@/pages/admin/Staff';
import StaffProfile from '@/pages/admin/staff/StaffProfile';
import StaffAttendancePage from '@/pages/admin/staff/StaffAttendancePage';
import AddStaff from '@/pages/admin/staff/AddStaff';
import Shop from '@/pages/admin/Shop';
import Payments from '@/pages/admin/Payments';
import Content from '@/pages/admin/Content';
import Reports from '@/pages/admin/Reports';
import Settings from '@/pages/admin/Settings';
import Support from '@/pages/admin/Support';
import Workouts from '@/pages/admin/Workouts';
import TestAccounts from '@/pages/admin/TestAccounts';
import NotFound from '@/pages/NotFound';

import { Subscriptions, Invoices, Methods } from '@/pages/admin/payments';
import CMSSettingsPage from '@/pages/admin/settings/CMS'; // Make sure this exists
import { useAdminSettingsRoutes } from './useAdminSettingsRoutes';

import TrainerProfiles from '@/pages/admin/staff/trainers/TrainerProfiles';
import TrainerProfileDetail from '@/pages/admin/staff/trainers/TrainerProfileDetail';
import PlaceholderPage from '@/components/admin/PlaceholderPage';

export interface AdminRoute {
  path: string;
  element: React.ReactNode;
  children?: AdminRoute[];
}

export const useAdminRoutes = (): AdminRoute[] => {
  const settingsRoutes = useAdminSettingsRoutes();

  return [
    { path: '/admin', element: <AdminDashboard /> },
    { path: '/admin/members', element: <Members /> },
    { path: '/admin/classes', element: <Classes /> },
    { path: '/admin/staff', element: <Staff /> },
    { path: '/admin/staff/:id', element: <StaffProfile /> },
    { path: '/admin/staff/add', element: <AddStaff /> },
    { path: '/admin/staff/attendance', element: <StaffAttendancePage /> },

    // Trainers
    { path: '/admin/staff/trainers/profiles', element: <TrainerProfiles /> },
    { path: '/admin/staff/trainers/:id', element: <TrainerProfileDetail /> },
    {
      path: '/admin/staff/trainers/performance',
      element: <PlaceholderPage title="Trainer Performance" description="Coming soon..." comingSoon />
    },
    {
      path: '/admin/staff/trainers/ratings',
      element: <PlaceholderPage title="Trainer Ratings" description="Coming soon..." comingSoon />
    },
    {
      path: '/admin/staff/trainers/scheduling',
      element: <PlaceholderPage title="Trainer Scheduling" description="Coming soon..." comingSoon />
    },

    // Managers
    {
      path: '/admin/staff/managers/permissions',
      element: <PlaceholderPage title="Admin Permissions" description="Coming soon..." comingSoon />
    },
    {
      path: '/admin/staff/managers/branches',
      element: <PlaceholderPage title="Branch Management" description="Coming soon..." comingSoon />
    },
    {
      path: '/admin/staff/managers/activity',
      element: <PlaceholderPage title="Activity Logs" description="Coming soon..." comingSoon />
    },

    // Reception & Sales
    {
      path: '/admin/staff/reception-sales/leads',
      element: <PlaceholderPage title="Lead Management" description="Coming soon..." comingSoon />
    },
    {
      path: '/admin/staff/reception-sales/onboarding',
      element: <PlaceholderPage title="Onboarding Tracker" description="Coming soon..." comingSoon />
    },
    {
      path: '/admin/staff/reception-sales/shifts',
      element: <PlaceholderPage title="Shift Planner" description="Coming soon..." comingSoon />
    },

    // Support Staff
    {
      path: '/admin/staff/support/tasks',
      element: <PlaceholderPage title="Task Assignments" description="Coming soon..." comingSoon />
    },
    {
      path: '/admin/staff/support/attendance',
      element: <StaffAttendancePage />
    },
    {
      path: '/admin/staff/support/schedule',
      element: <PlaceholderPage title="Support Schedule" description="Coming soon..." comingSoon />
    },

    // Wellness
    {
      path: '/admin/staff/wellness/massage',
      element: <PlaceholderPage title="Massage Scheduling" description="Coming soon..." comingSoon />
    },
    {
      path: '/admin/staff/wellness/sauna',
      element: <PlaceholderPage title="Sauna Management" description="Coming soon..." comingSoon />
    },
    {
      path: '/admin/staff/wellness/notes',
      element: <PlaceholderPage title="Wellness Notes" description="Coming soon..." comingSoon />
    },

    { path: '/admin/shop', element: <Shop /> },
    { path: '/admin/payments', element: <Payments /> },
    {
      path: '/admin/payments/subscriptions',
      element: <Subscriptions />
    },
    {
      path: '/admin/payments/invoices',
      element: <Invoices />
    },
    {
      path: '/admin/payments/methods',
      element: <Methods />
    },
    { path: '/admin/workouts', element: <Workouts /> },
    { path: '/admin/reports', element: <Reports /> },
    { path: '/admin/content', element: <Content /> },
    { path: '/admin/support', element: <Support /> },
    { path: '/admin/settings', element: <Settings /> },
    { path: '/admin/settings/cms', element: <CMSSettingsPage /> },
    { path: '/admin/test-accounts', element: <TestAccounts /> },

    // Inject dynamic settings routes
    ...settingsRoutes,

    // Optional: Catch-all route
    {
      path: '*',
      element: <NotFound />
    }
  ];
};