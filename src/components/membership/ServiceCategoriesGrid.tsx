
import React from 'react';
import { Check } from 'lucide-react';

interface ServiceCategoryProps {
  title: string;
  icon: string;
  services: string[];
}

const ServiceCategory = ({ title, icon, services }: ServiceCategoryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{icon}</span>
        <h3 className="text-2xl font-bold text-gym-dark">{title}</h3>
      </div>
      <ul className="space-y-2">
        {services.map((service, i) => (
          <li key={i} className="flex items-start">
            <Check className="text-gym-orange mr-2 flex-shrink-0 mt-1" size={18} />
            <span className="text-gray-700">{service}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ServiceCategoriesGridProps {
  categories: {
    title: string;
    icon: string;
    services: string[];
  }[];
}

const ServiceCategoriesGrid = ({ categories }: ServiceCategoriesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {categories.map((category, index) => (
        <ServiceCategory 
          key={index} 
          title={category.title} 
          icon={category.icon} 
          services={category.services} 
        />
      ))}
    </div>
  );
};

export default ServiceCategoriesGrid;
