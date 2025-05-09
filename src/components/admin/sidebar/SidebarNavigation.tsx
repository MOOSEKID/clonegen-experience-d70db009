
import React, { useState } from 'react';
import SidebarLink from './SidebarLink';
import { NavLinkProps } from './types';
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

// Sidebar links configuration
const sidebarLinks: NavLinkProps[] = [
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
  // New test accounts link
  {
    icon: UserCog,
    text: 'Test Accounts',
    href: '/admin/test-accounts',
  },
];

const SidebarNavigation: React.FC = () => {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (text: string) => {
    setOpenSubMenu(openSubMenu === text ? null : text);
  };

  return (
    <nav className="flex-grow p-4">
      <ul>
        {sidebarLinks.map((link) => (
          <li key={link.text} className="mb-1">
            <SidebarLink
              link={link}
              openSubMenu={openSubMenu}
              toggleSubMenu={toggleSubMenu}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNavigation;
