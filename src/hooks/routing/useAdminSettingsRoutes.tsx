
import React from 'react';
import GeneralSettingsPage from '@/pages/admin/settings/General';
import SecuritySettingsPage from '@/pages/admin/settings/Security';
import BusinessHoursPage from '@/pages/admin/settings/BusinessHours';
import HolidaysPage from '@/pages/admin/settings/Holidays';
import PlatformSettingsPage from '@/pages/admin/settings/Platform';
import IntegrationsSettingsPage from '@/pages/admin/settings/Integrations';
import PermissionsPage from '@/pages/admin/settings/Permissions';
import MemberDefaultsPage from '@/pages/admin/settings/MemberDefaults';
import CompanyAutomationPage from '@/pages/admin/settings/CompanyAutomation';
import NotificationsPage from '@/pages/admin/settings/Notifications';
import InvoiceTemplatesPage from '@/pages/admin/settings/InvoiceTemplates';
import AutomationPage from '@/pages/admin/settings/Automation';
import TestAccountsPage from '@/pages/admin/settings/TestAccounts';
import ReportsPage from '@/pages/admin/settings/Reports';
import CustomMessagesPage from '@/pages/admin/settings/CustomMessages';
import CMSSettingsPage from '@/pages/admin/settings/CMS';

export interface AdminRoute {
  path: string;
  element: React.ReactNode;
  children?: AdminRoute[];
}

export const useAdminSettingsRoutes = (): AdminRoute[] => {
  return [
    // System tab routes
    {
      path: '/admin/settings/general',
      element: <GeneralSettingsPage />
    },
    {
      path: '/admin/settings/security',
      element: <SecuritySettingsPage />
    },
    {
      path: '/admin/settings/business-hours',
      element: <BusinessHoursPage />
    },
    {
      path: '/admin/settings/holidays',
      element: <HolidaysPage />
    },
    {
      path: '/admin/settings/platform',
      element: <PlatformSettingsPage />
    },
    {
      path: '/admin/settings/integrations',
      element: <IntegrationsSettingsPage />
    },
    
    // People & Roles tab routes
    {
      path: '/admin/settings/permissions',
      element: <PermissionsPage />
    },
    {
      path: '/admin/settings/member-defaults',
      element: <MemberDefaultsPage />
    },
    {
      path: '/admin/settings/company-automation',
      element: <CompanyAutomationPage />
    },
    {
      path: '/admin/settings/notifications',
      element: <NotificationsPage />
    },
    {
      path: '/admin/settings/invoice-templates',
      element: <InvoiceTemplatesPage />
    },
    
    // Advanced tab routes
    {
      path: '/admin/settings/automation-rules',
      element: <AutomationPage />
    },
    {
      path: '/admin/settings/test-accounts',
      element: <TestAccountsPage />
    },
    {
      path: '/admin/settings/reports-exports',
      element: <ReportsPage />
    },
    {
      path: '/admin/settings/custom-messages',
      element: <CustomMessagesPage />
    },
    {
      path: '/admin/settings/cms',
      element: <CMSSettingsPage />
    }
  ];
};
