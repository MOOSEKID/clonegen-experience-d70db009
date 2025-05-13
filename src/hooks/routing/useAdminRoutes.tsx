import { Navigate } from "react-router-dom";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Members from "@/pages/admin/Members";
import MemberDetail from "@/pages/admin/MemberDetail";
import Classes from "@/pages/admin/Classes";
import ClassDetail from "@/pages/admin/ClassDetail";
import Trainers from "@/pages/admin/Trainers";
import TrainerDetail from "@/pages/admin/TrainerDetail";
import Billing from "@/pages/admin/Billing";
import Reports from "@/pages/admin/Reports";
import AdminSettings from "@/pages/admin/Settings";
import Memberships from "@/pages/admin/Memberships";
import MembershipDetail from "@/pages/admin/MembershipDetail";
import Attendance from "@/pages/admin/Attendance";
import Equipment from "@/pages/admin/Equipment";
import EquipmentDetail from "@/pages/admin/EquipmentDetail";
import Maintenance from "@/pages/admin/Maintenance";
import MaintenanceDetail from "@/pages/admin/MaintenanceDetail";
import Announcements from "@/pages/admin/Announcements";
import AnnouncementDetail from "@/pages/admin/AnnouncementDetail";
import Employees from "@/pages/admin/Employees";
import EmployeeDetail from "@/pages/admin/EmployeeDetail";
import Payroll from "@/pages/admin/Payroll";
import PayrollDetail from "@/pages/admin/PayrollDetail";
import Inventory from "@/pages/admin/Inventory";
import InventoryDetail from "@/pages/admin/InventoryDetail";
import POS from "@/pages/admin/POS";
import POSDetail from "@/pages/admin/POSDetail";
import Marketing from "@/pages/admin/Marketing";
import MarketingDetail from "@/pages/admin/MarketingDetail";
import Analytics from "@/pages/admin/Analytics";
import AnalyticsDetail from "@/pages/admin/AnalyticsDetail";
import Help from "@/pages/admin/Help";
import HelpDetail from "@/pages/admin/HelpDetail";
import Profile from "@/pages/admin/Profile";
import ProfileDetail from "@/pages/admin/ProfileDetail";
import Notifications from "@/pages/admin/Notifications";
import NotificationsDetail from "@/pages/admin/NotificationsDetail";
import Messages from "@/pages/admin/Messages";
import MessagesDetail from "@/pages/admin/MessagesDetail";
import Calendar from "@/pages/admin/Calendar";
import CalendarDetail from "@/pages/admin/CalendarDetail";
import Tasks from "@/pages/admin/Tasks";
import TasksDetail from "@/pages/admin/TasksDetail";
import Notes from "@/pages/admin/Notes";
import NotesDetail from "@/pages/admin/NotesDetail";
import Files from "@/pages/admin/Files";
import FilesDetail from "@/pages/admin/FilesDetail";
import Search from "@/pages/admin/Search";
import SearchDetail from "@/pages/admin/SearchDetail";
import Settings from "@/pages/admin/Settings";
import SettingsDetail from "@/pages/admin/SettingsDetail";
import BusinessHoursPage from "@/pages/admin/settings/BusinessHours";
import HolidaysSettings from "@/components/admin/settings/business/HolidaysSettings";
import GeneralSettings from "@/pages/admin/settings/General";
import SecuritySettings from "@/pages/admin/settings/Security";
import IntegrationsSettings from "@/pages/admin/settings/Integrations";
import PlatformSettings from "@/pages/admin/settings/Platform";
import TestAccountsSettings from "@/pages/admin/settings/TestAccounts";
import CompanyAutomationSettings from "@/pages/admin/settings/CompanyAutomation";
import MemberDefaultsPage from "@/pages/admin/settings/MemberDefaults";
import InvoiceTemplatesPage from "@/pages/admin/settings/InvoiceTemplates";
import NotificationsSettings from "@/pages/admin/settings/Notifications";
import PermissionsSettings from "@/pages/admin/settings/Permissions";
import CustomMessagesSettings from "@/pages/admin/settings/CustomMessages";
import ReportsExportsSettings from "@/pages/admin/settings/ReportsExports";
import AutomationRulesPage from "@/pages/admin/settings/AutomationRules";

