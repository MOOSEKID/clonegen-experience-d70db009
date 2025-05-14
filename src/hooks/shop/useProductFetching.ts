import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/hooks/useProducts';
import { ShopFilters } from './shopTypes';

export const useProductFetching = () => {
  const fetchProducts = useCallback(async (filters?: ShopFilters) => {
    try {
      let query = supabase
        .from('products')
        .select('*, category:categories(*)')
        .eq('is_active', true)
        .eq('is_public', true);

      // Apply filters if provided
      if (filters) {
        // Filter by category
        if (filters.category) {
          // First, get the category ID from the slug
          const { data: categoryData } = await supabase
            .from('categories')
            .select('id')
            .eq('slug', filters.category)
            .single();
            
          if (categoryData) {
            // Check if this category has subcategories
            const { data: subcategories } = await supabase
              .from('categories')
              .select('id')
              .eq('parent_id', categoryData.id);
              
            if (subcategories && subcategories.length > 0) {
              // If there are subcategories, include them in the filter
              const subcategoryIds = subcategories.map(sub => sub.id);
              query = query.in('category_id', [categoryData.id, ...subcategoryIds]);
            } else {
              // Otherwise, just filter by the selected category
              query = query.eq('category_id', categoryData.id);
            }
          }
        }

        // Filter by price range
        if (filters.minPrice !== undefined) {
          query = query.gte('price', filters.minPrice);
        }
        
        if (filters.maxPrice !== undefined) {
          query = query.lte('price', filters.maxPrice);
        }

        // Filter by search term
        if (filters.search) {
          query = query.ilike('name', `%${filters.search}%`);
        }

        // Filter by member-only products
        if (filters.memberOnly) {
          query = query.eq('is_member_only', true);
        }

        // Apply sorting
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case 'price-asc':
              query = query.order('price', { ascending: true });
              break;
            case 'price-desc':
              query = query.order('price', { ascending: false });
              break;
            case 'newest':
              query = query.order('createdAt', { ascending: false });
              break;
            case 'name':
              query = query.order('name', { ascending: true });
              break;
            default:
              // Default sorting by name
              query = query.order('name', { ascending: true });
          }
        } else {
          // Default sorting
          query = query.order('name', { ascending: true });
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to load products. Please try again later.');
      }

      return data as Product[];
    } catch (error) {
      console.error('Unexpected error:', error);
      throw error;
    }
  }, []);

  return { fetchProducts };
};
