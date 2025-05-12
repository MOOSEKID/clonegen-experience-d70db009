
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Search, ShoppingBag } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { useNavigate } from 'react-router-dom';

interface ShopSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  cartItems: Product[];
  onFilterToggle?: () => void;
}

const ShopSearch = ({ searchTerm, setSearchTerm, cartItems, onFilterToggle }: ShopSearchProps) => {
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The search term will already be updated via onChange event
    // This just prevents page reload on form submit
  };
  
  const handleCartClick = () => {
    // Navigate to cart page (to be implemented later)
    toast.info("Cart page coming soon!");
  };

  return (
    <div className="mb-10">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
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
        <Button 
          type="button" 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onFilterToggle}
        >
          <Filter size={18} /> Filters
        </Button>
        <Button 
          type="button" 
          variant="default" 
          className="bg-gym-orange hover:bg-gym-orange/90 flex items-center gap-2"
          onClick={handleCartClick}
        >
          <ShoppingBag size={18} /> 
          Cart ({cartItems.length})
        </Button>
      </form>
    </div>
  );
};

export default ShopSearch;
