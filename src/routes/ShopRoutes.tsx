
import React from 'react';
import { Route } from 'react-router-dom';
import ShopPage from '@/pages/Shop';
import CategoryPage from '@/pages/shop/CategoryPage';
import ProductPage from '@/pages/shop/ProductPage';
import CheckoutPage from '@/pages/shop/CheckoutPage';

const ShopRoutes = () => {
  return (
    <>
      <Route path="/" element={<ShopPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </>
  );
};

export default ShopRoutes;
