import { Route } from "react-router-dom";
import AdminLayout from "@/pages/admin/AdminLayout";
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

// Create a placeholder component for missing pages
const PlaceholderPage = ({ name }: { name: string }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">{name} Page</h1>
    <p className="text-gray-500 mt-2">This page is under development.</p>
  </div>
);

// Create placeholders for all the missing pages
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
