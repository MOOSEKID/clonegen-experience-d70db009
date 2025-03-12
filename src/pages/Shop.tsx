
import React from 'react';
import { Dumbbell, ShoppingBag, Shirt, Utensils } from 'lucide-react';

const ShopPage = () => {
  // Product categories with their respective products
  const productCategories = [
    {
      id: 'supplements',
      name: 'Supplements',
      icon: <Utensils className="h-6 w-6 text-gym-orange" />,
      products: [
        {
          id: 'protein-whey',
          name: 'Premium Whey Protein',
          price: 35000,
          image: '/placeholder.svg',
          description: 'High-quality whey protein with 24g protein per serving'
        },
        {
          id: 'pre-workout',
          name: 'Pre-Workout Formula',
          price: 29500,
          image: '/placeholder.svg',
          description: 'Energy-boosting formula with caffeine and BCAAs'
        },
        {
          id: 'creatine',
          name: 'Pure Creatine Monohydrate',
          price: 22000,
          image: '/placeholder.svg',
          description: '500g of pure creatine to enhance strength and recovery'
        }
      ]
    },
    {
      id: 'equipment',
      name: 'Equipment',
      icon: <Dumbbell className="h-6 w-6 text-gym-orange" />,
      products: [
        {
          id: 'kettlebell',
          name: 'Kettlebell Set',
          price: 85000,
          image: '/placeholder.svg',
          description: 'Set of 3 kettlebells (8kg, 12kg, 16kg)'
        },
        {
          id: 'resistance-bands',
          name: 'Resistance Bands Pack',
          price: 25000,
          image: '/placeholder.svg',
          description: '5 bands of varying resistance levels with handles'
        },
        {
          id: 'yoga-mat',
          name: 'Premium Yoga Mat',
          price: 30000,
          image: '/placeholder.svg',
          description: 'Non-slip, eco-friendly yoga mat with carrying strap'
        }
      ]
    },
    {
      id: 'apparel',
      name: 'Apparel',
      icon: <Shirt className="h-6 w-6 text-gym-orange" />,
      products: [
        {
          id: 'mens-tank',
          name: 'Men\'s Performance Tank',
          price: 18000,
          image: '/placeholder.svg',
          description: 'Breathable, quick-dry fabric for intense workouts'
        },
        {
          id: 'women-leggings',
          name: 'Women\'s Compression Leggings',
          price: 24000,
          image: '/placeholder.svg',
          description: 'High-waist, squat-proof leggings with pocket'
        },
        {
          id: 'workout-shorts',
          name: 'Training Shorts',
          price: 16500,
          image: '/placeholder.svg',
          description: 'Lightweight, stretchy shorts for maximum mobility'
        }
      ]
    }
  ];

  // Format price in Rwanda francs
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} RWF`;
  };

  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gym-dark mb-4">Fitness Shop</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover premium fitness supplements, equipment, and apparel to elevate your training experience.
          </p>
        </div>

        {productCategories.map((category) => (
          <div key={category.id} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              {category.icon}
              <h2 className="text-2xl md:text-3xl font-bold text-gym-dark">{category.name}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-32 w-32 object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gym-dark mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 h-12 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gym-orange">{formatPrice(product.price)}</span>
                      <button className="bg-gym-orange hover:bg-gym-orange/90 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
                        <ShoppingBag size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
