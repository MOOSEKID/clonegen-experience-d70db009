
import React from 'react';
import { Category } from '@/hooks/useCategories';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Dumbbell, ShoppingBag, Shirt, Utensils } from 'lucide-react';
import { CategoryWithChildren } from '@/hooks/shop/shopTypes';

interface CategoriesSectionProps {
  categories: Category[];
  categoryCount: Record<string, number>;
  hierarchicalCategories?: CategoryWithChildren[];
  selectedCategory?: string;
  onCategorySelect: (slug?: string) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ 
  categories, 
  categoryCount, 
  hierarchicalCategories = [],
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
    } else if (iconName.includes('utensils')) {
      return <Utensils className="h-5 w-5" />;
    } else {
      return <ShoppingBag className="h-5 w-5" />;
    }
  };
  
  // Render a single category badge
  const renderCategoryBadge = (category: Category, isChild = false) => (
    <Badge 
      key={category.id}
      variant={selectedCategory === category.slug ? "default" : "outline"}
      className={`text-sm py-2 px-4 cursor-pointer flex items-center gap-2 
        ${selectedCategory === category.slug ? 'bg-gym-orange hover:bg-gym-orange/90' : 'hover:bg-gray-100'}
        ${isChild ? 'ml-6 border-dashed' : ''}`}
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
  );
  
  // Recursively render category and its children
  const renderCategoryWithChildren = (category: CategoryWithChildren) => {
    if (!category.is_active) return null;
    
    const children = category.children?.filter(child => child.is_active) || [];
    
    return (
      <React.Fragment key={category.id}>
        {renderCategoryBadge(category)}
        {children.map(child => renderCategoryBadge(child, true))}
      </React.Fragment>
    );
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
        
        {hierarchicalCategories && hierarchicalCategories.length > 0 
          ? hierarchicalCategories.map(renderCategoryWithChildren)
          : categories.filter(cat => cat.is_active).map(category => renderCategoryBadge(category))
        }
      </div>
    </div>
  );
};

export default CategoriesSection;
