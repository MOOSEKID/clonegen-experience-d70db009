
import React from 'react';
import { Dumbbell, ShoppingBag, Shirt, Utensils } from 'lucide-react';
import CategoryCard from '@/components/shop/CategoryCard';
import { Category } from '@/hooks/useCategories';

interface CategoriesSectionProps {
  categories: Category[];
  categoryCount?: Record<string, number>;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories, categoryCount = {} }: CategoriesSectionProps) => {
  // Get the icon component by name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-gym-orange" />;
      case 'Dumbbell':
        return <Dumbbell className="w-6 h-6 text-gym-orange" />;
      case 'Shirt':
        return <Shirt className="w-6 h-6 text-gym-orange" />;
      default:
        return <ShoppingBag className="w-6 h-6 text-gym-orange" />;
    }
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gym-dark">Shop by Category</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard 
            key={category.id}
            id={category.id}
            name={category.name}
            icon={getIconComponent(category.icon || 'ShoppingBag')}
            description={category.description || ''}
            productCount={category.productCount || categoryCount[category.id] || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
