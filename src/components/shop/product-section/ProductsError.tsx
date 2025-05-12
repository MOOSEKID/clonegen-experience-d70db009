
import React from 'react';

interface ProductsErrorProps {
  error: string;
}

const ProductsError: React.FC<ProductsErrorProps> = ({ error }) => {
  return (
    <div className="mt-8 p-4 bg-red-50 text-red-800 rounded-lg">
      <h2 className="text-lg font-medium">Error loading products</h2>
      <p>{error}</p>
    </div>
  );
};

export default ProductsError;
