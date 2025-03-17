import { StarRating } from './StarRating';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RatingSummary } from '@/hooks/trainers/ratings/types';

interface RatingsSummaryProps {
  trainerName: string;
  summary: RatingSummary;
}

const RatingsSummary = ({ trainerName, summary }: RatingsSummaryProps) => {
  const { averageRating, totalRatings, ratingDistribution } = summary;
  
  const getPercentage = (count: number) => {
    if (totalRatings === 0) return 0;
    return (count / totalRatings) * 100;
  };
  
  const formattedDistribution = Object.entries(ratingDistribution)
    .map(([rating, count]) => ({
      rating: Number(rating),
      count,
      percentage: getPercentage(count)
    }))
    .sort((a, b) => b.rating - a.rating);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{trainerName}'s Ratings Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="text-center md:text-left flex-shrink-0">
            <div className="text-4xl font-bold mb-1">
              {averageRating > 0 ? averageRating.toFixed(1) : '—'}
            </div>
            <div className="mb-2">
              <StarRating rating={averageRating} size={24} />
            </div>
            <div className="text-sm text-gray-500">
              Based on {totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}
            </div>
          </div>
          <div className="flex-grow space-y-3">
            {formattedDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="flex items-center w-14 gap-1 text-sm">
                  <span>{rating}</span>
                  <span className="text-yellow-400">★</span>
                </div>
                <Progress value={percentage} className="h-2 flex-grow" />
                <div className="text-sm text-gray-500 w-12 text-right">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingsSummary;
