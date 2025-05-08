
import { LucideIcon, ShoppingBag, LayoutDashboard, User } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon?: LucideIcon;
  action?: () => void;
  isExternalLink?: boolean;
}

export interface ServiceItem {
  label: string;
  path: string;
}

export interface CompanyItem {
  label: string;
  path: string;
}

export const getNavItems = (): NavItem[] => [
  { label: 'Home', path: '/' },
  { label: 'Membership', path: '/membership' },
  { label: 'Classes', path: '/classes' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Shop', path: '/shop', icon: ShoppingBag },
];

export const getServiceItems = (): ServiceItem[] => [
  { label: 'All Services', path: '/services' },
  { label: 'Fitness Facilities', path: '/services/fitness-facilities' },
  { label: 'Youth Programs', path: '/services/youth-programs' },
  { label: 'Spa & Wellness', path: '/services/spa-wellness' },
];

export const getCompanyItems = (): CompanyItem[] => [
  { label: 'About Us', path: '/about-us' },
  { label: 'Contact Us', path: '/contact-us' },
  { label: 'Timetable', path: '/timetable' },
  { label: 'Opening Times', path: '/opening-times' },
];

export const getDashboardItem = (handleDashboardClick: () => void): NavItem => ({ 
  label: 'Dashboard', 
  path: '/dashboard', 
  icon: LayoutDashboard,
  action: handleDashboardClick
});

export const getAuthItems = (isAuthenticated: boolean, handleLogout: () => void): NavItem[] => 
  isAuthenticated 
    ? [
        {
          label: 'Logout',
          path: '#',
          icon: User,
          action: handleLogout
        }
      ]
    : [
        {
          label: 'Login',
          path: '/login',
          icon: User
        }
      ];
