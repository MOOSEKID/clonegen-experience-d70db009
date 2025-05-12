
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface ProductBreadcrumbProps {
  categoryId: string;
  categoryName: string;
  productName: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ 
  categoryId, 
  categoryName, 
  productName 
}) => {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-8">
      <Link to="/" className="flex items-center hover:text-gym-orange transition-colors">
        <Home size={16} className="mr-1" />
        Home
      </Link>
      <ChevronRight size={14} className="mx-2" />
      
      <Link to="/shop" className="hover:text-gym-orange transition-colors">
        Shop
      </Link>
      <ChevronRight size={14} className="mx-2" />
      
      {categoryName && (
        <>
          <Link 
            to={`/shop/category/${categoryId}`} 
            className="hover:text-gym-orange transition-colors"
          >
            {categoryName}
          </Link>
          <ChevronRight size={14} className="mx-2" />
        </>
      )}
      
      <span className="text-gray-900 font-medium">{productName}</span>
    </nav>
  );
};

export default ProductBreadcrumb;
