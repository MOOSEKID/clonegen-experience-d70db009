
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StaffFunctionCardProps {
  title: string;
  subtitle: string;
  link: string;
  icon: React.ReactNode;
  implemented?: boolean;
}

const StaffFunctionCard = ({ 
  title, 
  subtitle, 
  link, 
  icon,
  implemented = false 
}: StaffFunctionCardProps) => {
  return (
    <Link
      to={implemented ? link : "#"}
      className={cn(
        "block p-6 rounded-lg shadow-sm hover:shadow-md transition-all",
        "border border-gray-200 bg-white",
        implemented ? "hover:border-blue-200" : "cursor-default opacity-80"
      )}
    >
      <div className="flex items-start space-x-4">
        <div className="p-2 rounded-full bg-blue-50 text-blue-700">
          {icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-800">{title}</h3>
            {!implemented && (
              <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                Coming Soon
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
};

export default StaffFunctionCard;
