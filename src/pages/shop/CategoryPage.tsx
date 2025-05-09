
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag, AlertCircle } from 'lucide-react';
import { getProductsByCategory, categories } from '@/data/shopData';
import ProductGrid from '@/components/shop/ProductGrid';
import { Product } from '@/hooks/useProducts';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (categoryId) {
        setLoading(true);
        // Get category details
        const categoryDetails = categories.find(cat => cat.id === categoryId);
        
        if (!categoryDetails) {
          setError('Category not found');
          setLoading(false);
          return;
        }
        
        setCategory(categoryDetails);
        
        // Get products for this category
        const categoryProducts = getProductsByCategory(categoryId);
        setProducts(categoryProducts || []);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error loading category data:', err);
      setError('Failed to load category data');
      setLoading(false);
    }
  }, [categoryId]);

  // Function to add products to cart (placeholder)
  const addToCart = (product: Product) => {
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

  if (loading) {
    return (
      <div className="bg-gym-light min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="bg-gym-light min-h-screen pt-24 pb-16">
        <div className="container-custom">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{error || 'Category Not Found'}</h2>
            <p className="text-gray-600 mb-6">
              The category you're looking for doesn't exist or couldn't be loaded.
            </p>
            <Link 
              to="/shop"
              className="inline-flex items-center bg-gym-orange hover:bg-gym-orange/90 text-white px-6 py-3 rounded-md transition-colors"
            >
              <ShoppingBag className="mr-2" size={18} />
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <Link to="/shop" className="hover:text-gym-orange">Shop</Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-gym-orange">{category.name}</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gym-dark mb-4">{category.name}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} addToCart={addToCart} />

        {/* Back to Shop Button */}
        <div className="mt-12 text-center">
          <Link 
            to="/shop"
            className="inline-flex items-center bg-gym-orange hover:bg-gym-orange/90 text-white px-6 py-3 rounded-md transition-colors"
          >
            <ShoppingBag className="mr-2" size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
