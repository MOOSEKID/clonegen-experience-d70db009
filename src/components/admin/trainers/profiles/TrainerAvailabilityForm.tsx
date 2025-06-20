
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { StaffAvailability } from "@/hooks/trainers/types";
import { weekDays } from "@/utils/classFormUtils";

const availabilityFormSchema = z.object({
  day_of_week: z.string().min(1, { message: "Please select a day." }),
  startTime: z.string().min(1, { message: "Start time is required." }),
  endTime: z.string().min(1, { message: "End time is required." }),
}).refine(data => data.endTime > data.startTime, {
  message: "End time must be after start time.",
  path: ["endTime"],
});

type AvailabilityFormValues = z.infer<typeof availabilityFormSchema>;

interface TrainerAvailabilityFormProps {
  trainerId: string;
  onSubmit: (data: Omit<StaffAvailability, 'id'>) => Promise<void>;
  onCancel: () => void;
}

const TrainerAvailabilityForm = ({ trainerId, onSubmit, onCancel }: TrainerAvailabilityFormProps) => {
  const form = useForm<AvailabilityFormValues>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      day_of_week: "",
      startTime: "",
      endTime: "",
    },
  });

  const handleSubmit = async (data: AvailabilityFormValues) => {
    const availabilityData: Omit<StaffAvailability, 'id'> = {
      staff_id: trainerId,
      day_of_week: data.day_of_week,
      startTime: data.startTime,
      endTime: data.endTime
    };
    await onSubmit(availabilityData);
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
            name="startTime"
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
            name="endTime"
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