export const useAdminRoutes = () => {
  const routes = [
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "members",
          element: <Members />,
        },
        {
          path: "members/:id",
          element: <MemberDetail />,
        },
        {
          path: "classes",
          element: <Classes />,
        },
        {
          path: "classes/:id",
          element: <ClassDetail />,
        },
        {
          path: "trainers",
          element: <Trainers />,
        },
        {
          path: "trainers/:id",
          element: <TrainerDetail />,
        },
        {
          path: "billing",
          element: <Billing />,
        },
        {
          path: "reports",
          element: <Reports />,
        },
        {
          path: "settings",
          element: <AdminSettings />,
        },
        {
          path: "memberships",
          element: <Memberships />,
        },
        {
          path: "memberships/:id",
          element: <MembershipDetail />,
        },
        {
          path: "attendance",
          element: <Attendance />,
        },
        {
          path: "equipment",
          element: <Equipment />,
        },
        {
          path: "equipment/:id",
          element: <EquipmentDetail />,
        },
        {
          path: "maintenance",
          element: <Maintenance />,
        },
        {
          path: "maintenance/:id",
          element: <MaintenanceDetail />,
        },
        {
          path: "announcements",
          element: <Announcements />,
        },
        {
          path: "announcements/:id",
          element: <AnnouncementDetail />,
        },
        {
          path: "employees",
          element: <Employees />,
        },
        {
          path: "employees/:id",
          element: <EmployeeDetail />,
        },
        {
          path: "payroll",
          element: <Payroll />,
        },
        {
          path: "payroll/:id",
          element: <PayrollDetail />,
        },
        {
          path: "inventory",
          element: <Inventory />,
        },
        {
          path: "inventory/:id",
          element: <InventoryDetail />,
        },
        {
          path: "pos",
          element: <POS />,
        },
        {
          path: "pos/:id",
          element: <POSDetail />,
        },
        {
          path: "marketing",
          element: <Marketing />,
        },
        {
          path: "marketing/:id",
          element: <MarketingDetail />,
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "analytics/:id",
          element: <AnalyticsDetail />,
        },
        {
          path: "help",
          element: <Help />,
        },
        {
          path: "help/:id",
          element: <HelpDetail />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "profile/:id",
          element: <ProfileDetail />,
        },
        {
          path: "notifications",
          element: <Notifications />,
        },
        {
          path: "notifications/:id",
          element: <NotificationsDetail />,
        },
        {
          path: "messages",
          element: <Messages />,
        },
        {
          path: "messages/:id",
          element: <MessagesDetail />,
        },
        {
          path: "calendar",
          element: <Calendar />,
        },
        {
          path: "calendar/:id",
          element: <CalendarDetail />,
        },
        {
          path: "tasks",
          element: <Tasks />,
        },
        {
          path: "tasks/:id",
          element: <TasksDetail />,
        },
        {
          path: "notes",
          element: <Notes />,
        },
        {
          path: "notes/:id",
          element: <NotesDetail />,
        },
        {
          path: "files",
          element: <Files />,
        },
        {
          path: "files/:id",
          element: <FilesDetail />,
        },
        {
          path: "search",
          element: <Search />,
        },
        {
          path: "search/:id",
          element: <SearchDetail />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "settings/:id",
          element: <SettingsDetail />,
        },
        // Business Hours setting route
        {
          path: "settings/business-hours",
          element: <BusinessHoursPage />,
        },
        {
          path: "settings/holidays",
          element: <HolidaysSettings />,
        },
        {
          path: "settings/general",
          element: <GeneralSettings />,
        },
        {
          path: "settings/security",
          element: <SecuritySettings />,
        },
        {
          path: "settings/integrations",
          element: <IntegrationsSettings />,
        },
        {
          path: "settings/platform",
          element: <PlatformSettings />,
        },
        {
          path: "settings/test-accounts",
          element: <TestAccountsSettings />,
        },
        {
          path: "settings/company-automation",
          element: <CompanyAutomationSettings />,
        },
        {
          path: "settings/member-defaults",
          element: <MemberDefaultsPage />,
        },
        {
          path: "settings/invoice-templates",
          element: <InvoiceTemplatesPage />,
        },
        {
          path: "settings/notifications",
          element: <NotificationsSettings />,
        },
        {
          path: "settings/permissions",
          element: <PermissionsSettings />,
        },
        {
          path: "settings/custom-messages",
          element: <CustomMessagesSettings />,
        },
        {
          path: "settings/reports-exports",
          element: <ReportsExportsSettings />,
        },
        {
          path: "settings/automation-rules",
          element: <AutomationRulesPage />,
        },
      ]
    }
  ];

  return routes;
};
