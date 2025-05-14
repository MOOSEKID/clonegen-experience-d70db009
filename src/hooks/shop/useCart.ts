
import { useState, useEffect } from 'react';
import { Product } from '@/hooks/useProducts';
import { toast } from 'sonner';

export interface CartItem extends Product {
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
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
  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      // Check if item already exists in cart
      const existingItemIndex = prev.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prev, { ...product, quantity }];
      }
    });
    
    // Show a toast notification
    toast(`${quantity} x ${product.name} added to cart`, {
      description: "Item successfully added to your cart",
      position: "top-right",
      durationMinutes: 2000,
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
  
  // Function to update the quantity of an item in the cart
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('gym-shop-cart');
  };

  // Calculate total items count
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate total price
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity,
    clearCart, 
    cartItemsCount,
    cartTotal
  };
};
