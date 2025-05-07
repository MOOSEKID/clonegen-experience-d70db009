import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
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
  ChevronDown,
  UserCog,
} from 'lucide-react';

interface NavLinkProps {
  icon: React.ComponentType<any>;
  text: string;
  href: string;
  subLinks?: { text: string; href: string }[];
}

interface AdminSidebarProps {
  isOpen: boolean;
}

// Sidebar links configuration
const sidebarLinks = [
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
    subLinks: [
      {
        text: 'Profiles',
        href: '/admin/trainers/profiles',
      },
      {
        text: 'Performance',
        href: '/admin/trainers/performance',
      },
      {
        text: 'Ratings',
        href: '/admin/trainers/ratings',
      },
    ],
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

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (text: string) => {
    setOpenSubMenu(openSubMenu === text ? null : text);
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-full w-64 bg-gym-darkblue border-r border-white/5 text-white transition-transform duration-300 z-50',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:static' // Remove fixed positioning and translate on larger screens
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center h-20 border-b border-white/5">
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="h-10 w-auto">
              <img
                src="/lovable-uploads/50d3d473-1f3f-40d6-b895-c64a2e29ca1d.png"
                alt="Uptown Gym Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow p-4">
          <ul>
            {sidebarLinks.map((link) => (
              <li key={link.text} className="mb-1">
                {link.subLinks ? (
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-2 px-4 rounded hover:bg-gym-dark transition-colors duration-200"
                      onClick={() => toggleSubMenu(link.text)}
                    >
                      <div className="flex items-center">
                        <link.icon className="mr-2 h-4 w-4" />
                        <span>{link.text}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          openSubMenu === link.text ? 'rotate-180' : ''
                        )}
                      />
                    </button>
                    {/* Submenu */}
                    <ul
                      className={cn(
                        'ml-4 mt-1 overflow-hidden transition-all duration-300',
                        openSubMenu === link.text ? 'max-h-96' : 'max-h-0'
                      )}
                    >
                      {link.subLinks.map((subLink) => (
                        <li key={subLink.text} className="mb-1">
                          <Link
                            to={subLink.href}
                            className={cn(
                              'block py-2 px-4 rounded hover:bg-gym-dark transition-colors duration-200',
                              location.pathname === subLink.href
                                ? 'text-gym-orange'
                                : 'text-white/80'
                            )}
                          >
                            {subLink.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className={cn(
                      'flex items-center py-2 px-4 rounded hover:bg-gym-dark transition-colors duration-200',
                      location.pathname === link.href
                        ? 'text-gym-orange'
                        : 'text-white/80'
                    )}
                  >
                    <link.icon className="mr-2 h-4 w-4" />
                    <span>{link.text}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer or additional content can go here */}
        <div className="p-4 border-t border-white/5 text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Uptown Gym</p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
