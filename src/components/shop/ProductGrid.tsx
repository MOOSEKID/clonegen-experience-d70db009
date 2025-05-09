
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/hooks/useProducts';
import { ShoppingBag } from 'lucide-react';

type ProductGridProps = {
  products: Product[];
  addToCart: (product: Product) => void;
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, addToCart }) => {
  // Handle null or undefined products
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 bg-white/50 rounded-lg shadow-sm">
        <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700">No Products Found</h3>
        <p className="text-gray-500 text-center mt-2">
          We couldn't find any products matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
