import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

type StaffCategory = 'management' | 'training' | 'operations' | 'reception' | 'maintenance';
type UserCategory = StaffCategory | 'customer';
type AccessLevel = 'full' | 'high' | 'medium' | 'basic' | 'limited';

interface RouteGuardProps {
  children: React.ReactNode;
  requiredAccess?: AccessLevel;
  allowedCategories?: UserCategory[];
}

export const RouteGuard = ({ 
  children, 
  requiredAccess = 'limited',
  allowedCategories = []
}: RouteGuardProps) => {
  const { isAuthenticated, profile } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !profile) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Check access level
  const accessLevels: Record<AccessLevel, number> = {
    full: 4,
    high: 3,
    medium: 2,
    basic: 1,
    limited: 0
  };

  const userAccessLevel = accessLevels[profile.access_level as AccessLevel || 'limited'];
  const requiredAccessLevel = accessLevels[requiredAccess];

  // Check category if specified
  const categoryAllowed = allowedCategories.length === 0 || 
    allowedCategories.includes(profile.staff_category as UserCategory) ||
    (profile.is_admin && profile.staff_category === 'management');

  if (userAccessLevel < requiredAccessLevel || !categoryAllowed) {
    // Redirect to appropriate dashboard based on user type
    if (profile.is_admin) {
      return <Navigate to="/admin/trainers" replace />;
    } else if (profile.staff_category === 'training') {
      return <Navigate to="/trainer/dashboard" replace />;
    } else if (profile.staff_category === 'customer') {
      return <Navigate to="/customer/dashboard" replace />;
    } else {
      return <Navigate to="/staff/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
