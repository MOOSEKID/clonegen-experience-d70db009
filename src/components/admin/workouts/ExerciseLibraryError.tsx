
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExerciseLibraryErrorProps {
  errorMessage: string;
}

const ExerciseLibraryError = ({ errorMessage }: ExerciseLibraryErrorProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Exercises</h2>
          <p className="text-gray-500 mb-6">{errorMessage}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseLibraryError;
