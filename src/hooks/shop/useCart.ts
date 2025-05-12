
import { useState, useEffect } from 'react';
import { Product } from '@/hooks/useProducts';
import { toast } from 'sonner';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  // Load cart items from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('gym-shop-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse saved cart:', e);
        localStorage.removeItem('gym-shop-cart');
      }
    }
  }, []);
  
  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('gym-shop-cart', JSON.stringify(cartItems));
  }, [cartItems]);

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
  
  // Function to remove a product from cart
  const removeFromCart = (productId: string) => {
    setCartItems(prev => {
      const index = prev.findIndex(item => item.id === productId);
      if (index !== -1) {
        const newItems = [...prev];
        newItems.splice(index, 1);
        return newItems;
      }
      return prev;
    });
  };
  
  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('gym-shop-cart');
  };

  return { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    cartItemsCount: cartItems.length 
  };
};
