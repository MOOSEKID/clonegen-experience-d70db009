
import React from 'react';
import { Route } from 'react-router-dom';
import ShopPage from '@/pages/Shop';
import CategoryPage from '@/pages/shop/CategoryPage';
import ProductPage from '@/pages/shop/ProductPage';
import CheckoutPage from '@/pages/shop/CheckoutPage';

const ShopRoutes = () => {
  return (
    <>
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/shop/category/:categoryId" element={<CategoryPage />} />
      <Route path="/shop/product/:productId" element={<ProductPage />} />
      <Route path="/shop/checkout" element={<CheckoutPage />} />
    </>
  );
};

export default ShopRoutes;
