
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

export const useHeaderState = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safely access auth context with default values
  const auth = (() => {
    try {
      return useAuth();
    } catch (error) {
      console.error("Auth context not available yet:", error);
      return {
        isAuthenticated: false,
        isAdmin: false,
        logout: async () => false
      };
    }
  })();
  
  const { isAuthenticated, isAdmin, logout } = auth;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCompanyDropdownOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.company-dropdown') && isCompanyDropdownOpen) {
        setIsCompanyDropdownOpen(false);
      }
      if (!target.closest('.services-dropdown') && isServicesDropdownOpen) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCompanyDropdownOpen, isServicesDropdownOpen]);

  const handleDashboardClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/dashboard' } });
      return;
    }
    navigate(isAdmin ? '/admin' : '/dashboard');
  };

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent multiple clicks
    
    try {
      setIsLoggingOut(true);
      console.log("Header: Initiating logout process");
      
      const success = await logout();
      
      if (success) {
        console.log("Header: Logout successful, redirecting to login");
        // Add a small delay before navigation to ensure state is updated
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 150);
      } else {
        console.error("Header: Logout was unsuccessful");
        toast.error("There was an issue during logout. Please try again.");
      }
    } catch (error) {
      console.error("Header: Error during logout:", error);
      toast.error("Failed to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    isScrolled,
    isMenuOpen,
    setIsMenuOpen,
    isCompanyDropdownOpen,
    setIsCompanyDropdownOpen,
    isServicesDropdownOpen,
    setIsServicesDropdownOpen,
    isLoggingOut,
    isAuthenticated,
    isAdmin,
    handleDashboardClick,
    handleLogout
  };
};
