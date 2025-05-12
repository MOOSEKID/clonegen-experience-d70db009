
import React, { useState } from 'react';
import ShopHeader from '@/components/shop/ShopHeader';
import ShopSearch from '@/components/shop/ShopSearch';
import CategoriesSection from '@/components/shop/CategoriesSection';
import ProductsSection from '@/components/shop/ProductsSection';
import { useShopProducts } from '@/hooks/shop/useShopProducts';
import { toast } from 'sonner';

const ShopPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    cartItems,
    products,
    isLoading,
    categories,
    hierarchicalCategories,
    categoryCount,
    error,
    addToCart,
    filters,
    updateFilters
  } = useShopProducts();
  
  const [showFilters, setShowFilters] = useState(false);

  // Handle category selection
  const handleCategorySelect = (categorySlug?: string) => {
    updateFilters({ category: categorySlug });
  };

  // Handle price range filtering
  const handlePriceFilterChange = (min: number, max: number) => {
    updateFilters({ 
      minPrice: min > 0 ? min : undefined,
      maxPrice: max > 0 ? max : undefined 
    });
  };

  // Handle sorting
  const handleSortChange = (sortOption: string) => {
    updateFilters({ sortBy: sortOption as any });
  };
  
  // Handle filter toggle
  const handleFilterToggle = () => {
    setShowFilters(prev => !prev);
  };

  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16">
      <div className="container-custom px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <ShopHeader />
        <ShopSearch 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          cartItems={cartItems}
          onFilterToggle={handleFilterToggle}
        />
        <CategoriesSection 
          categories={categories} 
          hierarchicalCategories={hierarchicalCategories}
          categoryCount={categoryCount}
          selectedCategory={filters.category} 
          onCategorySelect={handleCategorySelect}
        />
        <ProductsSection 
          isLoading={isLoading} 
          filteredProducts={products}
          searchTerm={searchTerm} 
          addToCart={addToCart}
          error={error}
          onSortChange={handleSortChange}
          onPriceFilterChange={handlePriceFilterChange}
          currentFilters={filters}
          categoryName={filters.category ? 
            categories.find(c => c.slug === filters.category)?.name : undefined}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
      </div>
    </div>
  );
};

export default ShopPage;
