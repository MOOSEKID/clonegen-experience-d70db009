import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Dumbbell, ListTodo, Library, LineChart, Apple } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from '@/components/ui/badge';

interface NavItemProps {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badge?: {
    text: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  };
}

const navigation: NavItemProps[] = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Workouts", href: "/dashboard/workouts", icon: Dumbbell },
  { name: "Workout Programs", href: "/dashboard/workout-programs", icon: ListTodo },
  { name: "Exercise Library", href: "/dashboard/exercise-library", icon: Library },
  { name: "Progress", href: "/dashboard/progress", icon: LineChart },
  { 
    name: "Nutrition", 
    href: "/dashboard/nutrition", 
    icon: Apple,
    badge: { text: "Soon", variant: "secondary" }
  },
];

const CustomerSidebar = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50 border-r py-4">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold text-gray-700">Member Dashboard</h2>
      </div>
      <div className="space-y-1 flex-1">
        {navigation.map((item) => (
          <TooltipProvider key={item.name}>
            <Tooltip delayDuration={50}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${isActive
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`
                  }
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                  {item.badge && (
                    <Badge variant={item.badge.variant} className="ml-auto">
                      {item.badge.text}
                    </Badge>
                  )}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                {item.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default CustomerSidebar;
