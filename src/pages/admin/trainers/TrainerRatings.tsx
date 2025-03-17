
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Flag, MessageSquare, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTrainersData } from '@/hooks/useTrainersData';
import { useTrainerRatings } from '@/hooks/trainers/useTrainerRatings';
import { StarRating } from '@/components/admin/trainers/ratings/StarRating';
import RatingCard from '@/components/admin/trainers/ratings/RatingCard';
import RatingsSummary from '@/components/admin/trainers/ratings/RatingsSummary';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import AddRatingForm from '@/components/admin/trainers/ratings/AddRatingForm';

const TrainerRatings = () => {
  const navigate = useNavigate();
  const { trainers, isLoading: isLoadingTrainers } = useTrainersData();
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | undefined>(undefined);
  const { ratings, summary, isLoading: isLoadingRatings, respondToRating, flagRating } = useTrainerRatings(selectedTrainerId);
  
  const [isAddRatingOpen, setIsAddRatingOpen] = useState(false);
  const [selectedRatingId, setSelectedRatingId] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  
  const selectedTrainer = trainers.find(trainer => trainer.id === selectedTrainerId);
  const selectedRating = selectedRatingId ? ratings.find(r => r.id === selectedRatingId) : null;
  
  const handleSubmitResponse = async () => {
    if (selectedRatingId && responseText.trim()) {
      await respondToRating(selectedRatingId, responseText);
      setSelectedRatingId(null);
      setResponseText('');
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Button 
            variant="ghost" 
            className="p-0 mb-2" 
            onClick={() => navigate('/admin/trainers')}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Trainers
          </Button>
          <h1 className="text-2xl font-bold">Ratings & Reviews</h1>
          <p className="text-gray-500">View and respond to client ratings and reviews for trainers</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:w-64">
          <Select
            value={selectedTrainerId}
            onValueChange={(value) => setSelectedTrainerId(value)}
            disabled={isLoadingTrainers}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a trainer" />
            </SelectTrigger>
            <SelectContent>
              {trainers.map((trainer) => (
                <SelectItem key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedTrainerId && (
          <Button onClick={() => setIsAddRatingOpen(true)} className="ml-auto">
            Add Rating
          </Button>
        )}
      </div>

      {!selectedTrainerId ? (
        <Card>
          <CardContent className="flex items-center justify-center p-12">
            <div className="text-center text-gray-500">
              <p>Please select a trainer to view their ratings and reviews.</p>
            </div>
          </CardContent>
        </Card>
      ) : isLoadingTrainers || isLoadingRatings ? (
        <div className="space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : (
        <div className="space-y-6">
          <RatingsSummary 
            trainerName={selectedTrainer?.name || 'Trainer'} 
            summary={summary} 
          />
          
          {ratings.length === 0 ? (
            <div className="bg-gray-50 text-center p-12 rounded-lg border border-dashed">
              <p className="text-gray-500">No ratings found for this trainer.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setIsAddRatingOpen(true)}
              >
                Add First Rating
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {ratings.map(rating => (
                <RatingCard 
                  key={rating.id} 
                  rating={rating}
                  onRespond={() => {
                    setSelectedRatingId(rating.id);
                    setResponseText(rating.trainer_response || '');
                  }}
                  onFlag={() => flagRating(rating.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Add Rating Dialog */}
      <Dialog open={isAddRatingOpen} onOpenChange={setIsAddRatingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rate {selectedTrainer?.name}</DialogTitle>
          </DialogHeader>
          <AddRatingForm 
            trainerId={selectedTrainerId || ''}
            memberId="current-member-id" // In a real app, this would be the logged-in member's ID
            onSubmit={async (data) => {
              try {
                await useTrainerRatings().addRating(data);
                setIsAddRatingOpen(false);
              } catch (error) {
                console.error("Error adding rating:", error);
              }
            }}
            onCancel={() => setIsAddRatingOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Response Dialog */}
      <Dialog open={selectedRatingId !== null} onOpenChange={(open) => !open && setSelectedRatingId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Respond to Review</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedRating && (
              <div className="space-y-2 p-4 bg-gray-50 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{selectedRating.member_name}</div>
                  <StarRating rating={selectedRating.rating} size={16} />
                </div>
                <p className="text-sm text-gray-700">{selectedRating.review || "(No written review)"}</p>
              </div>
            )}
            
            <Textarea
              placeholder="Write your response..."
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              className="min-h-[100px]"
            />
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedRatingId(null)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitResponse} disabled={!responseText.trim()}>
                <MessageSquare className="mr-2 h-4 w-4" /> Submit Response
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainerRatings;
