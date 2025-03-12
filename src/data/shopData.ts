
import { Product } from '@/components/shop/ProductCard';

// Product categories and their products
export const categories = [
  {
    id: 'supplements',
    name: 'Supplements',
    icon: 'Utensils',
    description: 'Protein, pre-workout, and other nutritional supplements',
    productCount: 3,
  },
  {
    id: 'equipment',
    name: 'Equipment',
    icon: 'Dumbbell',
    description: 'Fitness equipment for home and gym use',
    productCount: 3,
  },
  {
    id: 'apparel',
    name: 'Apparel',
    icon: 'Shirt',
    description: 'Workout clothes and gym wear',
    productCount: 3,
  }
];

export const products: Product[] = [
  // Supplements
  {
    id: 'whey-protein',
    name: 'Premium Whey Protein',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1000',
    description: 'High-quality whey protein with 24g protein per serving. Perfect for muscle recovery and growth.',
    category: 'supplements'
  },
  {
    id: 'pre-workout',
    name: 'Energy Pre-Workout Formula',
    price: 29500,
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000',
    description: 'Powerful energy-boosting formula with caffeine and BCAAs for maximum workout performance.',
    category: 'supplements'
  },
  {
    id: 'creatine',
    name: 'Pure Creatine Monohydrate',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1579722861914-cca0163e3e24?q=80&w=1000',
    description: '500g of pure creatine to enhance strength, power, and muscle recovery during high-intensity workouts.',
    category: 'supplements'
  },
  
  // Equipment
  {
    id: 'kettlebell-set',
    name: 'Kettlebell Set',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?q=80&w=1000',
    description: 'Set of 3 kettlebells (8kg, 12kg, 16kg) for versatile strength and conditioning workouts.',
    category: 'equipment'
  },
  {
    id: 'resistance-bands',
    name: 'Resistance Bands Pack',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1598447842532-57cbfc54cbf3?q=80&w=1000',
    description: '5 bands of varying resistance levels with handles, perfect for home workouts or mobility training.',
    category: 'equipment'
  },
  {
    id: 'yoga-mat',
    name: 'Premium Yoga Mat',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1599447292180-45fd84092ef4?q=80&w=1000',
    description: 'Non-slip, eco-friendly yoga mat with carrying strap. Extra thick for comfort during all practices.',
    category: 'equipment'
  },
  
  // Apparel
  {
    id: 'mens-tank',
    name: 'Men\'s Performance Tank',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1617952385804-7253a58464d3?q=80&w=1000',
    description: 'Breathable, quick-dry fabric for intense workouts. Available in multiple colors and sizes.',
    category: 'apparel'
  },
  {
    id: 'women-leggings',
    name: 'Women\'s Compression Leggings',
    price: 24000,
    image: 'https://images.unsplash.com/photo-1506629082955-511a1e0c3b45?q=80&w=1000',
    description: 'High-waist, squat-proof leggings with side pockets. Perfect for gym, yoga, or everyday wear.',
    category: 'apparel'
  },
  {
    id: 'workout-shorts',
    name: 'Training Shorts',
    price: 16500,
    image: 'https://images.unsplash.com/photo-1562157554-060abef58f88?q=80&w=1000',
    description: 'Lightweight, stretchy shorts for maximum mobility during workouts. Built-in liner and pockets.',
    category: 'apparel'
  }
];

// Get products by category
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

// Get a single product by ID
export const getProductById = (productId: string): Product | undefined => {
  return products.find(product => product.id === productId);
};
