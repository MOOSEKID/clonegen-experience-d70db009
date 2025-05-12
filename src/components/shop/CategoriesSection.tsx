
import React from 'react';
import { Category } from '@/hooks/useCategories';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, ShoppingBag, Shirt } from 'lucide-react';

interface CategoriesSectionProps {
  categories: Category[];
  categoryCount: Record<string, number>;
  selectedCategory?: string;
  onCategorySelect: (slug?: string) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ 
  categories, 
  categoryCount, 
  selectedCategory,
  onCategorySelect 
}) => {
  
  // Function to render the appropriate icon based on category
  const renderCategoryIcon = (category: Category) => {
    const iconName = category.icon?.toLowerCase() || '';
    
    if (iconName.includes('dumbbell')) {
      return <Dumbbell className="h-5 w-5" />;
    } else if (iconName.includes('shirt') || iconName.includes('apparel')) {
      return <Shirt className="h-5 w-5" />;
    } else {
      return <ShoppingBag className="h-5 w-5" />;
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-3">
        <Badge 
          variant={!selectedCategory ? "default" : "outline"}
          className={`text-sm py-2 px-4 cursor-pointer ${!selectedCategory ? 'bg-gym-orange hover:bg-gym-orange/90' : 'hover:bg-gray-100'}`}
          onClick={() => onCategorySelect(undefined)}
        >
          All Categories
        </Badge>
        
        {categories.filter(cat => cat.is_active).map((category) => (
          <Badge 
            key={category.id}
            variant={selectedCategory === category.slug ? "default" : "outline"}
            className={`text-sm py-2 px-4 cursor-pointer flex items-center gap-2 
              ${selectedCategory === category.slug ? 'bg-gym-orange hover:bg-gym-orange/90' : 'hover:bg-gray-100'}`}
            onClick={() => onCategorySelect(category.slug)}
          >
            {renderCategoryIcon(category)}
            {category.name}
            {categoryCount[category.id] > 0 && (
              <span className="ml-1 bg-white bg-opacity-20 px-1.5 py-0.5 rounded-full text-xs">
                {categoryCount[category.id]}
              </span>
            )}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
