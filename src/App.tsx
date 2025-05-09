
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
        <Router>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Shop Routes - the only ones we'll implement for now */}
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
              {/* Default route */}
              <Route path="*" element={<ShopPage />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </OptimizedAuthProvider>
  );
}

export default App;
