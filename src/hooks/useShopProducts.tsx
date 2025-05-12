
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/hooks/useProducts';
import { toast } from 'sonner';
import { useCategories, Category } from '@/hooks/useCategories';

export type ShopFilters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price-asc' | 'price-desc' | 'newest';
  search?: string;
  memberOnly?: boolean;
};

export const useShopProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryCount, setCategoryCount] = useState<Record<string, number>>({});
  const [filters, setFilters] = useState<ShopFilters>({});
  
  // Fetch products with filters directly from Supabase
  const fetchProducts = useCallback(async (filters: ShopFilters = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
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
        setError('Failed to load products. Please try again later.');
        return;
      }
      
      console.log(`Fetched ${productsData?.length || 0} products successfully`);
      setProducts(productsData as Product[] || []);
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch categories and count products per category
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
        setError('Failed to load categories. Please try again later.');
        return;
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
        
        setCategories(categoriesWithCounts);
        setCategoryCount(countsByCategoryMap);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }, []);

  // Load products and categories on initial render
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  // Fetch products whenever filters change
  useEffect(() => {
    fetchProducts({
      ...filters,
      search: searchTerm
    });
  }, [filters, searchTerm, fetchProducts]);

  // Function to add products to cart
  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    
    // Show a toast notification
    toast(`${product.name} added to cart`, {
      description: "Item successfully added to your cart",
      position: "top-right",
      duration: 2000,
    });
  };

  // Set filters
  const updateFilters = (newFilters: Partial<ShopFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    searchTerm,
    setSearchTerm,
    cartItems,
    products,
    categories,
    isLoading,
    error,
    addToCart,
    categoryCount,
    filters,
    updateFilters
  };
};
