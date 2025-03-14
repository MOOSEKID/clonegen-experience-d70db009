
import React, { useState } from "react";
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
import FileUpload from "@/components/admin/trainers/common/FileUpload";
import { useTrainerFileUpload } from "@/hooks/trainers/useTrainerFileUpload";
import { TrainerProfile } from "@/hooks/trainers/useTrainerProfiles";

const trainerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  bio: z.string().optional(),
  status: z.string(),
  specialization: z.array(z.string()).optional(),
  hire_date: z.string().optional(),
  experience_years: z.number().optional(),
  experience_level: z.string().optional(),
});

type TrainerFormValues = z.infer<typeof trainerFormSchema>;

interface TrainerAddFormProps {
  onSubmit: (data: Omit<TrainerProfile, "id" | "certifications" | "availability">) => Promise<void>;
  onCancel: () => void;
}

// Array of common trainer specializations
const commonSpecializations = [
  "Strength Training",
  "Weight Loss",
  "Cardio",
  "HIIT",
  "Yoga",
  "Pilates",
  "CrossFit",
  "Bodybuilding",
  "Nutrition",
  "Sports Performance",
  "Functional Training",
  "Kettlebell",
  "Senior Fitness",
  "Pre/Post Natal",
  "Rehabilitation",
  "Boxing",
  "Martial Arts",
  "Dance Fitness",
  "Group Training",
  "Flexibility"
];

const TrainerAddForm = ({ onSubmit, onCancel }: TrainerAddFormProps) => {
  const [newSpecialization, setNewSpecialization] = useState("");
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  
  const { uploadFile, isUploading, uploadProgress } = useTrainerFileUpload();
  
  const form = useForm<TrainerFormValues>({
    resolver: zodResolver(trainerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bio: "",
      status: "Active",
      specialization: [],
      hire_date: new Date().toISOString().split('T')[0],
      experience_years: undefined,
      experience_level: "Beginner",
    },
  });

  const handleFormSubmit = async (data: TrainerFormValues) => {
    // Combine form data with uploaded profile picture
    const formData = {
      ...data,
      specialization: selectedSpecializations,
      profile_picture: profilePictureUrl,
    };
    
    await onSubmit(formData as Omit<TrainerProfile, "id" | "certifications" | "availability">);
    form.reset();
    setSelectedSpecializations([]);
    setProfilePictureUrl(null);
  };

  const addSpecialization = (spec: string) => {
    if (spec.trim() === "") return;
    
    if (!selectedSpecializations.includes(spec)) {
      setSelectedSpecializations([...selectedSpecializations, spec]);
    }
    
    setNewSpecialization("");
  };

  const removeSpecialization = (spec: string) => {
    setSelectedSpecializations(selectedSpecializations.filter(s => s !== spec));
  };

  const handleProfilePictureUpload = async (file: File) => {
    // Use a temporary ID for the upload, it will be replaced when the trainer is created
    const tempId = "temp-" + Date.now();
    const url = await uploadFile(file, tempId, 'profile_picture');
    if (url) {
      setProfilePictureUrl(url);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <div className="mb-4">
              <FormLabel>Profile Picture</FormLabel>
              <FileUpload
                type="profile_picture"
                onFileSelected={handleProfilePictureUpload}
                isUploading={isUploading}
                progress={uploadProgress}
                buttonText="Upload Profile Picture"
                previewUrl={profilePictureUrl || undefined}
              />
            </div>
          </div>

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
            name="hire_date"
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
            name="experience_years"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0" 
                    step="1" 
                    placeholder="Years of experience" 
                    {...field}
                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormItem>
          <FormLabel>Specializations</FormLabel>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedSpecializations.map((spec, index) => (
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex gap-2">
              <Input
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                placeholder="Add custom specialization"
                className="flex-grow"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSpecialization(newSpecialization);
                  }
                }}
              />
              <Button type="button" onClick={() => addSpecialization(newSpecialization)} variant="outline">
                Add
              </Button>
            </div>
            
            <Select onValueChange={(value) => addSpecialization(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select from common specializations" />
              </SelectTrigger>
              <SelectContent>
                {commonSpecializations
                  .filter(spec => !selectedSpecializations.includes(spec))
                  .map(spec => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          
          <FormDescription>
            Add specializations from the list or create custom ones.
          </FormDescription>
        </FormItem>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Trainer biography and background information"
                  className="min-h-[100px]"
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
