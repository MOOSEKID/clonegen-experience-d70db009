
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  productCount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, icon, description, productCount }) => {
  return (
    <Link to={`/shop/category/${id}`}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md border-2 hover:border-gym-orange">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gym-orange/10 rounded-full">
              {icon}
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          <div className="text-gym-orange text-sm font-semibold">
            {productCount} Products
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
