
import { TrainerRating, RatingSummary } from './types';

// Generate mock data for development
export const generateMockRatings = (trainerId: string): TrainerRating[] => {
  return Array(5).fill(0).map((_, i) => ({
    id: `mock-${i}`,
    trainer_id: trainerId,
    member_id: `member-${i}`,
    member_name: `Test Member ${i + 1}`,
    rating: Math.floor(Math.random() * 5) + 1,
    review: i % 2 === 0 ? `This is a test review ${i + 1}` : null,
    trainer_response: i === 0 ? 'Thank you for your feedback!' : null,
    is_flagged: i === 3, // One flagged review
    created_at: new Date(Date.now() - i * 86400000).toISOString(),
    updated_at: new Date(Date.now() - i * 86400000).toISOString()
  }));
};

// Calculate summary for mock data
export const calculateMockSummary = (mockRatings: TrainerRating[]): RatingSummary => {
  const distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
  
  mockRatings.forEach(item => {
    if (distribution[item.rating as keyof typeof distribution] !== undefined) {
      distribution[item.rating as keyof typeof distribution]++;
    }
  });
  
  const totalRatings = mockRatings.length;
  const ratingSum = mockRatings.reduce((sum, item) => sum + item.rating, 0);
  const avgRating = ratingSum / totalRatings;
  
  return {
    averageRating: parseFloat(avgRating.toFixed(1)),
    totalRatings,
    ratingDistribution: distribution
  };
};
