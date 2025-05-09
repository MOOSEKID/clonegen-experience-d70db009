
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/hooks/useProducts';
import { Category } from '@/hooks/useCategories';
import { useAuth } from '@/hooks/useAuth';
import { ShopFiltersType } from '@/components/shop/ShopFilter';

export const useShopProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryCount, setCategoryCount] = useState<Record<string, number>>({});
  const { user } = useAuth();
  
  const isMember = user?.role === 'member';
  
  // Filter state
  const [filters, setFilters] = useState<ShopFiltersType>({
    priceRange: [0, 500000],
    categories: [],
    sort: 'newest'
  });
  
  // Min and max price for filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);

  // Fetch products and categories from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch products
        console.log('Fetching products from Supabase...');
        let query = supabase
          .from('products')
          .select('*, category:categories(id, name)')
          .eq('is_active', true);
          
        // If user is not a member, exclude member-only products
        if (!isMember) {
          query = query.eq('is_public', true).eq('is_member_only', false);
        }
          
        const { data: productsData, error: productsError } = await query;
          
        if (productsError) {
          console.error('Error fetching products:', productsError);
          setError('Failed to load products. Please try again later.');
          return;
        }

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (categoriesError) {
          console.error('Error fetching categories:', categoriesError);
          setError('Failed to load categories. Please try again later.');
          return;
        }
        
        // Process products data
        if (productsData && productsData.length > 0) {
          console.log(`Fetched ${productsData.length} products successfully`);
          setProducts(productsData as Product[]);
          
          // Find min and max prices for price filter
          let min = Number.MAX_SAFE_INTEGER;
          let max = 0;
          
          productsData.forEach(product => {
            const price = product.price || 0;
            if (price < min) min = price;
            if (price > max) max = price;
          });
          
          // Add some buffer to the max price
          max = Math.ceil(max * 1.2 / 1000) * 1000;
          min = Math.floor(min / 1000) * 1000;
          
          setPriceRange([min, max]);
          setFilters(prev => ({
            ...prev,
            priceRange: [min, max]
          }));
          
          // Count products by category
          const countsByCategoryMap: Record<string, number> = {};
          productsData.forEach(product => {
            if (product.category_id) {
              countsByCategoryMap[product.category_id] = (countsByCategoryMap[product.category_id] || 0) + 1;
            }
          });
          setCategoryCount(countsByCategoryMap);
        } else {
          console.log('No products found in database');
          setProducts([]);
        }

        // Process categories data
        if (categoriesData) {
          const countsByCategoryMap = categoryCount; // Use the state value
          const categoriesWithCounts = categoriesData.map(category => ({
            ...category,
            productCount: countsByCategoryMap[category.id] || 0
          }));
          setCategories(categoriesWithCounts);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('An unexpected error occurred. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [isMember]);

  // Apply filters and search to products
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    return products.filter(product => {
      // Text search filter
      const matchesSearch = 
        !searchTerm ||
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      
      // Price filter
      const price = product.price || 0;
      const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
      
      if (!matchesPrice) return false;
      
      // Category filter
      const matchesCategory = 
        filters.categories.length === 0 || 
        filters.categories.includes(product.category_id || '');
      
      if (!matchesCategory) return false;
      
      return true;
    }).sort((a, b) => {
      // Sort based on selected option
      switch (filters.sort) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
  }, [products, searchTerm, filters]);

  // Update filters
  const updateFilters = (newFilters: ShopFiltersType) => {
    setFilters(newFilters);
  };

  return {
    searchTerm,
    setSearchTerm,
    products,
    categories,
    isLoading,
    error,
    filteredProducts,
    categoryCount,
    filters,
    updateFilters,
    priceRange
  };
};
