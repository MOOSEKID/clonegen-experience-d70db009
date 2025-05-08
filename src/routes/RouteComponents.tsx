
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ErrorBoundary } from "../components/ui/error-boundary";

// Loading component for suspense fallback
export const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gym-dark">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
  </div>
);

// Error fallback component
export const ErrorFallback = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-red-50 text-red-800">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-4">The application encountered an error. Please try refreshing the page.</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Refresh Page
      </button>
    </div>
  );
};

// Admin redirect component for the home page
export const AdminRedirect = () => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Wait until auth checking is complete
    if (!isLoading) {
      if (isAuthenticated && isAdmin) {
        console.log('Admin user detected on homepage, redirecting to admin dashboard');
        navigate('/admin', { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, isAdmin, navigate]);
  
  // Show loading indicator while checking
  if (isLoading) {
    return <PageLoading />;
  }
  
  // Show the Index page for non-admin users
  return <Index />;
};

// Dynamically import Index to avoid circular dependency
import Index from "../pages/Index";

// Main Layout component that includes Header and Footer
export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Header />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};

// Admin route guard component
export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <PageLoading />;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Redirect to dashboard if not admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // User is authenticated and admin, render children
  return <>{children}</>;
};

// User route guard component
export const UserRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  if (isLoading) {
    return <PageLoading />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  return <>{children}</>;
};
