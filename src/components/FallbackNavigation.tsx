
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, RotateCw } from 'lucide-react';
import { getNavItems } from '@/data/headerNavData';
import { Button } from '@/components/ui/button';
import { useCmsSync } from '@/hooks/cms/useCmsSync';
import { toast } from 'sonner';

interface FallbackNavigationProps {
  className?: string;
}

/**
 * Provides a hardcoded navigation when the CMS navigation system fails
 */
const FallbackNavigation: React.FC<FallbackNavigationProps> = ({ className = "" }) => {
  const navItems = getNavItems();
  const { forceSync, isSyncing } = useCmsSync();
  const navigate = useNavigate();
  
  const handleRestoreSite = () => {
    toast.info("Attempting to restore site navigation and layout...");
    forceSync(undefined, {
      onSuccess: () => {
        toast.success("Site restored successfully! Redirecting to admin...");
        setTimeout(() => navigate("/admin/settings/cms"), 1500);
      },
      onError: () => {
        toast.error("Restoration failed. Please go to Admin > Settings > CMS > Route Sync");
        setTimeout(() => navigate("/admin/settings/cms"), 2000);
      }
    });
  };
  
  return (
    <div className={`${className}`}>
      <div className="bg-amber-50 border-amber-200 border-b px-4 py-2 text-amber-800 flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <div>
            <p className="font-medium text-sm">Site is in emergency mode - CMS navigation unavailable</p>
            <p className="text-xs">Please restore the site using the button below</p>
          </div>
        </div>
        <Button 
          onClick={handleRestoreSite}
          disabled={isSyncing}
          variant="outline"
          size="sm"
          className="ml-4 border-amber-300 hover:bg-amber-100"
        >
          {isSyncing ? (
            <>
              <RotateCw className="h-3 w-3 mr-1 animate-spin" />
              Restoring...
            </>
          ) : (
            <>
              <RotateCw className="h-3 w-3 mr-1" />
              Restore Site
            </>
          )}
        </Button>
      </div>
      
      <nav className="px-4 py-2 flex flex-wrap gap-x-6 gap-y-2 justify-center">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className="text-gray-700 hover:text-gym-orange transition-colors"
          >
            {item.label}
          </Link>
        ))}
        <Link 
          to="/admin/settings/cms"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          Admin CMS Settings
        </Link>
      </nav>
    </div>
  );
};

export default FallbackNavigation;
