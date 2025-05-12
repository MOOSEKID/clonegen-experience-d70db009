
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Dumbbell, Shirt, Utensils } from 'lucide-react';
import { Category } from '@/hooks/useCategories';

interface CategoryCardProps {
  category: Category;
  productCount: number;
}

const CategoryCard = ({ category, productCount }: CategoryCardProps) => {
  // Get icon component based on the icon name
  const getIconComponent = (iconName?: string | null) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="h-6 w-6 text-gym-orange" />;
      case 'Dumbbell':
        return <Dumbbell className="h-6 w-6 text-gym-orange" />;
      case 'Shirt':
        return <Shirt className="h-6 w-6 text-gym-orange" />;
      default:
        return <ShoppingBag className="h-6 w-6 text-gym-orange" />;
    }
  };

  return (
    <Link
      to={`/shop/category/${category.slug}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center group"
    >
      <div className="p-3 bg-gym-orange/10 rounded-full mb-4">
        {getIconComponent(category.icon)}
      </div>
      
      <h3 className="font-semibold text-lg mb-2 group-hover:text-gym-orange transition-colors">
        {category.name}
      </h3>
      
      {category.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{category.description}</p>
      )}
      
      <span className="text-xs font-medium bg-gray-100 px-3 py-1 rounded-full">
        {productCount} {productCount === 1 ? 'product' : 'products'}
      </span>

      {category.featured && (
        <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
          Featured
        </span>
      )}
    </Link>
  );
};

export default CategoryCard;
