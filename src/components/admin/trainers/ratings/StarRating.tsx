
import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

export const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = 16,
  onRatingChange,
  className
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  const interactive = !!onRatingChange;
  
  const handleClick = (selectedRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };
  
  return (
    <div className={`flex ${className}`}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const filled = interactive 
          ? (hoverRating > 0 ? starValue <= hoverRating : starValue <= rating)
          : starValue <= rating;
        
        return (
          <button
            key={index}
            type="button"
            className={`p-0.5 ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            disabled={!interactive}
            aria-label={`${starValue} star${starValue !== 1 ? 's' : ''}`}
          >
            <Star
              size={size}
              className={`${
                filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        );
      })}
    </div>
  );
};
