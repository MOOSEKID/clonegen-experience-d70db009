
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import GenerateWorkoutForm from '@/components/workouts/GenerateWorkoutForm';

interface WorkoutGenerateFormProps {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
}

const WorkoutGenerateForm: React.FC<WorkoutGenerateFormProps> = ({ onSubmit, onCancel }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Custom Workout</CardTitle>
        <CardDescription>Provide your preferences to create a personalized workout plan</CardDescription>
      </CardHeader>
      <CardContent>
        <GenerateWorkoutForm onSubmit={onSubmit} onCancel={onCancel} />
      </CardContent>
    </Card>
  );
};

export default WorkoutGenerateForm;
