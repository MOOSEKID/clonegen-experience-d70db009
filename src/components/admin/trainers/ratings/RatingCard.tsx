
import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { TrainerRating } from "@/hooks/trainers/useTrainerRatings";
import { Badge } from "@/components/ui/badge";
import { Flag, MessageSquare, Trash2 } from "lucide-react";
import { StarRating } from "./StarRating";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface RatingCardProps {
  rating: TrainerRating;
  isAdmin?: boolean;
  isTrainer?: boolean;
  onRespond: (ratingId: string, response: string) => Promise<void>;
  onFlag: (ratingId: string, flagged: boolean) => Promise<void>;
  onDelete: (ratingId: string) => Promise<void>;
}

const RatingCard = ({
  rating,
  isAdmin = false,
  isTrainer = false,
  onRespond,
  onFlag,
  onDelete
}: RatingCardProps) => {
  const [isResponding, setIsResponding] = useState(false);
  const [response, setResponse] = useState(rating.trainer_response || "");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleRespond = async () => {
    if (response.trim()) {
      await onRespond(rating.id, response);
      setIsResponding(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <Card className={`${rating.is_flagged ? 'border-red-300 bg-red-50' : ''}`}>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarFallback className="bg-gray-200">
                {getInitials(rating.member_name || 'UN')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{rating.member_name || 'Anonymous Member'}</div>
                  <div className="text-xs text-gray-500">
                    {format(new Date(rating.created_at), 'MMM d, yyyy')}
                  </div>
                </div>
                <StarRating rating={rating.rating} />
              </div>
              
              {rating.review && (
                <div className="mt-2 text-gray-700">{rating.review}</div>
              )}
              
              {rating.is_flagged && (
                <Badge variant="destructive" className="mt-2">Flagged for review</Badge>
              )}
              
              {rating.trainer_response && (
                <div className="mt-4 bg-gray-100 p-3 rounded-md">
                  <div className="text-xs font-medium text-gray-500 mb-1">Trainer Response:</div>
                  <div className="text-sm">{rating.trainer_response}</div>
                </div>
              )}
              
              {isResponding && (
                <div className="mt-4">
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Write your response..."
                    className="mb-2"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsResponding(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleRespond}>
                      Submit Response
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end gap-2 pt-0">
          {(isTrainer && !rating.trainer_response && !isResponding) && (
            <Button variant="outline" size="sm" onClick={() => setIsResponding(true)}>
              <MessageSquare className="h-4 w-4 mr-1" />
              Respond
            </Button>
          )}
          
          {isAdmin && (
            <>
              <Button 
                variant={rating.is_flagged ? "default" : "outline"} 
                size="sm" 
                onClick={() => onFlag(rating.id, !rating.is_flagged)}
              >
                <Flag className="h-4 w-4 mr-1" />
                {rating.is_flagged ? 'Unflag' : 'Flag'}
              </Button>
              
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this review. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                await onDelete(rating.id);
                setIsDeleteDialogOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RatingCard;
