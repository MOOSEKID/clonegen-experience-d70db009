
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TrainerAvailability } from "@/hooks/trainers/useTrainerProfiles";
import { weekDays } from "@/utils/classFormUtils";

const availabilityFormSchema = z.object({
  day_of_week: z.string().min(1, { message: "Please select a day." }),
  start_time: z.string().min(1, { message: "Start time is required." }),
  end_time: z.string().min(1, { message: "End time is required." }),
}).refine(data => data.end_time > data.start_time, {
  message: "End time must be after start time.",
  path: ["end_time"],
});

type AvailabilityFormValues = z.infer<typeof availabilityFormSchema>;

interface TrainerAvailabilityFormProps {
  trainerId: string;
  onSubmit: (data: Omit<TrainerAvailability, 'id'>) => Promise<void>;
  onCancel: () => void;
}

const TrainerAvailabilityForm = ({ trainerId, onSubmit, onCancel }: TrainerAvailabilityFormProps) => {
  const form = useForm<AvailabilityFormValues>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      day_of_week: "",
      start_time: "",
      end_time: "",
    },
  });

  const handleSubmit = async (data: AvailabilityFormValues) => {
    await onSubmit({
      trainer_id: trainerId,
      ...data,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="day_of_week"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Day*</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {weekDays.map(day => (
                    <SelectItem key={day.value} value={day.value}>{day.label}</SelectItem>
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
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Availability</Button>
        </div>
      </form>
    </Form>
  );
};

export default TrainerAvailabilityForm;
