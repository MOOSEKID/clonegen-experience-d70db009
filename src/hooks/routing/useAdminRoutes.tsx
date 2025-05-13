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
import { Subscriptions, Invoices, Methods } from '@/pages/admin/payments';
import { useAdminSettingsRoutes } from './useAdminSettingsRoutes';

export interface AdminRoute {
  path: string;
  element: React.ReactNode;
  children?: AdminRoute[];
}

export const useAdminRoutes = (): AdminRoute[] => {
  const settingsRoutes = useAdminSettingsRoutes();
  
  return [
    {
      path: '/admin',
      element: <AdminDashboard />
    },
    {
      path: '/admin/members',
      element: <Members />,
    },
    {
      path: '/admin/classes',
      element: <Classes />
    },
    {
      path: '/admin/staff',
      element: <Staff />
    },
    {
      path: '/admin/staff/:id',
      element: <StaffProfile />
    },
    {
      path: '/admin/staff/add',
      element: <AddStaff />
    },
    {
      path: '/admin/staff/attendance',
      element: <StaffAttendancePage />
    },
    {
      path: '/admin/shop',
      element: <Shop />
    },
    {
      path: '/admin/payments',
      element: <Payments />,
      children: [
        {
          path: '',
          element: <Subscriptions />
        },
        {
          path: 'invoices',
          element: <Invoices />
        },
        {
          path: 'methods',
          element: <Methods />
        }
      ]
    },
    {
      path: '/admin/workouts',
      element: <Workouts />
    },
    {
      path: '/admin/reports',
      element: <Reports />
    },
    {
      path: '/admin/content',
      element: <Content />
    },
    {
      path: '/admin/support',
      element: <Support />
    },
    {
      path: '/admin/settings',
      element: <Settings />
    },
    {
      path: '/admin/test-accounts',
      element: <TestAccounts />
    },
    // Add all settings routes
    ...settingsRoutes
  ];
};
