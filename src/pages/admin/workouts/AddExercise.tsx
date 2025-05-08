
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Info } from 'lucide-react';
import MediaUploadDialog from '@/components/admin/content/media/MediaUploadDialog';
import SelectImageDialog from '@/components/admin/content/dialogs/SelectImageDialog';

const muscleGroups = [
  'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'
];

const equipmentOptions = [
  'Barbell', 'Dumbbell', 'Kettlebell', 'Machine', 'Cable', 'Bodyweight', 'Resistance Band', 'Other'
];

const difficultyLevels = [
  'Beginner', 'Intermediate', 'Advanced'
];

const exerciseTypes = [
  'Strength', 'Mobility', 'Cardio', 'Stability', 'Power', 'Endurance'
];

// Form validation schema
const formSchema = z.object({
  name: z.string().min(3, { message: 'Exercise name is required' }),
  description: z.string().min(10, { message: 'Please provide a brief description' }),
  instructions: z.string().min(20, { message: 'Please provide detailed instructions' }),
  targetMuscle: z.string().min(1, { message: 'Target muscle is required' }),
  equipment: z.string().min(1, { message: 'Equipment is required' }),
  difficulty: z.string().min(1, { message: 'Difficulty is required' }),
  exerciseType: z.string().min(1, { message: 'Exercise type is required' }),
  thumbnailUrl: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const AddExercise = () => {
  const navigate = useNavigate();
  const [thumbnailUrl, setThumbnailUrl] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('details');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      instructions: '',
      targetMuscle: '',
      equipment: '',
      difficulty: '',
      exerciseType: '',
      thumbnailUrl: ''
    }
  });

  const onSubmit = (data: FormValues) => {
    // Add thumbnail URL to the form data
    data.thumbnailUrl = thumbnailUrl;
    
    // Submit to backend (would connect to Supabase in a real implementation)
    console.log('Exercise data to submit:', data);
    
    toast.success('Exercise added successfully!');
    navigate('/admin/exercises');
  };

  const handleImageSelect = (url: string) => {
    setThumbnailUrl(url);
    form.setValue('thumbnailUrl', url);
  };

  const handleMediaUpload = () => {
    // This would handle the actual media upload to storage
    toast.success('Media uploaded successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Exercise</h1>
          <p className="text-gray-500">Create a new exercise with detailed instructions and media</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/exercises')}>
            Cancel
          </Button>
          <Button type="button" onClick={form.handleSubmit(onSubmit)}>
            Save Exercise
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Exercise Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="details">Basic Details</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form className="space-y-6 pt-4">
                <TabsContent value="details" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exercise Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Barbell Squat" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brief Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Brief overview of the exercise..." 
                            className="min-h-[80px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="targetMuscle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Muscle Group</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select muscle group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {muscleGroups.map(group => (
                                <SelectItem key={group} value={group.toLowerCase()}>
                                  {group}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="equipment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Equipment Required</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select equipment" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {equipmentOptions.map(item => (
                                <SelectItem key={item} value={item.toLowerCase()}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select difficulty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {difficultyLevels.map(level => (
                                <SelectItem key={level} value={level.toLowerCase()}>
                                  {level}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="exerciseType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Exercise Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {exerciseTypes.map(type => (
                                <SelectItem key={type} value={type.toLowerCase()}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="instructions" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Step-by-step Instructions</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Detailed instructions on how to perform the exercise..." 
                            className="min-h-[200px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center p-4 bg-blue-50 rounded-md">
                    <Info className="h-5 w-5 text-blue-500 mr-2" />
                    <p className="text-sm text-blue-700">
                      Provide clear, step-by-step instructions. Include proper form cues and breathing instructions.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="media" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex flex-col space-y-2">
                      <h3 className="text-sm font-medium">Exercise Thumbnail</h3>
                      
                      {thumbnailUrl ? (
                        <div className="relative aspect-video w-full max-w-md border rounded-md overflow-hidden">
                          <img 
                            src={thumbnailUrl} 
                            alt="Exercise thumbnail" 
                            className="w-full h-full object-cover"
                          />
                          <Button 
                            type="button"
                            variant="outline" 
                            size="sm" 
                            className="absolute top-2 right-2"
                            onClick={() => setThumbnailUrl('')}
                          >
                            Change
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button type="button" variant="outline" className="w-full max-w-md">
                                <Upload className="mr-2 h-4 w-4" /> Select Image
                              </Button>
                            </DialogTrigger>
                            <SelectImageDialog onSelect={handleImageSelect} />
                          </Dialog>

                          <p className="text-sm text-gray-500">
                            Select an image to represent this exercise.
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <h3 className="text-sm font-medium">Exercise Video or Animation</h3>
                      <p className="text-sm text-gray-500">Upload a video demonstration of the exercise.</p>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline" className="w-full max-w-md">
                            <Upload className="mr-2 h-4 w-4" /> Upload Video
                          </Button>
                        </DialogTrigger>
                        <MediaUploadDialog mediaType="videos" handleUpload={handleMediaUpload} />
                      </Dialog>
                    </div>
                  </div>
                </TabsContent>
              </form>
            </Form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExercise;
