
import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Dumbbell,
  CreditCard,
  Activity,
  ShoppingCart,
  FileText,
  BarChart,
  Settings,
  HelpCircle,
  UserCog,
} from 'lucide-react';
import { NavLinkProps } from './types';

// Sidebar links configuration
export const sidebarLinks: NavLinkProps[] = [
  {
    icon: LayoutDashboard,
    text: 'Dashboard',
    href: '/admin',
  },
  {
    icon: Users,
    text: 'Members',
    href: '/admin/members',
  },
  {
    icon: CalendarClock,
    text: 'Classes',
    href: '/admin/classes',
  },
  {
    icon: Dumbbell,
    text: 'Trainers',
    href: '/admin/trainers',
  },
  {
    icon: CreditCard,
    text: 'Payments',
    href: '/admin/payments',
  },
  {
    icon: Activity,
    text: 'Workouts',
    href: '/admin/workouts',
  },
  {
    icon: ShoppingCart,
    text: 'Shop',
    href: '/admin/shop',
  },
  {
    icon: FileText,
    text: 'Content',
    href: '/admin/content',
  },
  {
    icon: BarChart,
    text: 'Reports',
    href: '/admin/reports',
  },
  {
    icon: Settings,
    text: 'Settings',
    href: '/admin/settings',
  },
  {
    icon: HelpCircle,
    text: 'Support',
    href: '/admin/support',
  },
  // Test accounts link
  {
    icon: UserCog,
    text: 'Test Accounts',
    href: '/admin/test-accounts',
  },
];
