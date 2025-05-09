
import React from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ShoppingCart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    cartTotal,
    isCartOpen, 
    setIsCartOpen 
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Format currency
  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
  };
  
  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };
  
  if (!isCartOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5 text-gym-orange" />
            Your Cart
            {cartItems.length > 0 && (
              <span className="ml-2 text-sm text-gray-600">
                ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)
              </span>
            )}
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Cart items */}
        <div className="flex-grow overflow-auto p-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <ShoppingBag className="h-16 w-16 mb-2 opacity-20" />
              <p className="mb-6">Your cart is empty</p>
              <Button 
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="bg-gym-orange hover:bg-gym-orange/90"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                // Determine price based on user membership
                const price = user?.role === 'member' && item.member_price 
                  ? item.member_price 
                  : item.price;
                
                return (
                  <div key={item.id} className="flex border-b pb-4">
                    {/* Product image */}
                    <div className="h-20 w-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Product details */}
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <p className="mt-1 text-xs text-gray-500">{item.category}</p>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center border rounded">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                            disabled={item.quantity >= item.stock_count}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-gym-orange font-medium">
                          {formatPrice(price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className="flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500 hover:bg-red-50"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer with totals */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">{formatPrice(cartTotal)}</span>
            </div>
            
            <Button 
              className="w-full bg-gym-orange hover:bg-gym-orange/90 text-white"
              onClick={handleCheckout}
            >
              Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setIsCartOpen(false);
                navigate('/shop');
              }}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
