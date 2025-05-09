
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/hooks/useProducts';
import { categories } from '@/utils/categoryUtils';
import { toast } from 'sonner';

export const useShopProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryCount, setCategoryCount] = useState<Record<string, number>>({});
  
  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('Fetching products from Supabase...');
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .eq('is_public', true);
          
        if (error) {
          console.error('Error fetching products:', error);
          setError('Failed to load products. Please try again later.');
          return;
        }
        
        if (data && data.length > 0) {
          console.log(`Fetched ${data.length} products successfully`);
          setProducts(data as Product[]);
          
          // Count products by category
          const counts: Record<string, number> = {};
          data.forEach(product => {
            if (product.category) {
              counts[product.category] = (counts[product.category] || 0) + 1;
            }
          });
          setCategoryCount(counts);
        } else {
          console.log('No products found in database');
          // Set empty array but don't treat as error
          setProducts([]);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        setError('An unexpected error occurred. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Update category product counts
  useEffect(() => {
    if (Object.keys(categoryCount).length > 0) {
      categories.forEach(category => {      
        // Set the count from the database or 0 if none found
        category.productCount = categoryCount[category.dbName] || 0;
      });
    }
  }, [categoryCount]);
  
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
    isLoading,
    error,
    filteredProducts,
    addToCart
  };
};
