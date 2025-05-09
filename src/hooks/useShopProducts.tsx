
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/hooks/useProducts';
import { categories } from '@/utils/categoryUtils';

export const useShopProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryCount, setCategoryCount] = useState<Record<string, number>>({});
  
  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .eq('is_public', true);
          
        if (error) {
          console.error('Error fetching products:', error);
          return;
        }
        
        if (data) {
          setProducts(data as Product[]);
          // Count products by category
          const counts: Record<string, number> = {};
          data.forEach(product => {
            counts[product.category] = (counts[product.category] || 0) + 1;
          });
          setCategoryCount(counts);
        }
      } catch (error) {
        console.error('Error:', error);
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
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-gym-orange text-white px-4 py-2 rounded shadow-lg animate-in fade-in slide-in-from-top-4 z-50';
    toast.textContent = `${product.name} added to cart`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('animate-out', 'fade-out', 'slide-out-to-top-4');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  // Filter products by search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

  return {
    searchTerm,
    setSearchTerm,
    cartItems,
    products,
    isLoading,
    filteredProducts,
    addToCart
  };
};
