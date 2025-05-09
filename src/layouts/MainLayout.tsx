
import React, { Suspense, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import RouteErrorBoundary from '@/routes/RouteErrorBoundary';
import FallbackNavigation from '@/components/FallbackNavigation';
import { useNavigation } from '@/hooks/cms/useNavigation';

const MainLayout = () => {
  const { mainItems, isLoading, error } = useNavigation();
  const [showFallbackNav, setShowFallbackNav] = useState(false);
  
  // Show fallback navigation if CMS navigation fails or is empty
  useEffect(() => {
    if ((!isLoading && error) || (!isLoading && mainItems.length === 0)) {
      setShowFallbackNav(true);
    } else {
      setShowFallbackNav(false);
    }
  }, [mainItems, isLoading, error]);

  return (
    <div className="flex flex-col min-h-screen">
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
