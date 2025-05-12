
import React from 'react';
import { Product } from '@/hooks/useProducts';
import { ShopFilters } from '@/hooks/useShopProducts';
import ProductsHeader from './product-section/ProductsHeader';
import ProductsGrid from './product-section/ProductsGrid';
import ProductSkeletons from './product-section/ProductSkeletons';
import ProductFilters from './product-section/ProductFilters';
import EmptyProductState from './product-section/EmptyProductState';
import ProductsError from './product-section/ProductsError';

interface ProductSectionProps {
  isLoading: boolean;
  filteredProducts: Product[];
  searchTerm: string;
  error: string | null;
  addToCart: (product: Product) => void;
  onSortChange?: (sortOption: string) => void;
  onPriceFilterChange?: (min: number, max: number) => void;
  currentFilters?: ShopFilters;
  categoryName?: string;
}

const ProductsSection: React.FC<ProductSectionProps> = ({ 
  isLoading, 
  filteredProducts, 
  searchTerm, 
  error, 
  addToCart,
  onSortChange,
  onPriceFilterChange,
  currentFilters,
  categoryName
}) => {
  // For price slider
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 50000]);
  const [showFilters, setShowFilters] = React.useState(false);

  // Get min/max price for all products
  const allPrices = filteredProducts.map(product => product.price);
  const maxPrice = Math.max(...(allPrices.length ? allPrices : [50000]));

  const applyPriceFilter = () => {
    if (onPriceFilterChange) {
      onPriceFilterChange(priceRange[0], priceRange[1]);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductSkeletons count={8} />
        </div>
      </div>
    );
  }

  if (error) {
    return <ProductsError error={error} />;
  }

  return (
    <div className="mt-8">
      <ProductsHeader 
        categoryName={categoryName}
        searchTerm={searchTerm}
        productsCount={filteredProducts.length}
        onSortChange={onSortChange}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        onPriceFilterChange={onPriceFilterChange}
      />
      
      {showFilters && onPriceFilterChange && (
        <ProductFilters 
          maxPrice={maxPrice} 
          priceRange={priceRange} 
          setPriceRange={setPriceRange}
          onApplyFilter={applyPriceFilter}
        />
      )}

      {filteredProducts.length === 0 ? (
        <EmptyProductState searchTerm={searchTerm} />
      ) : (
        <ProductsGrid 
          products={filteredProducts} 
          addToCart={addToCart} 
        />
      )}
    </div>
  );
};

export default ProductsSection;
