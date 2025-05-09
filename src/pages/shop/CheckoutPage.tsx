import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ShoppingBag, CheckCircle2, ArrowLeft, Tag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { incrementPromoCodeUses } from '@/utils/supabaseUtils';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { cartItems, clearCart, cartTotal } = useCart();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    payment_method: 'cash',
    promo_code: ''
  });
  
  const [promoCode, setPromoCode] = useState({
    code: '',
    discount: 0,
    type: '',
    applied: false
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle payment method selection
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      payment_method: e.target.value
    });
  };
  
  // Apply promo code
  const applyPromoCode = async () => {
    if (!formData.promo_code.trim()) {
      toast.error('Please enter a promo code');
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', formData.promo_code.toUpperCase())
        .eq('is_active', true)
        .gt('valid_until', new Date().toISOString())
        .single();
      
      if (error || !data) {
        toast.error('Invalid or expired promo code');
        return;
      }
      
      // Check if minimum purchase amount is met
      if (data.min_purchase_amount > 0 && cartTotal < data.min_purchase_amount) {
        toast.error(`This code requires a minimum purchase of RWF ${data.min_purchase_amount.toLocaleString()}`);
        return;
      }
      
      // Calculate discount
      let discountAmount = 0;
      if (data.discount_type === 'percentage') {
        discountAmount = cartTotal * (data.value / 100);
      } else { // fixed
        discountAmount = data.value;
      }
      
      // Apply the discount
      setPromoCode({
        code: data.code,
        discount: discountAmount,
        type: data.discount_type,
        applied: true
      });
      
      toast.success('Promo code applied successfully!');
    } catch (error) {
      console.error('Error applying promo code:', error);
      toast.error('Failed to apply promo code');
    }
  };
  
  // Format currency
  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
  };
  
  // Submit order
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get promo code ID if a code was applied
      let promoCodeId = null;
      if (promoCode.applied) {
        const { data } = await supabase
          .from('promo_codes')
          .select('id')
          .eq('code', promoCode.code)
          .single();
        
        if (data) {
          promoCodeId = data.id;
        }
      }
      
      // Calculate the final total
      const finalTotal = cartTotal - promoCode.discount;
      
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id || null,
          total_amount: finalTotal,
          discount_amount: promoCode.discount,
          promo_code_id: promoCodeId,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          delivery_address: formData.address,
          payment_method: formData.payment_method
        })
        .select()
        .single();
      
      if (orderError) {
        throw orderError;
      }
      
      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        unit_price: user?.role === 'member' && item.member_price ? item.member_price : item.price,
        total_price: (user?.role === 'member' && item.member_price ? item.member_price : item.price) * item.quantity
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) {
        throw itemsError;
      }
      
      // If we have a promo code, increment its uses
      if (promoCodeId) {
        await incrementPromoCodeUses(promoCodeId);
      }
      
      // Update stock counts for all products in the order
      for (const item of cartItems) {
        await supabase
          .from('products')
          .update({ stock_count: item.stock_count - item.quantity })
          .eq('id', item.id);
      }
      
      // Show success state and clear cart
      setOrderId(order.id);
      setIsOrderComplete(true);
      clearCart();
      
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If cart is empty and not after order completion, redirect to shop
  if (cartItems.length === 0 && !isOrderComplete) {
    return (
      <div className="bg-gym-light min-h-screen pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="mb-6 text-gray-600">Add some products to your cart before proceeding to checkout.</p>
            <Button 
              onClick={() => navigate('/shop')}
              className="bg-gym-orange hover:bg-gym-orange/90"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // If order is complete, show success message
  if (isOrderComplete) {
    return (
      <div className="bg-gym-light min-h-screen pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <div className="flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Order Placed!</h1>
            <p className="mb-2 text-gray-600">
              Thank you for your order. We've received your purchase request.
            </p>
            <p className="mb-6 text-gray-600">
              Your order ID is: <span className="font-semibold">{orderId}</span>
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button 
                onClick={() => navigate('/shop')}
                className="bg-gym-orange hover:bg-gym-orange/90"
              >
                Continue Shopping
              </Button>
              
              {isAuthenticated && (
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/dashboard/orders')}
                >
                  View My Orders
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/shop')}
            className="text-gray-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              
              {!isAuthenticated && (
                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600 mb-2">
                    Already have an account?{' '}
                    <Link to="/auth" className="text-gym-orange hover:underline">
                      Log in
                    </Link>{' '}
                    for a faster checkout.
                  </p>
                </div>
              )}
              
              <form onSubmit={handleSubmitOrder}>
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  <div>
                    <Label htmlFor="payment_method">Select Payment Method</Label>
                    <select
                      id="payment_method"
                      name="payment_method"
                      value={formData.payment_method}
                      onChange={handlePaymentMethodChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gym-orange focus:border-transparent"
                      required
                    >
                      <option value="cash">Cash on Delivery</option>
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="mobile_money">Mobile Money</option>
                      <option value="card">Credit Card</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    className="bg-gym-orange hover:bg-gym-orange/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 max-h-80 overflow-y-auto mb-6">
                {cartItems.map((item) => {
                  const price = user?.role === 'member' && item.member_price 
                    ? item.member_price 
                    : item.price;
                  
                  return (
                    <div key={item.id} className="flex items-center py-2">
                      <div className="h-12 w-12 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                        {item.image_url ? (
                          <img 
                            src={item.image_url} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48?text=No+Image';
                            }}
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <ShoppingBag className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">
                            {item.name} <span className="text-gray-500">x{item.quantity}</span>
                          </h3>
                          <p className="text-sm font-medium">{formatPrice(price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <Separator className="my-4" />
              
              {/* Promo code input */}
              {!promoCode.applied && (
                <div className="mb-4">
                  <Label htmlFor="promo_code">Promo Code</Label>
                  <div className="flex mt-1">
                    <Input
                      id="promo_code"
                      name="promo_code"
                      value={formData.promo_code}
                      onChange={handleInputChange}
                      className="rounded-r-none"
                      placeholder="Enter code"
                    />
                    <Button 
                      onClick={applyPromoCode}
                      className="rounded-l-none bg-gym-orange hover:bg-gym-orange/90"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Applied promo code */}
              {promoCode.applied && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">
                      {promoCode.code}{' '}
                      <span className="text-green-600 font-normal">
                        ({promoCode.type === 'percentage' ? `${promoCode.discount / cartTotal * 100}%` : formatPrice(promoCode.discount)} off)
                      </span>
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setPromoCode({
                        code: '',
                        discount: 0,
                        type: '',
                        applied: false
                      });
                      setFormData({
                        ...formData,
                        promo_code: ''
                      });
                    }}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}
              
              {/* Order totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                
                {promoCode.applied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-{formatPrice(promoCode.discount)}</span>
                  </div>
                )}
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal - promoCode.discount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
