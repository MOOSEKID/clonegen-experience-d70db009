
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "./StarRating";
import { TrainerRating } from "@/hooks/trainers/useTrainerRatings";

interface AddRatingFormProps {
  trainerId: string;
  memberId: string;
  onSubmit: (data: {
    trainer_id: string;
    clientId: string;
    rating: number;
    review?: string | null;
  }) => Promise<void>;
  onCancel?: () => void;
}

const AddRatingForm = ({ 
  trainerId, 
  memberId, 
  onSubmit, 
  onCancel 
}: AddRatingFormProps) => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit({
        trainer_id: trainerId,
        clientId: memberId,
        rating,
        review: review.trim() === '' ? null : review
      });
      
      // Reset form after successful submission
      setRating(0);
      setReview('');
      
      // Close form if cancel handler is provided
      if (onCancel) {
        onCancel();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Add Your Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">Your Rating:</span>
            <StarRating 
              rating={rating} 
              maxRating={5} 
              size={24} 
              onRatingChange={setRating} 
            />
          </div>
          {rating === 0 && (
            <p className="text-red-500 text-xs">Please select a rating</p>
          )}
        </div>
        
        <div>
          <Textarea
            placeholder="Share your experience with this trainer (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="h-[100px]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          onClick={handleSubmit}
          disabled={rating === 0 || isSubmitting}
        >
          Submit Review
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddRatingForm;
