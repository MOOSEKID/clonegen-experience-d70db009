
import { Product } from '@/hooks/useProducts';
import { Category } from '@/hooks/useCategories';

export type ShopFilters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price-asc' | 'price-desc' | 'newest';
  search?: string;
  memberOnly?: boolean;
  parentCategory?: string;
};

export type ShopProductsState = {
  searchTerm: string;
  cartItems: Product[];
  products: Product[];
  isLoading: boolean;
  error: string | null;
  categories: Category[];
  categoryCount: Record<string, number>;
  filters: ShopFilters;
};

export type CategoryWithChildren = Category & {
  children?: CategoryWithChildren[];
};
