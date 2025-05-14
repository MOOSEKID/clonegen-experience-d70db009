
import React, { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Plus, Search, Upload, X } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(3, { message: 'Program name is required' }),
  description: z.string().min(10, { message: 'Please provide a description' }),
  category: z.string().min(1, { message: 'Category is required' }),
  level: z.string().min(1, { message: 'Difficulty level is required' }),
  durationMinutes: z.string().min(1, { message: 'Duration is required' }),
  imageUrl: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const categoryOptions = [
  'Strength', 'Cardio', 'Flexibility', 'Weight Loss', 'Muscle Gain', 'Mobility'
];

const levelOptions = [
  'Beginner', 'Intermediate', 'Advanced'
];

const durationOptions = [
  '1 week', '2 weeks', '4 weeks', '6 weeks', '8 weeks', '12 weeks'
];

// Mock data for exercises
const mockExercises = [
  { id: '1', name: 'Barbell Bench Press', muscle: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate' },
  { id: '2', name: 'Pull-ups', muscle: 'Back', equipment: 'Bodyweight', difficulty: 'Advanced' },
  { id: '3', name: 'Squats', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate' },
  { id: '4', name: 'Shoulder Press', muscle: 'Shoulders', equipment: 'Dumbbells', difficulty: 'Intermediate' },
  { id: '5', name: 'Bicep Curls', muscle: 'Arms', equipment: 'Dumbbells', difficulty: 'Beginner' },
  { id: '6', name: 'Plank', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Beginner' }
];

const CreateProgram = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      level: '',
      durationMinutes: '',
      imageUrl: ''
    }
  });

  const onSubmit = (data: FormValues) => {
    data.imageUrl = imageUrl;
    
    const programData = {
      ...data,
      exercises: selectedExercises
    };
    
    console.log('Program data to submit:', programData);
    
    toast.success('Program created successfully!');
    navigate('/admin/workout-programs');
  };

  const filteredExercises = mockExercises.filter(exercise => 
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exercise.muscle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addExercise = (exercise: any) => {
    if (!selectedExercises.find(e => e.id === exercise.id)) {
      setSelectedExercises([...selectedExercises, { ...exercise, sets: 3, reps: '10-12' }]);
    }
  };

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises(selectedExercises.filter(e => e.id !== exerciseId));
  };

  const handleImageSelect = (url: string) => {
    setImageUrl(url);
    form.setValue('imageUrl', url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create Workout Program</h1>
          <p className="text-gray-500">Design a new workout program with exercises and schedules</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/admin/workout-programs')}>
            Cancel
          </Button>
          <Button type="button" onClick={form.handleSubmit(onSubmit)}>
            Save Program
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Program Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Basic Details</TabsTrigger>
              <TabsTrigger value="exercises">Exercises</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
            
            <Form {...form}>
              <form className="space-y-6">
                <TabsContent value="details" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Program Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 8-Week Strength Builder" {...field} />
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
                        <FormLabel>Program Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the program, its goals, and benefits..." 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categoryOptions.map(category => (
                                <SelectItem key={category} value={category.toLowerCase()}>
                                  {category}
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
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {levelOptions.map(level => (
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
                      name="durationMinutes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select durationMinutes" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {durationOptions.map(durationMinutes => (
                                <SelectItem key={durationMinutes} value={durationMinutes}>
                                  {durationMinutes}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col space-y-2 mt-4">
                    <FormLabel>Program Image</FormLabel>
                    
                    {imageUrl ? (
                      <div className="relative aspect-video w-full max-w-md border rounded-md overflow-hidden">
                        <img 
                          src={imageUrl} 
                          alt="Program cover" 
                          className="w-full h-full object-cover"
                        />
                        <Button 
                          type="button"
                          variant="outline" 
                          size="sm" 
                          className="absolute top-2 right-2"
                          onClick={() => setImageUrl('')}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline" className="w-full max-w-md">
                            <Upload className="mr-2 h-4 w-4" /> Select Cover Image
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Select Program Image</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-2 gap-4 py-4">
                            {[
                              'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
                              'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop',
                              'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
                              'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2074&auto=format&fit=crop'
                            ].map((image, index) => (
                              <div 
                                key={index}
                                className="border rounded-md overflow-hidden cursor-pointer hover:border-gym-orange transition-colors"
                                onClick={() => handleImageSelect(image)}
                              >
                                <img src={image} alt={`Sample ${index + 1}`} className="w-full h-32 object-cover" />
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="exercises" className="space-y-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative w-full md:w-1/2">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Search exercises..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate('/admin/workouts/add-exercise')}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add New Exercise
                    </Button>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Selected Exercises ({selectedExercises.length})</h3>
                    {selectedExercises.length > 0 ? (
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Exercise</TableHead>
                              <TableHead>Muscle Group</TableHead>
                              <TableHead>Sets</TableHead>
                              <TableHead>Reps</TableHead>
                              <TableHead className="w-[80px]"></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedExercises.map((exercise) => (
                              <TableRow key={exercise.id}>
                                <TableCell className="font-medium">{exercise.name}</TableCell>
                                <TableCell>{exercise.muscle}</TableCell>
                                <TableCell>
                                  <Input 
                                    type="number"
                                    className="w-16" 
                                    value={exercise.sets} 
                                    onChange={(e) => {
                                      const newExercises = selectedExercises.map(ex => 
                                        ex.id === exercise.id 
                                          ? { ...ex, sets: parseInt(e.target.value) || 0 } 
                                          : ex
                                      );
                                      setSelectedExercises(newExercises);
                                    }}
                                    min={1}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input 
                                    className="w-20" 
                                    value={exercise.reps} 
                                    onChange={(e) => {
                                      const newExercises = selectedExercises.map(ex => 
                                        ex.id === exercise.id 
                                          ? { ...ex, reps: e.target.value } 
                                          : ex
                                      );
                                      setSelectedExercises(newExercises);
                                    }}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => removeExercise(exercise.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center p-8 border rounded-md bg-gray-50">
                        <p className="text-gray-500">No exercises selected yet. Add exercises from the list below.</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Available Exercises</h3>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Exercise</TableHead>
                            <TableHead>Muscle Group</TableHead>
                            <TableHead>Equipment</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredExercises.map((exercise) => (
                            <TableRow key={exercise.id}>
                              <TableCell className="font-medium">{exercise.name}</TableCell>
                              <TableCell>{exercise.muscle}</TableCell>
                              <TableCell>{exercise.equipment}</TableCell>
                              <TableCell>{exercise.difficulty}</TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="h-8"
                                  onClick={() => addExercise(exercise)}
                                  disabled={selectedExercises.some(e => e.id === exercise.id)}
                                >
                                  {selectedExercises.some(e => e.id === exercise.id) ? 'Added' : 'Add'}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Weekly Schedule</h3>
                    <p className="text-sm text-gray-500">Set up the weekly workout schedule for this program.</p>
                    
                    <div className="border rounded-md p-4 bg-gray-50 text-center">
                      <p className="text-gray-500">Schedule builder will be available soon.</p>
                      <p className="text-sm text-gray-400 mt-2">You can continue to save the program with the basic details and exercises.</p>
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

export default CreateProgram;
