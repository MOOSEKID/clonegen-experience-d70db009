
import { Product } from '@/hooks/useProducts';

// This file is kept for reference but all product data is now stored in the database
// All functions in this file are deprecated and should not be used in production code

// Product categories 
export const categories = [
  {
    id: 'supplements',
    name: 'Supplements',
    icon: 'Utensils',
    description: 'Protein, pre-workout, and other nutritional supplements',
    productCount: 0,
  },
  {
    id: 'equipment',
    name: 'Equipment',
    icon: 'Dumbbell',
    description: 'Fitness equipment for home and gym use',
    productCount: 0,
  },
  {
    id: 'apparel',
    name: 'Apparel',
    icon: 'Shirt',
    description: 'Workout clothes and gym wear',
    productCount: 0,
  }
];

// DEPRECATED: This array is kept for reference only
// These products now exist in the database
export const products: Product[] = [];

// DEPRECATED: Use database queries instead
export const getProductsByCategory = (categoryId: string): Product[] => {
  console.warn('getProductsByCategory is deprecated. Use Supabase queries instead');
  return [];
};

// DEPRECATED: Use database queries instead
export const getProductById = (productId: string): Product | undefined => {
  console.warn('getProductById is deprecated. Use Supabase queries instead');
  return undefined;
};
