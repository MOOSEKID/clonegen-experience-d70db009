
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "./StarRating";
import { Progress } from "@/components/ui/progress";
import { TrainerRating } from "@/hooks/trainers/useTrainerRatings";
import { Skeleton } from "@/components/ui/skeleton";

interface RatingsSummaryProps {
  ratings: TrainerRating[];
  averageRating: number;
  isLoading: boolean;
}

const RatingsSummary = ({ ratings, averageRating, isLoading }: RatingsSummaryProps) => {
  const calculateRatingDistribution = () => {
    if (ratings.length === 0) {
      return Array(5).fill(0);
    }

    const distribution = [0, 0, 0, 0, 0];
    
    ratings.forEach(rating => {
      // Ratings are 1-5, array is 0-4
      distribution[rating.rating - 1]++;
    });
    
    return distribution.map(count => {
      const percentage = ratings.length > 0 
        ? (count / ratings.length) * 100 
        : 0;
      return percentage;
    }).reverse(); // Reverse to show 5-star first
  };

  const distribution = calculateRatingDistribution();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ratings Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-6 w-32 mt-2" />
            </div>
            <div className="space-y-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-8" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center mt-1">
                <StarRating rating={averageRating} size={20} />
                <span className="text-sm text-gray-500 ml-2">
                  ({ratings.length} {ratings.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mt-6">
              {distribution.map((percentage, i) => {
                // Convert index to rating (5-star to 1-star)
                const currentRating = 5 - i;
                
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-12 text-right">{currentRating} stars</div>
                    <Progress value={percentage} className="h-2 flex-1" />
                    <div className="w-8 text-xs text-gray-500">{Math.round(percentage)}%</div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RatingsSummary;
