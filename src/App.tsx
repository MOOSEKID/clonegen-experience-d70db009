
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { OptimizedAuthProvider } from '@/contexts/OptimizedAuthContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import ShopPage from '@/pages/Shop';
import CategoryPage from '@/pages/shop/CategoryPage';
import ProductPage from '@/pages/shop/ProductPage';
import CheckoutPage from '@/pages/shop/CheckoutPage';
import { CartProvider } from '@/contexts/CartContext';

function App() {
  return (
    <OptimizedAuthProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Shop Routes */}
                <Route path="/" element={<ShopPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/category/:categoryId" element={<CategoryPage />} />
                <Route path="/shop/product/:productId" element={<ProductPage />} />
                <Route path="/shop/checkout" element={<CheckoutPage />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<ShopPage />} />
              </Routes>
            </Suspense>
          </Router>
        </CartProvider>
      </AuthProvider>
    </OptimizedAuthProvider>
  );
}

export default App;
