
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  onRatingChange?: (rating: number) => void;
}

export const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = 16,
  onRatingChange 
}: StarRatingProps) => {
  const interactive = !!onRatingChange;
  
  const handleClick = (selectedRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };
  
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const filled = starValue <= rating;
        
        return (
          <button
            key={index}
            type="button"
            className={`p-0.5 ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
            onClick={() => handleClick(starValue)}
            disabled={!interactive}
          >
            <Star
              size={size}
              className={`${
                filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
