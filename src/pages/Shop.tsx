
import React, { useState, useEffect } from 'react';
import { Dumbbell, ShoppingBag, Shirt, Utensils, Filter, Search } from 'lucide-react';
import CategoryCard from '@/components/shop/CategoryCard';
import ProductGrid from '@/components/shop/ProductGrid';
import { Button } from '@/components/ui/button';
import { Product } from '@/hooks/useProducts';
import { supabase } from '@/integrations/supabase/client';
import { categories } from '@/utils/categoryUtils';

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryCount, setCategoryCount] = useState<Record<string, number>>({});
  
  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .eq('is_public', true);
          
        if (error) {
          console.error('Error fetching products:', error);
          return;
        }
        
        if (data) {
          setProducts(data as Product[]);
          // Count products by category
          const counts: Record<string, number> = {};
          data.forEach(product => {
            counts[product.category] = (counts[product.category] || 0) + 1;
          });
          setCategoryCount(counts);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Function to add products to cart
  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    
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

  // Get the icon component by name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-gym-orange" />;
      case 'Dumbbell':
        return <Dumbbell className="w-6 h-6 text-gym-orange" />;
      case 'Shirt':
        return <Shirt className="w-6 h-6 text-gym-orange" />;
      default:
        return <ShoppingBag className="w-6 h-6 text-gym-orange" />;
    }
  };

  // Filter products by search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

  // Update category product counts
  useEffect(() => {
    categories.forEach(category => {      
      // Set the count from the database or 0 if none found
      category.productCount = categoryCount[category.dbName] || 0;
    });
  }, [categoryCount]);

  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gym-dark mb-4">Fitness Shop</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover premium fitness supplements, equipment, and apparel to elevate your training experience.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-10">
          <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gym-orange focus:border-transparent"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={18} /> Filters
            </Button>
            <Button variant="default" className="bg-gym-orange hover:bg-gym-orange/90 flex items-center gap-2">
              <ShoppingBag size={18} /> 
              Cart ({cartItems.length})
            </Button>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gym-dark">Shop by Category</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id}
                id={category.id}
                name={category.name}
                icon={getIconComponent(category.id === 'supplements' ? 'Utensils' : category.id === 'equipment' ? 'Dumbbell' : 'Shirt')}
                description={category.description}
                productCount={category.productCount}
              />
            ))}
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between gap-3 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gym-dark">
              {searchTerm ? 'Search Results' : 'Featured Products'}
            </h2>
          </div>
          
          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} addToCart={addToCart} />
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No products found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
