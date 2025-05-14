import React from 'react';
import { RouteObject } from 'react-router-dom';

import AdminDashboard from '@/pages/admin/Dashboard';
import Members from '@/pages/admin/Members';
import Classes from '@/pages/admin/Classes';
import Trainers from '@/pages/admin/Trainers';
import Content from '@/pages/admin/Content';
import Settings from '@/pages/admin/Settings';
import Support from '@/pages/admin/Support';
import Workouts from '@/pages/admin/Workouts';
import TestAccounts from '@/pages/admin/TestAccounts';
import NotFound from '@/pages/NotFound';
import Staff from '@/pages/admin/Staff';
import AuditLogPage from '@/pages/admin/audit/AuditLogPage';
import StaffAttendancePage from '@/pages/admin/staff/StaffAttendancePage';

import CMSSettingsPage from '@/pages/admin/settings/CMS';
import { useAdminSettingsRoutes } from './useAdminSettingsRoutes';

import TrainerProfiles from '@/pages/admin/staff/trainers/TrainerProfiles';
import TrainerProfileDetail from '@/pages/admin/staff/trainers/TrainerProfileDetail';
import TrainerCalendar from '@/pages/admin/staff/trainers/TrainerCalendar';

import PlaceholderPage from '@/components/admin/PlaceholderPage';

import { Subscriptions, Invoices, Methods } from '@/pages/admin/payments';

export interface AdminRoute {
  path: string;
  element: React.ReactNode;
  children?: AdminRoute[];
}

export const useAdminRoutes = (): RouteObject[] => {
  const settingsRoutes = useAdminSettingsRoutes();

  return [
    { path: '/admin', element: <AdminDashboard /> },
    { path: '/admin/members', element: <Members /> },
    { path: '/admin/classes', element: <Classes /> },
    { path: '/admin/trainers', element: <Trainers /> },
    { path: '/admin/content', element: <Content /> },
    { path: '/admin/settings', element: <Settings /> },
    { path: '/admin/support', element: <Support /> },
    { path: '/admin/workouts', element: <Workouts /> },
    { path: '/admin/test-accounts', element: <TestAccounts /> },
    { path: '/admin/staff', element: <Staff /> },
    { path: '/admin/staff/attendance', element: <StaffAttendancePage /> },
    { path: '/admin/audit-log', element: <AuditLogPage /> },

    // Trainer Routes
    { path: '/admin/staff/trainers/profiles', element: <TrainerProfiles /> },
    { path: '/admin/staff/trainers/:id', element: <TrainerProfileDetail /> },
    { path: '/admin/staff/trainers/:id/calendar', element: <TrainerCalendar /> },
    { path: '/admin/staff/trainers/performance', element: <PlaceholderPage title="Trainer Performance" description="Coming soon..." comingSoon /> },
    { path: '/admin/staff/trainers/ratings', element: <PlaceholderPage title="Trainer Ratings" description="Coming soon..." comingSoon /> },
    { path: '/admin/staff/trainers/scheduling', element: <PlaceholderPage title="Trainer Scheduling" description="Coming soon..." comingSoon /> },

    // Management Placeholder Routes
    { path: '/admin/staff/managers/permissions', element: <PlaceholderPage title="Admin Permissions" description="Coming soon..." comingSoon /> },
    { path: '/admin/staff/managers/branches', element: <PlaceholderPage title="Branch Management" description="Coming soon..." comingSoon /> },
    { path: '/admin/staff/managers/activity', element: <PlaceholderPage title="Activity Logs" description="Coming soon..." comingSoon /> },

    // Reception / Sales
    { path: '/admin/staff/reception-sales/leads', element: <PlaceholderPage title="Lead Management" description="Coming soon..." comingSoon /> },
    { path: '/admin/staff/reception-sales/onboarding', element: <PlaceholderPage title="Onboarding Tracker" description="Coming soon..." comingSoon /> },
    { path: '/admin/staff/reception-sales/shifts', element: <PlaceholderPage title="Shift Planner" description="Coming soon..." comingSoon /> },

    // Support Staff
    { path: '/admin/staff/support/tasks', element: <PlaceholderPage title="Task Assignments" description="Coming soon..." comingSoon /> },
    { path: '/admin/staff/support/schedule', element: <PlaceholderPage title="Support Schedule" description="Coming soon..." comingSoon /> },

    // Wellness Staff
    { path: '/admin/staff/wellness/massage', element: <PlaceholderPage title="Massage Scheduling" description="Coming soon..." comingSoon /> },
    { path: '/admin/staff/wellness/sauna', element: <PlaceholderPage title="Sauna Management" description="Coming soon..." comingSoon /> },
    { path: '/admin/staff/wellness/notes', element: <PlaceholderPage title="Wellness Notes" description="Coming soon..." comingSoon /> },

    // Payments
    { path: '/admin/payments/subscriptions', element: <Subscriptions /> },
    { path: '/admin/payments/invoices', element: <Invoices /> },
    { path: '/admin/payments/methods', element: <Methods /> },

    // CMS
    { path: '/admin/settings/cms', element: <CMSSettingsPage /> },

    // Extra settings
    ...settingsRoutes,

    // Catch-all
    { path: '*', element: <NotFound /> }
  ];
};