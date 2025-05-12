
import React from 'react';
import ProductGrid from '@/components/shop/ProductGrid';
import { Product } from '@/hooks/useProducts';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface ProductsSectionProps {
  isLoading: boolean;
  filteredProducts: Product[];
  searchTerm: string;
  addToCart: (product: Product) => void;
  error: string | null;
  title?: string;
  categoryName?: string;
}

const ProductsSection = ({ 
  isLoading, 
  filteredProducts, 
  searchTerm, 
  addToCart, 
  error,
  title,
  categoryName
}: ProductsSectionProps) => {
  const displayTitle = title || (searchTerm ? 'Search Results' : (categoryName || 'Featured Products'));
  
  return (
    <div className="mb-16">
      <div className="flex items-center justify-between gap-3 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gym-dark">
          {displayTitle}
        </h2>
      </div>
      
      {error ? (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : isLoading ? (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading products...</p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} addToCart={addToCart} />
      ) : (
        <div className="text-center py-10 bg-white/50 rounded-lg shadow-sm">
          <p className="text-gray-500">
            {searchTerm 
              ? `No products found matching "${searchTerm}". Try a different search term.` 
              : categoryName
                ? `No products found in the "${categoryName}" category.`
                : "No products are currently available."}
          </p>
          {(searchTerm || categoryName) && (
            <button 
              onClick={() => window.location.href = '/shop'}
              className="mt-4 px-4 py-2 bg-gym-orange text-white rounded-md hover:bg-gym-orange/90"
            >
              View all products
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsSection;
