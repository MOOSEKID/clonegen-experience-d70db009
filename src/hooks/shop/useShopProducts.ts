
import { useState, useEffect } from 'react';
import { Product } from '@/hooks/useProducts';
import { Category } from '@/hooks/useCategories';
import { useProductFetching } from './useProductFetching';
import { useCategoryFetching } from './useCategoryFetching';
import { useCart } from './useCart';
import { ShopFilters } from './shopTypes';

export const useShopProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryCount, setCategoryCount] = useState<Record<string, number>>({});
  const [filters, setFilters] = useState<ShopFilters>({});
  
  const { fetchProducts } = useProductFetching();
  const { fetchCategories } = useCategoryFetching();
  const { cartItems, addToCart, removeFromCart, clearCart, cartItemsCount } = useCart();

  // Load products and categories on initial render
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData.categories);
        setCategoryCount(categoryData.categoryCount);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };
    
    loadInitialData();
  }, [fetchCategories]);

  // Fetch products whenever filters change
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const productsData = await fetchProducts({
          ...filters,
          search: searchTerm
        });
        setProducts(productsData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load products');
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, [filters, searchTerm, fetchProducts]);

  // Set filters
  const updateFilters = (newFilters: Partial<ShopFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    searchTerm,
    setSearchTerm,
    cartItems,
    cartItemsCount,
    products,
    categories,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    clearCart,
    categoryCount,
    filters,
    updateFilters
  };
};
