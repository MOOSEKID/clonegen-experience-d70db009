
import React from 'react';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopSearch from '@/components/shop/ShopSearch';
import CategoriesSection from '@/components/shop/CategoriesSection';
import ProductsSection from '@/components/shop/ProductsSection';
import { useShopProducts } from '@/hooks/useShopProducts';

const ShopPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    cartItems,
    isLoading,
    filteredProducts,
    categories,
    categoryCount,
    error,
    addToCart
  } = useShopProducts();

  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16">
      <div className="container-custom">
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
        <ProductsSection 
          isLoading={isLoading} 
          filteredProducts={filteredProducts} 
          searchTerm={searchTerm} 
          addToCart={addToCart}
          error={error}
        />
      </div>
    </div>
  );
};

export default ShopPage;
