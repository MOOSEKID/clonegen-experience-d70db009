
import React from 'react';
import { RouteObject } from 'react-router-dom';

import Dashboard from '@/pages/admin/Dashboard';
import Members from '@/pages/admin/Members';
import Classes from '@/pages/admin/Classes';
import Trainers from '@/pages/admin/Trainers';
import Content from '@/pages/admin/Content';
import Settings from '@/pages/admin/Settings';
import Support from '@/pages/admin/Support';
import Staff from '@/pages/admin/Staff';
import TrainerProfiles from '@/pages/admin/trainers/TrainerProfiles';
import StaffAttendancePage from '@/pages/admin/staff/StaffAttendancePage';
import TrainerProfileDetail from '@/pages/admin/staff/trainers/TrainerProfileDetail';
import TrainerCalendar from '@/pages/admin/staff/trainers/TrainerCalendar';

// CMS Routes
import CMSDashboard from '@/components/admin/content/cms/CMSDashboard';
import PageManager from '@/components/admin/content/cms/PageManager';
import NavigationBuilder from '@/components/admin/content/cms/NavigationBuilder';

// Payments Routes
import { Subscriptions, Invoices, Methods } from '@/pages/admin/payments';

export const useAdminRoutes = (): RouteObject[] => {
  return [
    {
      path: '/admin',
      element: <Dashboard />,
    },
    {
      path: '/admin/members',
      element: <Members />,
    },
    {
      path: '/admin/classes',
      element: <Classes />,
    },
    {
      path: '/admin/trainers',
      element: <Trainers />,
    },
    {
      path: '/admin/trainers/profiles',
      element: <TrainerProfiles />,
    },
    {
      path: '/admin/content',
      element: <Content />,
    },
    {
      path: '/admin/settings',
      element: <Settings />,
    },
    {
      path: '/admin/support',
      element: <Support />,
    },
    {
      path: '/admin/staff',
      element: <Staff />,
    },
    {
      path: '/admin/staff/attendance',
      element: <StaffAttendancePage />,
    },
    {
      path: '/admin/staff/trainers/profiles',
      element: <TrainerProfiles />,
    },
    {
      path: '/admin/staff/trainers/:id',
      element: <TrainerProfileDetail />,
    },
    {
      path: '/admin/staff/trainers/:id/calendar',
      element: <TrainerCalendar />,
    },
    
    // CMS Routes
    {
      path: '/admin/content/cms',
      element: <CMSDashboard />,
    },
    {
      path: '/admin/content/pages',
      element: <PageManager />,
    },
    {
      path: '/admin/content/navigation',
      element: <NavigationBuilder />,
    },
    
    // Payments Routes
    {
      path: '/admin/payments/subscriptions',
      element: <Subscriptions />,
    },
    {
      path: '/admin/payments/invoices',
      element: <Invoices />,
    },
    {
      path: '/admin/payments/methods',
      element: <Methods />,
    },
  ];
};
