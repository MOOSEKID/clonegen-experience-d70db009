
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
    products, // Use products directly, not filteredProducts
    isLoading,
    categories,
    categoryCount,
    error,
    addToCart
  } = useShopProducts();

  // Just display the products based on current filters
  const featuredProducts = products.slice(0, 8); // Just show first 8 for now

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
        <ProductsSection 
          isLoading={isLoading} 
          filteredProducts={searchTerm ? products : featuredProducts}
          searchTerm={searchTerm} 
          addToCart={addToCart}
          error={error}
        />
      </div>
    </div>
  );
};

export default ShopPage;
