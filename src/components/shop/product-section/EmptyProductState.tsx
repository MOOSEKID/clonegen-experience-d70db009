
import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface EmptyProductStateProps {
  searchTerm?: string;
}

const EmptyProductState: React.FC<EmptyProductStateProps> = ({ searchTerm }) => {
  return (
    <div className="p-8 text-center border rounded-lg bg-white">
      <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
      <h3 className="text-lg font-medium text-gray-800 mb-1">No Products Found</h3>
      <p className="text-gray-600">
        {searchTerm 
          ? `We couldn't find any products matching "${searchTerm}"`
          : "No products available in this category"
        }
      </p>
    </div>
  );
};

export default EmptyProductState;
