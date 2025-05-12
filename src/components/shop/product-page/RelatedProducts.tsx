
import React from 'react';
import { Product } from '@/hooks/useProducts';
import ProductGrid from '@/components/shop/ProductGrid';

interface RelatedProductsProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, addToCart }) => {
  if (!products || products.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gym-dark mb-6">Related Products</h2>
      <ProductGrid products={products} addToCart={addToCart} />
    </div>
  );
};

export default RelatedProducts;
