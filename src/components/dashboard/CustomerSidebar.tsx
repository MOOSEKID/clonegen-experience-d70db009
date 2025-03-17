
import { Link, useLocation } from 'react-router-dom';
import {
  Dumbbell,
  Calendar,
  ClipboardList,
  Bell,
  Settings,
  LogOut,
  Home,
  DumbbellIcon,
  Award,
  CreditCard
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

interface CustomerSidebarProps {
  isOpen: boolean;
}

const CustomerSidebar = ({ isOpen }: CustomerSidebarProps) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div
      className={`bg-gym-darkblue text-white w-full md:w-64 flex-shrink-0 transition-all duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'block' : 'hidden md:block md:w-20'} ${isCollapsed ? 'md:w-20' : ''}`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="mb-8 flex items-center justify-center">
          <Link to="/" className="text-2xl font-bold text-gym-orange">
            {isOpen && !isCollapsed ? 'Uptown Gym' : 'UG'}
          </Link>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className={`flex items-center p-3 rounded-md transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-gym-orange text-white'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Home size={20} />
                {(isOpen && !isCollapsed) && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/workouts"
                className={`flex items-center p-3 rounded-md transition-colors ${
                  isActive('/dashboard/workouts')
                    ? 'bg-gym-orange text-white'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <DumbbellIcon size={20} />
                {(isOpen && !isCollapsed) && <span className="ml-3">Workouts</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/classes"
                className={`flex items-center p-3 rounded-md transition-colors ${
                  isActive('/dashboard/classes')
                    ? 'bg-gym-orange text-white'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Calendar size={20} />
                {(isOpen && !isCollapsed) && <span className="ml-3">Classes</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/progress"
                className={`flex items-center p-3 rounded-md transition-colors ${
                  isActive('/dashboard/progress')
                    ? 'bg-gym-orange text-white'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Award size={20} />
                {(isOpen && !isCollapsed) && <span className="ml-3">Progress</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/nutrition"
                className={`flex items-center p-3 rounded-md transition-colors ${
                  isActive('/dashboard/nutrition')
                    ? 'bg-gym-orange text-white'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <ClipboardList size={20} />
                {(isOpen && !isCollapsed) && <span className="ml-3">Nutrition</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/billing"
                className={`flex items-center p-3 rounded-md transition-colors ${
                  isActive('/dashboard/billing')
                    ? 'bg-gym-orange text-white'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <CreditCard size={20} />
                {(isOpen && !isCollapsed) && <span className="ml-3">Billing</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/notifications"
                className={`flex items-center p-3 rounded-md transition-colors ${
                  isActive('/dashboard/notifications')
                    ? 'bg-gym-orange text-white'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Bell size={20} />
                {(isOpen && !isCollapsed) && <span className="ml-3">Notifications</span>}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto pt-4 border-t border-white/10">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard/settings"
                className={`flex items-center p-3 rounded-md transition-colors ${
                  isActive('/dashboard/settings')
                    ? 'bg-gym-orange text-white'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <Settings size={20} />
                {(isOpen && !isCollapsed) && <span className="ml-3">Settings</span>}
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-3 rounded-md transition-colors text-white/70 hover:bg-white/10"
              >
                <LogOut size={20} />
                {(isOpen && !isCollapsed) && <span className="ml-3">Logout</span>}
              </button>
            </li>
          </ul>
          
          {isOpen && !isCollapsed && user && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="text-white/50 text-xs">
                Signed in as:
              </div>
              <div className="text-sm font-medium text-white truncate">
                {user.full_name || user.email}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSidebar;
