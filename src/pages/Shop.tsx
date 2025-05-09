
import React, { useState } from 'react';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopSearch from '@/components/shop/ShopSearch';
import CategoriesSection from '@/components/shop/CategoriesSection';
import ProductsSection from '@/components/shop/ProductsSection';
import ShoppingCart from '@/components/shop/ShoppingCart'; 
import ShopFilter from '@/components/shop/ShopFilter';
import { useShopProducts } from '@/hooks/useShopProducts';
import { useCart } from '@/contexts/CartContext';

const ShopPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    isLoading,
    filteredProducts,
    categories,
    categoryCount,
    error,
    filters,
    updateFilters,
    priceRange
  } = useShopProducts();
  
  const { cartItems } = useCart();

  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16">
      <div className="container-custom px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <ShopHeader />
        <ShopSearch 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          cartItems={cartItems} 
        />
        <CategoriesSection 
          categories={categories} 
          categoryCount={categoryCount} 
        />
        <ShopFilter 
          categories={categories} 
          onApplyFilters={updateFilters}
          initialFilters={filters}
        />
        <ProductsSection 
          isLoading={isLoading} 
          filteredProducts={filteredProducts} 
          searchTerm={searchTerm} 
          error={error}
        />
        <ShoppingCart />
      </div>
    </div>
  );
};

export default ShopPage;
