
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/ui/error-boundary";
import { useEffect, useState } from "react";
import AppLoadingScreen from "./components/ui/AppLoadingScreen";

// Route components
import { MainLayout, ErrorFallback } from "./routes/RouteComponents";
import MainRoutes from "./routes/MainRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";
import { QueryProvider } from "./routes/QueryProvider";

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
                  <MainRoutes />
                </Route>
                
                {/* Admin Routes */}
                <AdminRoutes />
                
                {/* Customer Dashboard Routes */}
                <DashboardRoutes />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundary>
  );
};

export default App;
