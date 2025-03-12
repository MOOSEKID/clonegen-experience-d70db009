
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  CalendarClock, 
  Dumbbell, 
  DollarSign,
  ShoppingBag, 
  FileEdit,
  BarChart3, 
  Settings,
  LifeBuoy,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink = ({ to, icon, label, isActive }: SidebarLinkProps) => (
  <Link 
    to={to}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
      isActive 
        ? "bg-gym-orange/10 text-gym-orange" 
        : "text-gray-600 hover:bg-gray-100 hover:text-gym-orange"
    )}
  >
    {icon}
    <span className="font-medium">{label}</span>
    {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
  </Link>
);

interface AdminSidebarProps {
  isOpen: boolean;
}

const AdminSidebar = ({ isOpen }: AdminSidebarProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const isLinkActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Navigation links configuration
  const navLinks = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/members', icon: <Users size={20} />, label: 'Members' },
    { to: '/admin/classes', icon: <CalendarClock size={20} />, label: 'Classes' },
    { to: '/admin/trainers', icon: <Users size={20} />, label: 'Trainers' },
    { to: '/admin/workouts', icon: <Dumbbell size={20} />, label: 'Workouts' },
    { to: '/admin/payments', icon: <DollarSign size={20} />, label: 'Payments' },
    { to: '/admin/shop', icon: <ShoppingBag size={20} />, label: 'Shop' },
    { to: '/admin/content', icon: <FileEdit size={20} />, label: 'Content' },
    { to: '/admin/reports', icon: <BarChart3 size={20} />, label: 'Reports' },
    { to: '/admin/support', icon: <LifeBuoy size={20} />, label: 'Support' },
    { to: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <aside 
      className={cn(
        "bg-white border-r border-gray-200 z-20 transition-all duration-300",
        isOpen 
          ? "w-64 flex-shrink-0" 
          : "w-0 md:w-20 overflow-hidden"
      )}
    >
      <div className={cn("h-full flex flex-col", isOpen ? "px-4" : "px-2")}>
        {/* Logo */}
        <div className="py-6 flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2">
            {isOpen ? (
              <img 
                src="/public/lovable-uploads/50d3d473-1f3f-40d6-b895-c64a2e29ca1d.png" 
                alt="Uptown Gym Logo" 
                className="h-12 w-auto object-contain"
              />
            ) : (
              <div className="bg-gym-orange p-2 rounded-lg">
                <Dumbbell className="h-6 w-6 text-white" />
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              isActive={isLinkActive(link.to)}
            />
          ))}
        </nav>

        {/* User section */}
        <div className="py-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="h-10 w-10 rounded-full bg-gym-orange/20 flex items-center justify-center">
              <Users size={20} className="text-gym-orange" />
            </div>
            {isOpen && (
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">Admin User</span>
                <span className="text-xs text-gray-500">admin@uptowngym.com</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
