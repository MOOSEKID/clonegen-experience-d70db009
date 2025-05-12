
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

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
    <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
      <Link to="/shop" className="hover:text-gym-orange">Shop</Link>
      <ChevronRight size={14} />
      <Link to={`/shop/category/${categoryId}`} className="hover:text-gym-orange">
        {categoryName}
      </Link>
      <ChevronRight size={14} />
      <span className="font-semibold text-gym-orange">{productName}</span>
    </div>
  );
};

export default ProductBreadcrumb;
