
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag } from 'lucide-react';
import { getProductsByCategory, categories } from '@/data/shopData';
import ProductGrid from '@/components/shop/ProductGrid';
import { Product } from '@/hooks/useProducts';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<any>(null);

  useEffect(() => {
    if (categoryId) {
      // Get category details
      const categoryDetails = categories.find(cat => cat.id === categoryId);
      setCategory(categoryDetails);
      
      // Get products for this category
      const categoryProducts = getProductsByCategory(categoryId);
      setProducts(categoryProducts);
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

  if (!category) {
    return (
      <div className="bg-gym-light min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
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
        {products.length > 0 ? (
          <ProductGrid products={products} addToCart={addToCart} />
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found in this category.</p>
            <Link to="/shop" className="text-gym-orange font-medium mt-2 inline-block">
              Back to Shop
            </Link>
          </div>
        )}

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
