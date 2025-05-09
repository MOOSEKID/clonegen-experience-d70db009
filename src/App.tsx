import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { OptimizedAuthProvider } from '@/contexts/OptimizedAuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import PublicRoute from '@/routes/PublicRoute';
import PrivateRoute from '@/routes/PrivateRoute';
import AdminRoute from '@/routes/AdminRoute';
import DashboardLayout from '@/layouts/DashboardLayout';
import MainLayout from '@/layouts/MainLayout';
import useAdminRoutes from '@/hooks/routing/useAdminRoutes';
import ShopPage from '@/pages/Shop';
import CategoryPage from '@/pages/shop/CategoryPage';
import ProductPage from '@/pages/shop/ProductPage';
import CheckoutPage from '@/pages/shop/CheckoutPage';
import { CartProvider } from '@/contexts/CartContext';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Auth = lazy(() => import('./pages/Auth'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Classes = lazy(() => import('./pages/Classes'));
const ClassDetail = lazy(() => import('./pages/ClassDetail'));
const Trainers = lazy(() => import('./pages/Trainers'));
const TrainerDetail = lazy(() => import('./pages/TrainerDetail'));
const Workouts = lazy(() => import('./pages/Workouts'));
const WorkoutDetail = lazy(() => import('./pages/WorkoutDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const adminRoutes = useAdminRoutes();

  return (
    <OptimizedAuthProvider>
      <AuthProvider>
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/about" element={<MainLayout><About /></MainLayout>} />
              <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
              <Route path="/pricing" element={<MainLayout><Pricing /></MainLayout>} />
              <Route path="/auth" element={<PublicRoute><Auth /></PublicRoute>} />

              {/* Shop Routes */}
              <Route path="/shop/*" element={
                <CartProvider>
                  <Routes>
                    <Route path="/" element={<ShopPage />} />
                    <Route path="/category/:categoryId" element={<CategoryPage />} />
                    <Route path="/product/:productId" element={<ProductPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                  </Routes>
                </CartProvider>
              } />

              {/* Private Routes */}
              <Route path="/dashboard" element={<PrivateRoute><DashboardLayout><Dashboard /></DashboardLayout></PrivateRoute>} />
              <Route path="/profile" element={<PrivateRoute><DashboardLayout><Profile /></DashboardLayout></PrivateRoute>} />
              <Route path="/classes" element={<PrivateRoute><MainLayout><Classes /></MainLayout></PrivateRoute>} />
              <Route path="/classes/:classId" element={<PrivateRoute><DashboardLayout><ClassDetail /></DashboardLayout></PrivateRoute>} />
              <Route path="/trainers" element={<PrivateRoute><MainLayout><Trainers /></MainLayout></PrivateRoute>} />
              <Route path="/trainers/:trainerId" element={<PrivateRoute><DashboardLayout><TrainerDetail /></DashboardLayout></PrivateRoute>} />
              <Route path="/workouts" element={<PrivateRoute><DashboardLayout><Workouts /></DashboardLayout></PrivateRoute>} />
              <Route path="/workouts/:workoutId" element={<PrivateRoute><DashboardLayout><WorkoutDetail /></DashboardLayout></PrivateRoute>} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminRoute><DashboardLayout><Dashboard /></DashboardLayout></AdminRoute>}>
                {adminRoutes.map((route, index) => (
                  <React.Fragment key={index}>{route}</React.Fragment>
                ))}
              </Route>

              {/* Not Found Route */}
              <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </OptimizedAuthProvider>
  );
}

export default App;
