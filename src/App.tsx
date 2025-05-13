
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/ui/error-boundary";
import { useEffect, useState, lazy, Suspense } from "react";
import AppLoadingScreen from "./components/ui/AppLoadingScreen";

// Layouts and shared components
import { MainLayout, ErrorFallback, PageLoading, AdminRoute, UserRoute } from "./routes/RouteComponents";

// Lazy load layout components
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const DashboardLayout = lazy(() => import("./pages/dashboard/DashboardLayout"));

import { QueryProvider } from "./routes/QueryProvider";

// Import routes hooks directly (using named import)
import useMainRoutes from "./hooks/routing/useMainRoutes";
import { useAdminRoutes } from "./hooks/routing/useAdminRoutes"; 
import useDashboardRoutes from "./hooks/routing/useDashboardRoutes";

const App = () => {
  const [appReady, setAppReady] = useState(false);

  // Simulate initial app loading and setup
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAppReady(true);
    }, 800);  // Short delay for loading screen to show
    
    return () => clearTimeout(timeout);
  }, []);

  if (!appReady) {
    return <AppLoadingScreen message="Starting Uptown Gym..." />;
  }
  
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <QueryProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Main Routes with Header and Footer */}
                <Route element={<MainLayout />}>
                  {useMainRoutes()}
                </Route>
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <Suspense fallback={<PageLoading />}>
                      <AdminLayout />
                    </Suspense>
                  </AdminRoute>
                }>
                  {useAdminRoutes().map((route) => (
                    <Route 
                      key={route.path} 
                      path={route.path.replace('/admin/', '')} 
                      element={route.element}
                    >
                      {route.children?.map((child) => (
                        <Route 
                          key={child.path} 
                          path={child.path} 
                          element={child.element} 
                        />
                      ))}
                    </Route>
                  ))}
                </Route>
                
                {/* Dashboard Routes */}
                <Route path="/dashboard" element={
                  <UserRoute>
                    <Suspense fallback={<PageLoading />}>
                      <DashboardLayout />
                    </Suspense>
                  </UserRoute>
                }>
                  {useDashboardRoutes()}
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};

export default App;
