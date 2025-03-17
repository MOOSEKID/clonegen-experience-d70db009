
export interface TrainerRating {
  id: string;
  trainer_id: string;
  member_id: string;
  member_name?: string;
  rating: number;
  review: string | null;
  trainer_response: string | null;
  is_flagged: boolean;
  created_at: string;
  updated_at: string;
}

export interface RatingSummary {
  averageRating: number;
  totalRatings: number;
  ratingDistribution: { [key: number]: number };
}

export interface RatingServiceResult {
  success: boolean;
  data?: TrainerRating | null;
  error?: Error | null;
  message?: string;
}
