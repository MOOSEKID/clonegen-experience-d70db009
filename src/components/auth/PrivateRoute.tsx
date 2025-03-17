
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, adminOnly = false }) => {
  const { user, isAdmin, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Redirect logic based on authentication state and user role
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login with the current location for redirect after login
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  // If this is an admin-only route but the user is not an admin
  if (adminOnly && !isAdmin) {
    // Redirect to the regular user dashboard
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
