
import React from 'react';
import { Product } from '@/hooks/useProducts';
import ProductCard from './product-section/ProductCard';

interface ProductGridProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, addToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          addToCart={addToCart} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;
