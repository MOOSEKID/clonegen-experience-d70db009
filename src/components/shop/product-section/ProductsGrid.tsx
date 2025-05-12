
import React from 'react';
import { Product } from '@/hooks/useProducts';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ products, addToCart }) => {
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

export default ProductsGrid;
