
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState } from "react";
import { TrainerProfile } from "@/hooks/trainers/useTrainerProfiles";

const trainerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  bio: z.string().optional(),
  status: z.string(),
  specialization: z.array(z.string()).optional(),
  hiredate: z.string().optional(),
  profilepicture: z.string().optional(),
});

type TrainerFormValues = z.infer<typeof trainerFormSchema>;

interface TrainerAddFormProps {
  onSubmit: (data: Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>) => Promise<void>;
  onCancel: () => void;
}

const TrainerAddForm = ({ onSubmit, onCancel }: TrainerAddFormProps) => {
  const [newSpecialization, setNewSpecialization] = useState("");
  
  const form = useForm<TrainerFormValues>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      status: "Active",
      specialization: [],
      hiredate: new Date().toISOString().split('T')[0],
      profilepicture: "",
    },
  });

  const handleSubmit = async (data: TrainerFormValues) => {
    await onSubmit(data);
    form.reset();
  };

  const addSpecialization = () => {
    if (newSpecialization.trim() === "") return;
    
    const currentSpecs = form.getValues("specialization") || [];
    if (!currentSpecs.includes(newSpecialization)) {
      form.setValue("specialization", [...currentSpecs, newSpecialization]);
      setNewSpecialization("");
    }
  };

  const removeSpecialization = (spec: string) => {
    const currentSpecs = form.getValues("specialization") || [];
    form.setValue(
      "specialization",
      currentSpecs.filter((s) => s !== spec)
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hiredate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hire Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profilepicture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture URL</FormLabel>
                <FormControl>
                  <Input placeholder="http://example.com/image.jpg" {...field} />
                </FormControl>
                <FormDescription>Enter a URL for the trainer's profile picture</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Specializations</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {field.value?.map((spec, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {spec}
                    <button
                      type="button"
                      onClick={() => removeSpecialization(spec)}
                      className="rounded-full h-4 w-4 flex items-center justify-center bg-gray-200 hover:bg-gray-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  placeholder="Add specialization (e.g., Yoga, Strength Training)"
                  className="flex-grow"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSpecialization();
                    }
                  }}
                />
                <Button type="button" onClick={addSpecialization} variant="outline">
                  Add
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Trainer biography and background information..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Trainer</Button>
        </div>
      </form>
    </Form>
  );
};

export default TrainerAddForm;
