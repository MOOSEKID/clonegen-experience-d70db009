
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarRating } from './StarRating';
import { Flag, MessageSquare, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { TrainerRating } from '@/hooks/trainers/useTrainerRatings';

interface RatingCardProps {
  rating: TrainerRating;
  onRespond: () => void;
  onFlag: () => void;
}

const RatingCard = ({ rating, onRespond, onFlag }: RatingCardProps) => {
  const formattedDate = format(new Date(rating.created_at), 'MMM d, yyyy');
  
  return (
    <Card className={rating.is_flagged ? 'border-red-200 bg-red-50' : ''}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-3">
          <div className="space-y-1">
            <div className="font-medium">{rating.member_name}</div>
            <div className="text-sm text-gray-500">{formattedDate}</div>
          </div>
          <StarRating rating={rating.rating} size={20} />
        </div>
        
        {rating.is_flagged && (
          <div className="mb-3 text-sm bg-red-100 text-red-800 p-2 rounded-md flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            This review has been flagged as inappropriate
          </div>
        )}
        
        {rating.review && (
          <div className="my-3">
            <h4 className="text-sm font-medium mb-1">Review:</h4>
            <p className="text-gray-700">{rating.review}</p>
          </div>
        )}
        
        {rating.trainer_response && (
          <div className="mt-4 bg-gray-50 p-3 rounded-md">
            <h4 className="text-sm font-medium mb-1">Trainer Response:</h4>
            <p className="text-gray-700">{rating.trainer_response}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 py-3 justify-end gap-2">
        {!rating.is_flagged && (
          <Button variant="outline" size="sm" onClick={onFlag}>
            <Flag className="mr-2 h-4 w-4" /> Flag
          </Button>
        )}
        
        <Button 
          variant={rating.trainer_response ? "outline" : "default"} 
          size="sm" 
          onClick={onRespond}
        >
          <MessageSquare className="mr-2 h-4 w-4" /> 
          {rating.trainer_response ? "Edit Response" : "Respond"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RatingCard;
