
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ShoppingBag } from 'lucide-react';

interface ProductErrorStateProps {
  error: string | null;
}

const ProductErrorState: React.FC<ProductErrorStateProps> = ({ error }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{error || 'Product Not Found'}</h2>
      <p className="text-gray-600 mb-6">
        The product you're looking for doesn't exist or couldn't be loaded.
      </p>
      <Link 
        to="/shop"
        className="inline-flex items-center bg-gym-orange hover:bg-gym-orange/90 text-white px-6 py-3 rounded-md transition-colors"
      >
        <ShoppingBag className="mr-2" size={18} />
        Back to Shop
      </Link>
    </div>
  );
};

export default ProductErrorState;
