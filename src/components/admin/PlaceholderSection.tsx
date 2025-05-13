
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export interface PlaceholderSectionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  ctaText?: string;
  onClick?: () => void;
  features?: string[];
  className?: string;
  badge?: string; // Added badge property
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({
  title,
  icon,
  description,
  ctaText,
  onClick,
  features,
  className,
  badge, // Include badge in props
}) => {
  return (
    <Card className={`${className || ''}`}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center">
          {icon}
          <h3 className="ml-2 font-semibold">{title}</h3>
        </div>
        {badge && (
          <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded">
            {badge}
          </span>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        
        {features && features.length > 0 && (
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary"></span>
                {feature}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
      {ctaText && onClick && (
        <CardFooter>
          <Button size="sm" className="w-full" onClick={onClick} variant="outline">
            {ctaText}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PlaceholderSection;
