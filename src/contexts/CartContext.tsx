
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Product } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();
  
  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Calculate total price of all items in cart
  const cartTotal = cartItems.reduce((total, item) => {
    const price = user?.role === 'member' && item.member_price ? item.member_price : item.price;
    return total + (price * item.quantity);
  }, 0);
  
  // Calculate total number of items
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  
  // Add a product to the cart
  const addToCart = (product: Product, quantity: number = 1) => {
    // Don't allow adding out-of-stock items
    if (product.stock_count <= 0) {
      toast.error('This item is out of stock');
      return;
    }
    
    // Check if the item is already in the cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
      // If item exists, update its quantity
      const updatedItems = [...cartItems];
      const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
      
      // Make sure we don't exceed available stock
      if (newQuantity > product.stock_count) {
        toast.error(`Sorry, only ${product.stock_count} units available`);
        updatedItems[existingItemIndex].quantity = product.stock_count;
      } else {
        updatedItems[existingItemIndex].quantity = newQuantity;
      }
      
      setCartItems(updatedItems);
    } else {
      // If it's a new item, add it to the cart
      const newItem: CartItem = { ...product, quantity };
      setCartItems([...cartItems, newItem]);
    }
    
    toast.success(`${product.name} added to cart`);
    setIsCartOpen(true); // Open the cart when item is added
  };
  
  // Remove a product from the cart
  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast.info('Item removed from cart');
  };
  
  // Update the quantity of a product in the cart
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    const updatedItems = cartItems.map(item => {
      if (item.id === productId) {
        // Make sure we don't exceed available stock
        if (quantity > item.stock_count) {
          toast.error(`Sorry, only ${item.stock_count} units available`);
          return { ...item, quantity: item.stock_count };
        }
        return { ...item, quantity };
      }
      return item;
    });
    
    setCartItems(updatedItems);
  };
  
  // Clear all items from the cart
  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };
  
  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
