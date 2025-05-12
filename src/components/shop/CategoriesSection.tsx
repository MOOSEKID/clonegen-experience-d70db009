
import React from 'react';
import CategoryCard from '@/components/shop/CategoryCard';
import { Category } from '@/hooks/useCategories';

interface CategoriesSectionProps {
  categories: Category[];
  categoryCount: Record<string, number>;
}

const CategoriesSection = ({ categories, categoryCount }: CategoriesSectionProps) => {
  // Filter for active categories and sort to put featured ones first
  const activeCategories = categories
    .filter(category => category.is_active)
    .sort((a, b) => {
      // Featured categories come first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then sort by name
      return a.name.localeCompare(b.name);
    });
    
  if (activeCategories.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gym-dark mb-6">Categories</h2>
        <div className="bg-white/50 rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500">No product categories available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gym-dark mb-6">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {activeCategories.map(category => (
          <CategoryCard 
            key={category.id} 
            category={category} 
            productCount={categoryCount[category.id] || 0} 
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
