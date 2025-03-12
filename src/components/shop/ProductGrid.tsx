
import React from 'react';
import ProductCard, { Product } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  addToCart?: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, addToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
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
