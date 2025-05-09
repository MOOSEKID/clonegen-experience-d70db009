
import React from 'react';
import ProductGrid from '@/components/shop/ProductGrid';
import { Product } from '@/hooks/useProducts';

interface ProductsSectionProps {
  isLoading: boolean;
  filteredProducts: Product[];
  searchTerm: string;
  addToCart: (product: Product) => void;
}

const ProductsSection = ({ isLoading, filteredProducts, searchTerm, addToCart }: ProductsSectionProps) => {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gym-dark">
          {searchTerm ? 'Search Results' : 'Featured Products'}
        </h2>
      </div>
      
      {isLoading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading products...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} addToCart={addToCart} />
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsSection;
