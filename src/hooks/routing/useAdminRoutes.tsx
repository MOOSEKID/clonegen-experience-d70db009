
import React from 'react';
import { Route } from "react-router-dom";

// Admin pages
import Dashboard from "../../pages/admin/Dashboard";
import Members from "../../pages/admin/Members";
import Classes from "../../pages/admin/Classes";
import Content from "../../pages/admin/Content";
import Trainers from "../../pages/admin/Trainers";
import TrainerProfiles from "../../pages/admin/trainers/TrainerProfiles";
import TrainerRatings from "../../pages/admin/trainers/TrainerRatings";
import TrainerScheduling from "../../pages/admin/trainers/TrainerScheduling";
import PerformanceTracking from "../../pages/admin/trainers/PerformanceTracking";
import Workouts from "../../pages/admin/Workouts";
import ExerciseLibrary from "../../pages/admin/workouts/ExerciseLibrary";
import AddExercise from "../../pages/admin/workouts/AddExercise";
import WorkoutPrograms from "../../pages/admin/workouts/WorkoutPrograms";
import CreateProgram from "../../pages/admin/workouts/CreateProgram";
import ProgressTracking from "../../pages/admin/workouts/ProgressTracking";
import GenerateReports from "../../pages/admin/workouts/GenerateReports";
import Shop from "../../pages/admin/Shop";
import ECommerce from "../../pages/admin/shop/ECommerce";
import MemberPOS from "../../pages/admin/shop/MemberPOS";
import Settings from "../../pages/admin/Settings";
import Reports from "../../pages/admin/Reports";
import Support from "../../pages/admin/Support";
import TestAccounts from "../../pages/admin/TestAccounts";
import Payments from "../../pages/admin/Payments";
import Invoices from "../../pages/admin/payments/Invoices";
import Methods from "../../pages/admin/payments/Methods";
import Subscriptions from "../../pages/admin/payments/Subscriptions";
import MemberSettings from "../../pages/admin/settings/MemberDefaults";
import GeneralSettings from "../../pages/admin/settings/General";
import SecuritySettings from "../../pages/admin/settings/Security";
import BusinessHours from "../../pages/admin/settings/BusinessHours";
import Holidays from "../../pages/admin/settings/Holidays";
import MemberPurchases from "../../pages/admin/members/MemberPurchases";
import ShopSettings from "../../pages/admin/shop/Settings";
import Products from "../../pages/admin/shop/Products";
import AddProduct from "../../pages/admin/shop/AddProduct";
import EditProduct from "../../pages/admin/shop/EditProduct";
import Categories from "../../pages/admin/shop/Categories";
import Permissions from "../../pages/admin/settings/Permissions";
import Notifications from "../../pages/admin/settings/Notifications";
import InvoiceTemplates from "../../pages/admin/settings/InvoiceTemplates";
import CompanyAutomation from "../../pages/admin/settings/CompanyAutomation";
import Platform from "../../pages/admin/settings/Platform";
import Integrations from "../../pages/admin/settings/Integrations";
import CMS from "../../pages/admin/settings/CMS";
import AutomationRules from "../../pages/admin/settings/AutomationRules";
import CustomMessages from "../../pages/admin/settings/CustomMessages";

const useAdminRoutes = () => {
  return [
    <Route key="admin-dashboard" index element={<Dashboard />} />,
    <Route key="admin-members" path="members" element={<Members />} />,
    <Route key="admin-classes" path="classes" element={<Classes />} />,
    <Route key="admin-content" path="content" element={<Content />} />,
    
    <Route key="admin-trainers" path="trainers" element={<Trainers />} />,
    <Route key="admin-trainer-profiles" path="trainers/trainer-profiles" element={<TrainerProfiles />} />,
    <Route key="admin-trainer-ratings" path="trainers/trainer-ratings" element={<TrainerRatings />} />,
    <Route key="admin-trainer-scheduling" path="trainers/trainer-scheduling" element={<TrainerScheduling />} />,
    <Route key="admin-trainer-performance" path="trainers/performance-tracking" element={<PerformanceTracking />} />,
    
    <Route key="admin-workouts" path="workouts" element={<Workouts />} />,
    <Route key="admin-exercise-library" path="workouts/exercise-library" element={<ExerciseLibrary />} />,
    <Route key="admin-add-exercise" path="workouts/add-exercise" element={<AddExercise />} />,
    <Route key="admin-workout-programs" path="workouts/workout-programs" element={<WorkoutPrograms />} />,
    <Route key="admin-create-program" path="workouts/create-program" element={<CreateProgram />} />,
    <Route key="admin-progress-tracking" path="workouts/progress-tracking" element={<ProgressTracking />} />,
    <Route key="admin-generate-reports" path="workouts/generate-reports" element={<GenerateReports />} />,
    
    <Route key="admin-shop" path="shop" element={<Shop />} />,
    <Route key="admin-shop-products" path="shop/products" element={<Products />} />,
    <Route key="admin-shop-add-product" path="shop/add-product" element={<AddProduct />} />,
    <Route key="admin-shop-edit-product" path="shop/edit-product/:id" element={<EditProduct />} />,
    <Route key="admin-shop-categories" path="shop/categories" element={<Categories />} />,
    <Route key="admin-shop-ecommerce" path="shop/ecommerce" element={<ECommerce />} />,
    <Route key="admin-shop-member-pos" path="shop/member-pos" element={<MemberPOS />} />,
    <Route key="admin-shop-settings" path="shop/settings" element={<ShopSettings />} />,
    
    <Route key="admin-payments" path="payments" element={<Payments />} />,
    <Route key="admin-payments-invoices" path="payments/invoices" element={<Invoices />} />,
    <Route key="admin-payments-methods" path="payments/methods" element={<Methods />} />,
    <Route key="admin-payments-subscriptions" path="payments/subscriptions" element={<Subscriptions />} />,
    
    <Route key="admin-settings" path="settings" element={<Settings />} />,
    <Route key="admin-settings-member" path="settings/member-defaults" element={<MemberSettings />} />,
    <Route key="admin-settings-general" path="settings/general" element={<GeneralSettings />} />,
    <Route key="admin-settings-security" path="settings/security" element={<SecuritySettings />} />,
    <Route key="admin-settings-hours" path="settings/business-hours" element={<BusinessHours />} />,
    <Route key="admin-settings-holidays" path="settings/holidays" element={<Holidays />} />,
    <Route key="admin-settings-permissions" path="settings/permissions" element={<Permissions />} />,
    <Route key="admin-settings-notifications" path="settings/notifications" element={<Notifications />} />,
    <Route key="admin-settings-invoice-templates" path="settings/invoice-templates" element={<InvoiceTemplates />} />,
    <Route key="admin-settings-company-automation" path="settings/company-automation" element={<CompanyAutomation />} />,
    <Route key="admin-settings-platform" path="settings/platform" element={<Platform />} />,
    <Route key="admin-settings-integrations" path="settings/integrations" element={<Integrations />} />,
    <Route key="admin-settings-cms" path="settings/cms" element={<CMS />} />,
    <Route key="admin-settings-automation-rules" path="settings/automation-rules" element={<AutomationRules />} />,
    <Route key="admin-settings-custom-messages" path="settings/custom-messages" element={<CustomMessages />} />,
    
    <Route key="admin-reports" path="reports" element={<Reports />} />,
    <Route key="admin-support" path="support" element={<Support />} />,
    <Route key="admin-test-accounts" path="test-accounts" element={<TestAccounts />} />,
    
    <Route key="admin-member-purchases" path="members/member-purchases" element={<MemberPurchases />} />,
  ];
};

export default useAdminRoutes;
