import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/hooks/useProducts';
import { toast } from 'sonner';
import { useCategories, Category } from '@/hooks/useCategories';

export const useShopProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryCount, setCategoryCount] = useState<Record<string, number>>({});
  
  // Fetch products and categories from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch products
        console.log('Fetching products from Supabase...');
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*, category:categories(id, name)')
          .eq('is_active', true)
          .eq('is_public', true);
          
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
  }, []);

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

  // Filter products by search term
  const filteredProducts = products.filter(product => 
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

  return {
    searchTerm,
    setSearchTerm,
    cartItems,
    products,
    categories,
    isLoading,
    error,
    filteredProducts,
    addToCart,
    categoryCount
  };
};
