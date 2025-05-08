
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const FormSchema = z.object({
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  goal: z.string().min(1, "Goal is required"),
  experience: z.string().min(1, "Experience level is required"),
  timeAvailable: z.number().min(10).max(120),
  daysPerWeek: z.number().min(1).max(7),
  equipment: z.string().min(1, "Equipment availability is required"),
  injuries: z.string().optional(),
});

interface GenerateWorkoutFormProps {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  onCancel: () => void;
}

const GenerateWorkoutForm = ({ onSubmit, onCancel }: GenerateWorkoutFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      age: "",
      gender: "",
      goal: "",
      experience: "beginner",
      timeAvailable: 45,
      daysPerWeek: 3,
      equipment: "gym",
      injuries: "",
    },
  });

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter your age" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Goal</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary goal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="lose-weight">Lose Weight</SelectItem>
                  <SelectItem value="build-muscle">Build Muscle</SelectItem>
                  <SelectItem value="increase-strength">Increase Strength</SelectItem>
                  <SelectItem value="improve-endurance">Improve Endurance</SelectItem>
                  <SelectItem value="general-fitness">General Fitness</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Experience Level</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="beginner" />
                    </FormControl>
                    <FormLabel className="font-normal">Beginner - New to working out</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="intermediate" />
                    </FormControl>
                    <FormLabel className="font-normal">Intermediate - Some experience</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="advanced" />
                    </FormControl>
                    <FormLabel className="font-normal">Advanced - Regular workout routine</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeAvailable"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Time Available Per Session (Minutes): {value}</FormLabel>
              <FormControl>
                <Slider
                  min={10}
                  max={120}
                  step={5}
                  defaultValue={[value]}
                  onValueChange={(vals) => onChange(vals[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="daysPerWeek"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Days Per Week: {value}</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={7}
                  step={1}
                  defaultValue={[value]}
                  onValueChange={(vals) => onChange(vals[0])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="equipment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipment Access</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select equipment access" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="gym">Full Gym Access</SelectItem>
                  <SelectItem value="limited">Limited Equipment</SelectItem>
                  <SelectItem value="home">Home Equipment</SelectItem>
                  <SelectItem value="none">No Equipment</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="injuries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Injuries or Limitations (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe any injuries or limitations"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Generate Workout</Button>
        </div>
      </form>
    </Form>
  );
};

export default GenerateWorkoutForm;
