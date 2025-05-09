
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { routeService } from '@/services/cms/routeService';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from 'sonner';
import { RefreshCcw, Check, AlertCircle, Trash, ArrowRightLeft } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCmsSync } from '@/hooks/cms/useCmsSync';
import { useRoutes } from '@/hooks/cms/useRoutes';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavItems } from '@/hooks/cms/useNavItems';

/**
 * Emergency component for restoring routes when CMS sync is broken
 */
const RoutesRestorer = () => {
  const { syncRoutes, forceSync, isSyncing } = useCmsSync();
  const { routes, syncedRoutes } = useRoutes();
  const { navItems } = useNavItems();
  const [restorationComplete, setRestorationComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [restorationError, setRestorationError] = useState<string | null>(null);
  const [isFullRestore, setIsFullRestore] = useState(false);

  // Calculate progress
  useEffect(() => {
    if (!routes.length) return;
    
    const percentage = (syncedRoutes.length / routes.length) * 100;
    setProgress(percentage);
    
    if (percentage >= 100 && syncedRoutes.length > 0) {
      setRestorationComplete(true);
    }
  }, [syncedRoutes.length, routes.length]);
  
  const handleEmergencyRestore = async () => {
    try {
      toast.info("Starting emergency route restoration...");
      setRestorationError(null);
      setIsFullRestore(false);
      
      // First attempt to bootstrap CMS pages if they don't exist
      syncRoutes(undefined, {
        onSuccess: () => {
          toast.success("Routes have been restored successfully");
          setRestorationComplete(true);
        },
        onError: (error) => {
          console.error("Route restoration failed:", error);
          toast.error("Initial restoration failed. Try force restore.");
          setRestorationError("Standard restoration failed. Please try Force Restore.");
        }
      });
    } catch (error) {
      console.error("Emergency restore error:", error);
      toast.error("Route restoration encountered an error");
      setRestorationError("Route restoration failed with an unexpected error");
    }
  };

  const handleForceRestore = async () => {
    try {
      toast.info("Starting force route restoration...");
      setRestorationError(null);
      setIsFullRestore(true);
      
      // Force restore routes even if they exist
      forceSync(undefined, {
        onSuccess: () => {
          toast.success("All routes have been forcefully restored");
          setRestorationComplete(true);
        },
        onError: (error) => {
          console.error("Force route restoration failed:", error);
          toast.error("Failed to restore routes. Please contact support.");
          setRestorationError("Force restore failed. This may require database intervention.");
        }
      });
    } catch (error) {
      console.error("Force restore error:", error);
      setRestorationError("Force route restoration failed with an unexpected error");
    }
  };

  return (
    <Card className={restorationError ? "border-red-300" : (restorationComplete ? "border-green-300" : "")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {restorationError && <AlertCircle className="h-5 w-5 text-red-500" />}
          {restorationComplete && <Check className="h-5 w-5 text-green-500" />}
          Emergency Route Restoration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {restorationComplete ? (
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-500" />
            <AlertTitle>Restoration Complete</AlertTitle>
            <AlertDescription>
              All routes have been successfully restored and synchronized with the CMS database.
              {navItems.length === 0 && (
                <p className="mt-2 font-medium">
                  Next step: Create navigation items using the Quick Navigation Setup above.
                </p>
              )}
            </AlertDescription>
          </Alert>
        ) : restorationError ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Restoration Issue</AlertTitle>
            <AlertDescription>
              {restorationError}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <AlertTitle>Route Recovery Tool</AlertTitle>
            <AlertDescription>
              This tool will attempt to restore all routes in the CMS by re-syncing known routes from the application code.
              Use this if pages are missing or navigation is broken.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Recovery progress</span>
            <span>{syncedRoutes.length} / {routes.length} routes synchronized</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
          {routes.slice(0, 6).map(route => (
            <div key={route.path} className="border rounded p-2 text-sm flex items-center justify-between">
              <span className="truncate">{route.path}</span>
              {syncedRoutes.some(sr => sr.path === (route.path === '/' ? '/home' : route.path)) ? (
                <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">Synced</Badge>
              ) : (
                <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-800">Pending</Badge>
              )}
            </div>
          ))}
        </div>
        
        {routes.length > 6 && (
          <p className="text-xs text-center text-gray-500">
            +{routes.length - 6} more routes
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          onClick={handleEmergencyRestore} 
          disabled={isSyncing || (restorationComplete && !restorationError)}
          className="w-full"
          variant={restorationError ? "outline" : "default"}
        >
          {isSyncing && !isFullRestore ? (
            <>
              <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
              Restoring Routes...
            </>
          ) : restorationComplete && !restorationError ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Restoration Complete
            </>
          ) : (
            <>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Standard Restore 
            </>
          )}
        </Button>
        
        <Button 
          onClick={handleForceRestore}
          disabled={isSyncing || (restorationComplete && !restorationError)}
          className="w-full"
          variant="destructive"
        >
          {isSyncing && isFullRestore ? (
            <>
              <ArrowRightLeft className="mr-2 h-4 w-4 animate-spin" />
              Force Restoring...
            </>
          ) : (
            <>
              <Trash className="mr-2 h-4 w-4" />
              Force Restore All Routes
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoutesRestorer;
