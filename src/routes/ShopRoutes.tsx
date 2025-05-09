
import React from 'react';
import { Route } from 'react-router-dom';
import ShopPage from '@/pages/Shop';
import CategoryPage from '@/pages/shop/CategoryPage';
import ProductPage from '@/pages/shop/ProductPage';
import CheckoutPage from '@/pages/shop/CheckoutPage';
import { CartProvider } from '@/contexts/CartContext';

const ShopRoutes = () => {
  return (
    <CartProvider>
      <Route path="/" element={<ShopPage />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </CartProvider>
  );
};

export default ShopRoutes;
