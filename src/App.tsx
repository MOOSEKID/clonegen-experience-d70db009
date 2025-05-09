
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
              {/* Shop Routes with CartProvider */}
              <Route path="/" element={<CartProvider><ShopPage /></CartProvider>} />
              <Route path="/shop" element={<CartProvider><ShopPage /></CartProvider>} />
              <Route path="/shop/category/:categoryId" element={<CartProvider><CategoryPage /></CartProvider>} />
              <Route path="/shop/product/:productId" element={<CartProvider><ProductPage /></CartProvider>} />
              <Route path="/shop/checkout" element={<CartProvider><CheckoutPage /></CartProvider>} />
              
              {/* Catch-all route */}
              <Route path="*" element={<CartProvider><ShopPage /></CartProvider>} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </OptimizedAuthProvider>
  );
}

export default App;
