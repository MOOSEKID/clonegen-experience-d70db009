
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/hooks/useCategories';
import { CategoryWithChildren } from './shopTypes';

export const useCategoryFetching = () => {
  const fetchCategories = useCallback(async () => {
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*, parent:parent_id(*)')
        .eq('is_active', true)
        .order('name');

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        throw new Error('Failed to load categories. Please try again later.');
      }

      // Count products per category
      const { data: productsCount, error: countError } = await supabase
        .from('products')
        .select('category_id')
        .eq('is_active', true)
        .eq('is_public', true);

      if (countError) {
        console.error('Error counting products:', countError);
      }

      // Process categories with counts
      if (categoriesData) {
        const countsByCategoryMap: Record<string, number> = {};
        
        if (productsCount) {
          productsCount.forEach(product => {
            if (product.category_id) {
              countsByCategoryMap[product.category_id] = (countsByCategoryMap[product.category_id] || 0) + 1;
            }
          });
        }
        
        const categoriesWithCounts = categoriesData.map(category => ({
          ...category,
          productCount: countsByCategoryMap[category.id] || 0
        }));

        // Organize into hierarchical structure
        const mainCategories: CategoryWithChildren[] = [];
        const categoryMap = new Map<string, CategoryWithChildren>();

        // First pass: create a map of all categories
        categoriesWithCounts.forEach(category => {
          categoryMap.set(category.id, { ...category, children: [] });
        });

        // Second pass: build the tree structure
        categoriesWithCounts.forEach(category => {
          const categoryWithChildren = categoryMap.get(category.id);
          if (categoryWithChildren) {
            if (!category.parent_id) {
              mainCategories.push(categoryWithChildren);
            } else {
              const parentCategory = categoryMap.get(category.parent_id);
              if (parentCategory) {
                parentCategory.children = parentCategory.children || [];
                parentCategory.children.push(categoryWithChildren);
              } else {
                // If parent doesn't exist, treat as main category
                mainCategories.push(categoryWithChildren);
              }
            }
          }
        });
        
        return {
          categories: categoriesWithCounts as Category[],
          categoryCount: countsByCategoryMap,
          hierarchicalCategories: mainCategories
        };
      }

      return {
        categories: [],
        categoryCount: {},
        hierarchicalCategories: []
      };
    } catch (error) {
      console.error('Unexpected error:', error);
      return {
        categories: [],
        categoryCount: {},
        hierarchicalCategories: []
      };
    }
  }, []);

  return { fetchCategories };
};
