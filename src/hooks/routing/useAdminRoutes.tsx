
import { Route, RouteObject } from "react-router-dom";
import Dashboard from "@/pages/admin/Dashboard";
import Members from "@/pages/admin/Members";
import Classes from "@/pages/admin/Classes";
import Trainers from "@/pages/admin/Trainers";
import Reports from "@/pages/admin/Reports";
import AdminSettings from "@/pages/admin/Settings";
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
import HolidaysPage from "@/pages/admin/settings/Holidays";

// Create a placeholder component for missing pages
const PlaceholderPage = ({ name }: { name: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">{name} Page</h1>
    <p className="text-gray-500 mt-2">This page is under development.</p>
  </div>
);

// Create placeholders for all the missing pages with proper components
const MemberDetail = () => <PlaceholderPage name="Member Detail" />;
const ClassDetail = () => <PlaceholderPage name="Class Detail" />;
const TrainerDetail = () => <PlaceholderPage name="Trainer Detail" />;
const Billing = () => <PlaceholderPage name="Billing" />;
const Memberships = () => <PlaceholderPage name="Memberships" />;
const MembershipDetail = () => <PlaceholderPage name="Membership Detail" />;
const Attendance = () => <PlaceholderPage name="Attendance" />;
const Equipment = () => <PlaceholderPage name="Equipment" />;
const EquipmentDetail = () => <PlaceholderPage name="Equipment Detail" />;
const Maintenance = () => <PlaceholderPage name="Maintenance" />;
const MaintenanceDetail = () => <PlaceholderPage name="Maintenance Detail" />;
const Announcements = () => <PlaceholderPage name="Announcements" />;
const AnnouncementDetail = () => <PlaceholderPage name="Announcement Detail" />;
const Employees = () => <PlaceholderPage name="Employees" />;
const EmployeeDetail = () => <PlaceholderPage name="Employee Detail" />;
const Payroll = () => <PlaceholderPage name="Payroll" />;
const PayrollDetail = () => <PlaceholderPage name="Payroll Detail" />;
const Inventory = () => <PlaceholderPage name="Inventory" />;
const InventoryDetail = () => <PlaceholderPage name="Inventory Detail" />;
const POS = () => <PlaceholderPage name="POS" />;
const POSDetail = () => <PlaceholderPage name="POS Detail" />;
const Marketing = () => <PlaceholderPage name="Marketing" />;
const MarketingDetail = () => <PlaceholderPage name="Marketing Detail" />;
const Analytics = () => <PlaceholderPage name="Analytics" />;
const AnalyticsDetail = () => <PlaceholderPage name="Analytics Detail" />;
const Help = () => <PlaceholderPage name="Help" />;
const HelpDetail = () => <PlaceholderPage name="Help Detail" />;
const Profile = () => <PlaceholderPage name="Profile" />;
const ProfileDetail = () => <PlaceholderPage name="Profile Detail" />;
const Notifications = () => <PlaceholderPage name="Notifications" />;
const NotificationsDetail = () => <PlaceholderPage name="Notifications Detail" />;
const Messages = () => <PlaceholderPage name="Messages" />;
const MessagesDetail = () => <PlaceholderPage name="Messages Detail" />;
const Calendar = () => <PlaceholderPage name="Calendar" />;
const CalendarDetail = () => <PlaceholderPage name="Calendar Detail" />;
const Tasks = () => <PlaceholderPage name="Tasks" />;
const TasksDetail = () => <PlaceholderPage name="Tasks Detail" />;
const Notes = () => <PlaceholderPage name="Notes" />;
const NotesDetail = () => <PlaceholderPage name="Notes Detail" />;
const Files = () => <PlaceholderPage name="Files" />;
const FilesDetail = () => <PlaceholderPage name="Files Detail" />;
const Search = () => <PlaceholderPage name="Search" />;
const SearchDetail = () => <PlaceholderPage name="Search Detail" />;
const Settings = () => <PlaceholderPage name="Settings" />;
const SettingsDetail = () => <PlaceholderPage name="Settings Detail" />;

// Changed from default export to named export
export const useAdminRoutes = (): RouteObject[] => {
  return [
    {
      path: "/admin",
      element: <Dashboard />,
      children: []
    },
    {
      path: "/admin/dashboard",
      element: <Dashboard />,
      children: []
    },
    {
      path: "/admin/members",
      element: <Members />,
      children: []
    },
    {
      path: "/admin/members/:id",
      element: <MemberDetail />,
      children: []
    },
    {
      path: "/admin/classes",
      element: <Classes />,
      children: []
    },
    {
      path: "/admin/classes/:id",
      element: <ClassDetail />,
      children: []
    },
    {
      path: "/admin/trainers",
      element: <Trainers />,
      children: []
    },
    {
      path: "/admin/trainers/:id",
      element: <TrainerDetail />,
      children: []
    },
    {
      path: "/admin/billing",
      element: <Billing />,
      children: []
    },
    {
      path: "/admin/reports",
      element: <Reports />,
      children: []
    },
    {
      path: "/admin/settings",
      element: <AdminSettings />,
      children: []
    },
    {
      path: "/admin/settings/business-hours",
      element: <BusinessHoursPage />,
      children: []
    },
    {
      path: "/admin/settings/holidays",
      element: <HolidaysPage />,
      children: []
    },
    {
      path: "/admin/settings/general",
      element: <GeneralSettings />,
      children: []
    },
    {
      path: "/admin/settings/security",
      element: <SecuritySettings />,
      children: []
    },
    {
      path: "/admin/settings/integrations",
      element: <IntegrationsSettings />,
      children: []
    },
    {
      path: "/admin/settings/platform",
      element: <PlatformSettings />,
      children: []
    },
    {
      path: "/admin/settings/test-accounts",
      element: <TestAccountsSettings />,
      children: []
    },
    {
      path: "/admin/settings/company-automation",
      element: <CompanyAutomationSettings />,
      children: []
    },
    {
      path: "/admin/settings/member-defaults",
      element: <MemberDefaultsPage />,
      children: []
    },
    {
      path: "/admin/settings/invoice-templates",
      element: <InvoiceTemplatesPage />,
      children: []
    },
    {
      path: "/admin/settings/notifications",
      element: <NotificationsSettings />,
      children: []
    },
    {
      path: "/admin/settings/permissions",
      element: <PermissionsSettings />,
      children: []
    },
    {
      path: "/admin/settings/custom-messages",
      element: <CustomMessagesSettings />,
      children: []
    },
    {
      path: "/admin/settings/reports-exports",
      element: <ReportsExportsSettings />,
      children: []
    },
    {
      path: "/admin/settings/automation-rules",
      element: <AutomationRulesPage />,
      children: []
    }
  ];
};
