
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { OptimizedAuthProvider } from '@/contexts/OptimizedAuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CartProvider } from '@/contexts/CartContext';
import { QueryProvider } from '@/routes/QueryProvider';

// Route components
import MainRoutes from '@/routes/MainRoutes';
import AdminRoutes from '@/routes/AdminRoutes';
import DashboardRoutes from '@/routes/DashboardRoutes';
import ShopRoutes from '@/routes/ShopRoutes';

// Layouts
const MainLayout = lazy(() => import('@/layouts/MainLayout'));
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'));
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));

// Not Found page
const NotFound = lazy(() => import('@/pages/NotFound'));

function App() {
  return (
    <QueryProvider>
      <OptimizedAuthProvider>
        <AuthProvider>
          <CartProvider>
            <Router>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Main public routes with MainLayout */}
                  <Route path="/" element={<MainLayout />}>
                    {/* Include all main routes */}
                    <Route path="*" element={<MainRoutes />} />
                    
                    {/* Include shop routes */}
                    <Route>{ShopRoutes()}</Route>
                  </Route>
                  
                  {/* Dashboard routes */}
                  <Route path="/dashboard/*" element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <DashboardLayout />
                    </Suspense>
                  }>
                    <Route path="*" element={<DashboardRoutes />} />
                  </Route>
                  
                  {/* Admin routes */}
                  <Route path="/admin/*" element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <AdminLayout />
                    </Suspense>
                  }>
                    <Route path="*" element={<AdminRoutes />} />
                  </Route>
                  
                  {/* Catch-all route - 404 */}
                  <Route path="*" element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <NotFound />
                    </Suspense>
                  } />
                </Routes>
              </Suspense>
            </Router>
          </CartProvider>
        </AuthProvider>
      </OptimizedAuthProvider>
    </QueryProvider>
  );
}

export default App;
