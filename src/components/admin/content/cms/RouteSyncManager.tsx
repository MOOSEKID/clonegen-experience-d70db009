import React, { useState, useEffect } from 'react';
import { useCmsSync } from '@/hooks/cms/useCmsSync';
import { useRoutes } from '@/hooks/cms/useRoutes';
import { useNavItems } from '@/hooks/cms/useNavItems';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Check, X, FileSymlink, Navigation, ArrowRight, AlertTriangle } from 'lucide-react';
import QuickNavSetup from './QuickNavSetup';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { routeService } from '@/services/cms/routeService';
import { toast } from 'sonner';
import RoutesRestorer from './RoutesRestorer';

const RouteSyncManager: React.FC = () => {
  const { routes, isLoading, syncedRoutes } = useRoutes();
  const { syncRoutes, isSyncing } = useCmsSync();
  const { navItems } = useNavItems();
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [showQuickSetup, setShowQuickSetup] = useState(false);
  const [bootstrapped, setBootstrapped] = useState(false);
  const [showEmergencyTools, setShowEmergencyTools] = useState(false);
  const [resyncAttempted, setResyncAttempted] = useState(false);

  useEffect(() => {
    // Check if we need to bootstrap pages on first load
    const checkBootstrap = async () => {
      try {
        const bootstrapNeeded = await routeService.bootstrapCmsPages();
        setBootstrapped(bootstrapNeeded);
        
        if (bootstrapNeeded) {
          setLastSyncTime(new Date());
          toast.success("Routes automatically synced on first load");
        }
      } catch (error) {
        console.error("Error checking bootstrap status:", error);
        toast.error("Unable to check route status. Please try manual sync.");
        setShowEmergencyTools(true);
      }
    };
    
    checkBootstrap();
  }, []);
  
  useEffect(() => {
    // Show quick setup if we have synced pages but no nav items
    if (syncedRoutes.length > 0 && navItems.length === 0) {
      setShowQuickSetup(true);
    }
    
    // Show emergency tools if we have no synced routes after initial load
    if (resyncAttempted && syncedRoutes.length === 0 && routes.length > 0) {
      setShowEmergencyTools(true);
      toast.error("Route sync failed. Please use Emergency Tools to restore routes.");
    }
  }, [syncedRoutes.length, navItems.length, routes.length, resyncAttempted]);

  const handleSync = () => {
    syncRoutes(undefined, {
      onSuccess: () => {
        setLastSyncTime(new Date());
        setShowQuickSetup(true);
        setResyncAttempted(true);
        toast.success("Routes successfully synchronized");
        
        // Add a toast encouraging the user to set up navigation
        if (navItems.length === 0) {
          toast.info("Now set up your navigation using Quick Navigation Setup below");
        } else {
          // If navigation already exists, offer to visit the site
          toast.success("Your site should now be restored! Redirecting to home page...", {
            action: {
              label: "View Site",
              onClick: () => window.location.href = "/",
            },
          });
          
          // Auto redirect after 2 seconds if navigation items already exist
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      },
      onError: (error) => {
        console.error("Sync error:", error);
        toast.error("Route sync failed. Try using Emergency Tools.");
        setShowEmergencyTools(true);
        setResyncAttempted(true);
      }
    });
  };

  const syncedCount = syncedRoutes.length;
  const totalRoutes = routes.length;
  const allSynced = syncedCount === totalRoutes && totalRoutes > 0;
  
  // Show alert if no routes are synced
  const showNoRoutesAlert = syncedCount === 0 && totalRoutes > 0 && !isLoading;

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Warning Alert for Failed Routes */}
        {showNoRoutesAlert && (
          <Alert variant="destructive" className="mb-4 border-red-400">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Route Synchronization Issue Detected</AlertTitle>
            <AlertDescription>
              No routes are currently synced. Your site may be in fallback mode. 
              Please click "Sync Routes" or use the Emergency Tools to restore your routes.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Route Sync Manager</CardTitle>
                <CardDescription>
                  Detect and sync frontend routes with the CMS database
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowEmergencyTools(!showEmergencyTools)}
                  className="text-amber-600 border-amber-300"
                  size="sm"
                >
                  {showEmergencyTools ? "Hide Emergency Tools" : "Emergency Tools"}
                </Button>
                <Button 
                  onClick={handleSync} 
                  disabled={isSyncing}
                  className="flex items-center gap-2"
                  variant={showNoRoutesAlert ? "destructive" : "default"}
                >
                  <RefreshCcw className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
                  {isSyncing ? "Syncing..." : "Sync Routes"}
                </Button>
              </div>
            </div>
            {lastSyncTime && (
              <p className="text-xs text-gray-500 mt-2">
                Last synced: {lastSyncTime.toLocaleTimeString()}
              </p>
            )}
          </CardHeader>

          {/* Route Table */}
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Path</TableHead>
                  <TableHead>Page Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="w-[100px]">Synced</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading routes...
                    </TableCell>
                  </TableRow>
                ) : routes?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No routes detected. You may need to create some pages.
                    </TableCell>
                  </TableRow>
                ) : (
                  routes?.map((route) => {
                    const isSynced = syncedRoutes.some(
                      sr => sr.path === (route.path === '/' ? '/home' : route.path)
                    );

                    return (
                      <TableRow key={route.path}>
                        <TableCell className="font-medium">{route.path}</TableCell>
                        <TableCell>{route.pageName}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={route.isDynamic ? "bg-purple-100 border-purple-200 text-purple-700" : ""}
                          >
                            {route.isDynamic ? "Dynamic" : "Static"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-500 text-xs truncate max-w-[250px]">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="flex items-center cursor-default">
                                <FileSymlink className="h-3 w-3 mr-1" />
                                {route.sourceFilePath}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{route.sourceFilePath}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          {isSynced ? (
                            <div className="flex items-center">
                              <Check className="text-green-500 h-4 w-4 mr-1" />
                              <span className="text-green-600 text-xs">Synced</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <X className="text-amber-500 h-4 w-4 mr-1" />
                              <span className="text-amber-600 text-xs">Not synced</span>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="pt-6">
            <div className="text-sm text-muted-foreground">
              {syncedCount} of {totalRoutes} routes synced with CMS
              {syncedCount === 0 && totalRoutes > 0 && (
                <span className="ml-2 text-red-500 font-medium">
                  - Action required!
                </span>
              )}
            </div>
          </CardFooter>
        </Card>
      
        {/* Emergency restoration component - always show if there are no synced routes */}
        {(showEmergencyTools || (syncedCount === 0 && totalRoutes > 0 && !isLoading)) && (
          <div className="border-l-4 border-amber-500 pl-4">
            <h3 className="text-amber-800 font-semibold mb-2">Emergency Route Recovery</h3>
            <p className="text-sm text-amber-700 mb-4">
              Use these tools to restore your site's navigation and routing when experiencing issues.
            </p>
            <div className="mt-4">
              <RoutesRestorer />
            </div>
          </div>
        )}
        
        {/* Quick Nav Setup */}
        {(showQuickSetup || navItems.length === 0) && syncedRoutes.length > 0 && (
          <>
            <Alert className="bg-blue-50 border-blue-200">
              <Navigation className="h-4 w-4 text-blue-500" />
              <AlertTitle>Next Step: Create Navigation</AlertTitle>
              <AlertDescription className="flex flex-col gap-2">
                <p>Your routes have been synced. Now create navigation items to show these pages in your site header.</p>
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <span>Step 1: Sync Routes</span> 
                  <Check className="h-4 w-4 text-green-500" />
                  <ArrowRight className="h-3 w-3" /> 
                  <span>Step 2: Create Navigation</span> 
                  <ArrowRight className="h-3 w-3" /> 
                  <span>Step 3: View Your Site</span>
                </div>
              </AlertDescription>
            </Alert>
            <QuickNavSetup />
          </>
        )}

        {allSynced && !showQuickSetup && navItems.length === 0 && (
          <Button 
            onClick={() => setShowQuickSetup(true)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Navigation className="h-4 w-4" />
            Create Navigation Items
          </Button>
        )}
        
        {navItems.length > 0 && !bootstrapped && syncedRoutes.length > 0 && (
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-500" />
            <AlertTitle>CMS Setup Complete</AlertTitle>
            <AlertDescription>
              Routes and navigation items have been set up. Your site navigation is now loaded from the CMS system.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </TooltipProvider>
  );
};

export default RouteSyncManager;
