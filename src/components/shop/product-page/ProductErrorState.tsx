
import React from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductErrorStateProps {
  error: string | null;
}

const ProductErrorState: React.FC<ProductErrorStateProps> = ({ error }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Product Not Found
      </h2>
      
      <p className="text-gray-600 mb-6">
        {error || "We couldn't find the product you're looking for."}
      </p>
      
      <Link 
        to="/shop" 
        className="inline-flex items-center text-gym-orange hover:text-gym-orange/80 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Shop
      </Link>
    </div>
  );
};

export default ProductErrorState;
