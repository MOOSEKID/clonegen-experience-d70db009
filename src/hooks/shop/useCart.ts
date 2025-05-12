
import { useState } from 'react';
import { Product } from '@/hooks/useProducts';
import { toast } from 'sonner';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

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

  return { cartItems, addToCart };
};
