
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

interface AdminRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

const AdminRoute = ({ 
  children, 
  redirectTo = '/login' 
}: AdminRouteProps) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      console.log('AdminRoute: User is not admin, redirecting');
    }
  }, [isLoading, isAuthenticated, isAdmin]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to={redirectTo} state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
