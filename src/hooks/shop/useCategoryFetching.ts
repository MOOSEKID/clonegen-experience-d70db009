
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/hooks/useCategories';

export const useCategoryFetching = () => {
  const fetchCategories = useCallback(async () => {
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
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
        
        return {
          categories: categoriesWithCounts as Category[],
          categoryCount: countsByCategoryMap
        };
      }

      return {
        categories: [],
        categoryCount: {}
      };
    } catch (error) {
      console.error('Unexpected error:', error);
      return {
        categories: [],
        categoryCount: {}
      };
    }
  }, []);

  return { fetchCategories };
};
