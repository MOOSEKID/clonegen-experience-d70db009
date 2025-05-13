
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from '@/components/ui/form';
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
    await onSubmit(data);
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
        <Form.Field
          control={form.control}
          name="day_of_week"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Day of Week*</Form.Label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <Form.Control>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                </Form.Control>
                <SelectContent>
                  {daysOfWeek.map(day => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Form.Message />
            </Form.Item>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Form.Field
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Start Time*</Form.Label>
                <Form.Control>
                  <Input type="time" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>End Time*</Form.Label>
                <Form.Control>
                  <Input type="time" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
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
