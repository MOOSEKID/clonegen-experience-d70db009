
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  goal: z.string({
    required_error: "Please select a fitness goal",
  }),
  fitnessLevel: z.string({
    required_error: "Please select your fitness level",
  }),
  focusArea: z.string({
    required_error: "Please select a focus area",
  }),
  daysPerWeek: z.string().min(1, {
    message: "Please enter number of days per week",
  }),
  durationMinutes: z.string().min(1, {
    message: "Please enter workout durationMinutes",
  }),
  injuries: z.string().optional(),
  preferences: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface GenerateWorkoutFormProps {
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

const GenerateWorkoutForm = ({ onSubmit, onCancel }: GenerateWorkoutFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal: "",
      fitnessLevel: "",
      focusArea: "",
      daysPerWeek: "3",
      durationMinutes: "45",
      injuries: "",
      preferences: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitness Goal</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="strength">Build Strength</SelectItem>
                    <SelectItem value="muscle">Build Muscle</SelectItem>
                    <SelectItem value="weightloss">Weight Loss</SelectItem>
                    <SelectItem value="endurance">Improve Endurance</SelectItem>
                    <SelectItem value="toning">Tone & Definition</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fitnessLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitness Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your fitness level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="focusArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Focus Area</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary focus area" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="fullbody">Full Body</SelectItem>
                    <SelectItem value="upper">Upper Body</SelectItem>
                    <SelectItem value="lower">Lower Body</SelectItem>
                    <SelectItem value="core">Core</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="daysPerWeek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Days / Week</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max="7"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="durationMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minutes / Session</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="10"
                      max="120"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="injuries"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Injuries or Limitations</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe any injuries or limitations we should consider"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This helps us avoid exercises that may cause discomfort.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferences</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any specific exercises you prefer or dislike"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Optional: Tell us about your exercise preferences.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Generate Workout Plan</Button>
        </div>
      </form>
    </Form>
  );
};

export default GenerateWorkoutForm;
