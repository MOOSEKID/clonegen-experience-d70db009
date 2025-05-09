
import React, { Suspense, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import RouteErrorBoundary from '@/routes/RouteErrorBoundary';
import FallbackNavigation from '@/components/FallbackNavigation';
import { useNavigation } from '@/hooks/cms/useNavigation';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { useCmsSync } from '@/hooks/cms/useCmsSync';
import { toast } from 'sonner';

const MainLayout = () => {
  const { mainItems, isLoading, error } = useNavigation();
  const [showFallbackNav, setShowFallbackNav] = useState(false);
  const [showRestoreButton, setShowRestoreButton] = useState(false);
  const { forceSync, isSyncing } = useCmsSync();
  const navigate = useNavigate();
  
  // Show fallback navigation if CMS navigation fails or is empty
  useEffect(() => {
    // Wait a bit to ensure data loading is complete
    const timer = setTimeout(() => {
      if ((!isLoading && error) || (!isLoading && mainItems.length === 0)) {
        setShowFallbackNav(true);
        setShowRestoreButton(true);
        console.log("Navigation issue detected - using fallback", {
          isLoading, 
          hasError: !!error, 
          itemCount: mainItems.length
        });
      } else {
        setShowFallbackNav(false);
        setShowRestoreButton(false);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [mainItems, isLoading, error]);
  
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
    <div className="flex flex-col min-h-screen">
      {/* Emergency Site Restore Button */}
      {showRestoreButton && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button 
            onClick={handleRestoreSite}
            disabled={isSyncing}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white shadow-lg flex items-center gap-2"
          >
            {isSyncing ? (
              <>
                <RotateCw className="h-4 w-4 animate-spin" />
                Restoring Site...
              </>
            ) : (
              <>
                <RotateCw className="h-4 w-4" />
                Emergency Restore
              </>
            )}
          </Button>
        </div>
      )}
      
      {showFallbackNav && <FallbackNavigation className="sticky top-0 z-50" />}
      
      {/* Regular header with CMS navigation */}
      {!showFallbackNav && <Header />}
      
      <main className="flex-grow">
        <RouteErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </RouteErrorBoundary>
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
