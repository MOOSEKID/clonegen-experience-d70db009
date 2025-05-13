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

// Import trainer pages
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
    
    // Trainer specific routes
    {
      path: '/admin/staff/trainers/profiles',
      element: <TrainerProfiles />
    },
    {
      path: '/admin/staff/trainers/:id',
      element: <TrainerProfileDetail />
    },
    {
      path: '/admin/staff/trainers/performance',
      element: <PlaceholderPage 
        title="Trainer Performance Tracking"
        description="Track and analyze trainer performance metrics"
        comingSoon={true}
      />
    },
    {
      path: '/admin/staff/trainers/ratings',
      element: <PlaceholderPage 
        title="Trainer Ratings & Reviews"
        description="View and manage client feedback and ratings for trainers"
        comingSoon={true}
      />
    },
    {
      path: '/admin/staff/trainers/scheduling',
      element: <PlaceholderPage 
        title="Trainer Scheduling"
        description="Manage trainer schedules, availability, and time-off"
        comingSoon={true}
      />
    },
    
    // Manager specific routes
    {
      path: '/admin/staff/managers/permissions',
      element: <PlaceholderPage 
        title="Admin Roles & Permissions"
        description="Manage administrative access levels and permissions"
        comingSoon={true}
      />
    },
    {
      path: '/admin/staff/managers/branches',
      element: <PlaceholderPage 
        title="Branch Assignments"
        description="Assign managers to different gym locations and branches"
        comingSoon={true}
      />
    },
    {
      path: '/admin/staff/managers/activity',
      element: <PlaceholderPage 
        title="Activity Logs"
        description="View login history and administrative actions"
        comingSoon={true}
      />
    },
    
    // Reception & Sales specific routes
    {
      path: '/admin/staff/reception-sales/leads',
      element: <PlaceholderPage 
        title="Lead Management"
        description="Track and manage potential new member leads"
        comingSoon={true}
      />
    },
    {
      path: '/admin/staff/reception-sales/onboarding',
      element: <PlaceholderPage 
        title="Onboarding History"
        description="View history of new member registrations and onboarding"
        comingSoon={true}
      />
    },
    {
      path: '/admin/staff/reception-sales/shifts',
      element: <PlaceholderPage 
        title="Shift Planner"
        description="Schedule and manage front desk staff shifts"
        comingSoon={true}
      />
    },
    
    // Support Staff specific routes
    {
      path: '/admin/staff/support/tasks',
      element: <PlaceholderPage 
        title="Task Assignment"
        description="Assign and track maintenance and support tasks"
        comingSoon={true}
      />
    },
    {
      path: '/admin/staff/support/attendance',
      element: <StaffAttendancePage />
    },
    {
      path: '/admin/staff/support/schedule',
      element: <PlaceholderPage 
        title="Duty Schedule"
        description="Manage weekly schedule of support staff responsibilities"
        comingSoon={true}
      />
    },
    
    // Wellness Staff specific routes
    {
      path: '/admin/staff/wellness/massage',
      element: <PlaceholderPage 
        title="Massage Therapist Roster"
        description="Manage massage therapist schedules and appointments"
        comingSoon={true}
      />
    },
    {
      path: '/admin/staff/wellness/sauna',
      element: <PlaceholderPage 
        title="Sauna Schedule"
        description="Schedule sauna attendants and manage sauna sessions"
        comingSoon={true}
      />
    },
    {
      path: '/admin/staff/wellness/notes',
      element: <PlaceholderPage 
        title="Client Logs"
        description="View and manage wellness session notes and client records"
        comingSoon={true}
      />
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
