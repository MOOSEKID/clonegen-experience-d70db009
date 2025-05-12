
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/hooks/useProducts';
import { ShopFilters } from './shopTypes';

export const useProductFetching = () => {
  const fetchProducts = useCallback(async (filters: ShopFilters = {}) => {
    try {
      console.log('Fetching products with filters:', filters);
      
      // Start building the query
      let query = supabase
        .from('products')
        .select('*, categories(id, name, slug, description, icon, featured)')
        .eq('is_active', true)
        .eq('is_public', true);

      // Apply filters
      if (filters.category) {
        // Join with categories to filter by slug
        query = query.eq('categories.slug', filters.category);
      }
      
      if (filters.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }
      
      if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }
      
      if (filters.memberOnly) {
        query = query.eq('is_member_only', true);
      }
      
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }
      
      // Apply sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case 'name':
            query = query.order('name', { ascending: true });
            break;
          case 'price-asc':
            query = query.order('price', { ascending: true });
            break;
          case 'price-desc':
            query = query.order('price', { ascending: false });
            break;
          case 'newest':
            query = query.order('created_at', { ascending: false });
            break;
          default:
            query = query.order('name', { ascending: true });
        }
      } else {
        // Default sort
        query = query.order('name', { ascending: true });
      }
      
      const { data: productsData, error: productsError } = await query;
      
      if (productsError) {
        console.error('Error fetching products:', productsError);
        throw new Error('Failed to load products. Please try again later.');
      }
      
      console.log(`Fetched ${productsData?.length || 0} products successfully`);
      return productsData as Product[] || [];
      
    } catch (error) {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred. Please try again later.');
    }
  }, []);

  return { fetchProducts };
};
