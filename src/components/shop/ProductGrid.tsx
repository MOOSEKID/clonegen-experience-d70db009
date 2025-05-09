
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/hooks/useProducts';

type ProductGridProps = {
  products: Product[];
  addToCart: (product: Product) => void;
};

const ProductGrid: React.FC<ProductGridProps> = ({ products, addToCart }) => {
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
