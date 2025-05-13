
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StaffAvailability } from '@/hooks/trainers/types';

const availabilitySchema = z.object({
  staff_id: z.string(),
  day_of_week: z.string().min(1, "Day of week is required"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
});

type AvailabilityFormValues = z.infer<typeof availabilitySchema>;

interface StaffAvailabilityFormProps {
  staffId: string;
  onSubmit: (data: Omit<StaffAvailability, 'id'>) => Promise<void>;
}

const StaffAvailabilityForm: React.FC<StaffAvailabilityFormProps> = ({ 
  staffId, 
  onSubmit 
}) => {
  const form = useForm<AvailabilityFormValues>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: {
      staff_id: staffId,
      day_of_week: '',
      start_time: '',
      end_time: '',
    },
  });

  const handleFormSubmit = async (data: AvailabilityFormValues) => {
    // Ensure staff_id is set explicitly to satisfy the required property constraint
    await onSubmit({
      staff_id: staffId,
      day_of_week: data.day_of_week,
      start_time: data.start_time,
      end_time: data.end_time,
    });
    form.reset();
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="day_of_week"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Day of Week*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {daysOfWeek.map(day => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time*</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time*</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <Button type="submit">Add Availability</Button>
        </div>
      </form>
    </Form>
  );
};

export default StaffAvailabilityForm;
