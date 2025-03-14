
import { ClassType } from '@/types/classTypes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useTrainersData } from '@/hooks/useTrainersData';
import { equipmentOptions } from '@/utils/classFormUtils';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Info, Loader2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ClassFormFieldsProps {
  classData: Omit<ClassType, 'id'>;
  errors?: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCheckboxChange?: (name: string, checked: boolean) => void;
  handleMultiSelectChange?: (name: string, values: string[]) => void;
}

const ClassFormFields = ({
  classData,
  errors = {},
  handleChange,
  handleNumberChange,
  handleSelectChange,
  handleCheckboxChange = () => {},
  handleMultiSelectChange = () => {}
}: ClassFormFieldsProps) => {
  const { trainers, isLoading: loadingTrainers } = useTrainersData();
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(classData.equipmentRequired || []);

  // Update equipment selection
  const toggleEquipment = (value: string) => {
    let newSelection: string[];
    
    // If "none" is selected, clear other selections
    if (value === 'none') {
      newSelection = selectedEquipment.includes('none') ? [] : ['none'];
    } else {
      // If selecting other equipment, remove "none" option
      newSelection = selectedEquipment.filter(item => item !== 'none');
      
      // Toggle the selected value
      if (selectedEquipment.includes(value)) {
        newSelection = newSelection.filter(item => item !== value);
      } else {
        newSelection = [...newSelection, value];
      }
    }
    
    setSelectedEquipment(newSelection);
    handleMultiSelectChange('equipmentRequired', newSelection);
  };

  useEffect(() => {
    // Initialize selectedEquipment when classData changes
    if (classData.equipmentRequired) {
      setSelectedEquipment(classData.equipmentRequired);
    }
  }, [classData.equipmentRequired]);

  // Helper function to render error message
  const ErrorMessage = ({ name }: { name: string }) => (
    errors[name] ? (
      <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
        <AlertCircle className="h-4 w-4" />
        <span>{errors[name]}</span>
      </div>
    ) : null
  );

  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className={cn(errors.name && "text-red-500")}>
            Class Name*
          </Label>
          <Input 
            id="name" 
            name="name" 
            value={classData.name} 
            onChange={handleChange} 
            placeholder="Enter class name"
            className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
            required 
          />
          <ErrorMessage name="name" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type" className={cn(errors.type && "text-red-500")}>
            Class Type*
          </Label>
          <Select 
            value={classData.type} 
            onValueChange={(value) => handleSelectChange('type', value)}
          >
            <SelectTrigger className={cn(errors.type && "border-red-500")}>
              <SelectValue placeholder="Select class type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yoga">Yoga</SelectItem>
              <SelectItem value="hiit">HIIT</SelectItem>
              <SelectItem value="strength">Strength Training</SelectItem>
              <SelectItem value="cardio">Cardio</SelectItem>
              <SelectItem value="pilates">Pilates</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage name="type" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          value={classData.description || ''} 
          onChange={handleChange} 
          placeholder="Brief description of the class"
          rows={3} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="trainer" className={cn((errors.trainer || errors.trainerId) && "text-red-500")}>
            Trainer*
          </Label>
          {loadingTrainers ? (
            <div className="flex items-center space-x-2 h-10 px-3 py-2 border rounded-md">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading trainers...</span>
            </div>
          ) : (
            <Select 
              value={classData.trainerId || ''} 
              onValueChange={(value) => {
                handleSelectChange('trainerId', value);
                const selectedTrainer = trainers.find(t => t.id === value);
                if (selectedTrainer) {
                  handleSelectChange('trainer', selectedTrainer.name);
                }
              }}
            >
              <SelectTrigger className={cn((errors.trainer || errors.trainerId) && "border-red-500")}>
                <SelectValue placeholder="Select a trainer" />
              </SelectTrigger>
              <SelectContent>
                {trainers.map((trainer) => (
                  <SelectItem key={trainer.id} value={trainer.id}>
                    {trainer.name} {trainer.specialization ? `- ${trainer.specialization.join(', ')}` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {(errors.trainer || errors.trainerId) && <ErrorMessage name={errors.trainer ? 'trainer' : 'trainerId'} />}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="capacity" className={cn(errors.capacity && "text-red-500")}>
              Maximum Capacity*
            </Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Maximum number of participants allowed in this class</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input 
            id="capacity" 
            name="capacity" 
            type="number"
            min="1"
            step="1"
            value={classData.capacity} 
            onChange={handleNumberChange}
            placeholder="Enter maximum capacity"
            className={cn(errors.capacity && "border-red-500 focus-visible:ring-red-500")}
            required
          />
          <ErrorMessage name="capacity" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="classLevel" className={cn(errors.classLevel && "text-red-500")}>
            Class Level*
          </Label>
          <Select 
            value={classData.classLevel} 
            onValueChange={(value) => handleSelectChange('classLevel', value)}
          >
            <SelectTrigger className={cn(errors.classLevel && "border-red-500")}>
              <SelectValue placeholder="Select class level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage name="classLevel" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status" className={cn(errors.status && "text-red-500")}>
            Class Status*
          </Label>
          <Select 
            value={classData.status} 
            onValueChange={(value) => handleSelectChange('status', value)}
          >
            <SelectTrigger className={cn(errors.status && "border-red-500")}>
              <SelectValue placeholder="Select class status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="full">Full</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage name="status" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="day" className={cn(errors.day && "text-red-500")}>
            Day*
          </Label>
          <Select 
            value={classData.day} 
            onValueChange={(value) => handleSelectChange('day', value)}
          >
            <SelectTrigger className={cn(errors.day && "border-red-500")}>
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Monday">Monday</SelectItem>
              <SelectItem value="Tuesday">Tuesday</SelectItem>
              <SelectItem value="Wednesday">Wednesday</SelectItem>
              <SelectItem value="Thursday">Thursday</SelectItem>
              <SelectItem value="Friday">Friday</SelectItem>
              <SelectItem value="Saturday">Saturday</SelectItem>
              <SelectItem value="Sunday">Sunday</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage name="day" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time" className={cn(errors.time && "text-red-500")}>
            Start Time*
          </Label>
          <Input 
            id="time" 
            name="time" 
            type="time"
            value={classData.time} 
            onChange={handleChange}
            className={cn(errors.time && "border-red-500 focus-visible:ring-red-500")}
            required
          />
          <ErrorMessage name="time" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration" className={cn(errors.duration && "text-red-500")}>
            Duration (mins)*
          </Label>
          <Input 
            id="duration" 
            name="duration" 
            type="number"
            min="15"
            step="5"
            value={classData.duration} 
            onChange={handleNumberChange}
            className={cn(errors.duration && "border-red-500 focus-visible:ring-red-500")}
            required
          />
          <ErrorMessage name="duration" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="room" className={cn(errors.room && "text-red-500")}>
            Room*
          </Label>
          <Input 
            id="room" 
            name="room" 
            value={classData.room} 
            onChange={handleChange}
            placeholder="Enter room or location"
            className={cn(errors.room && "border-red-500 focus-visible:ring-red-500")}
            required
          />
          <ErrorMessage name="room" />
        </div>
        
        <div className="space-y-2 flex items-center">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="recurrence" 
              checked={classData.recurrence} 
              onCheckedChange={(checked) => 
                handleCheckboxChange('recurrence', checked === true)
              }
            />
            <Label 
              htmlFor="recurrence" 
              className="cursor-pointer"
            >
              Repeat Weekly
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label 
            className={cn("mb-2 block", errors.equipmentRequired && "text-red-500")}
          >
            Equipment Required*
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 border p-3 rounded-md bg-background">
            {equipmentOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={`equipment-${option.value}`} 
                  checked={selectedEquipment.includes(option.value)}
                  onCheckedChange={() => toggleEquipment(option.value)}
                />
                <Label 
                  htmlFor={`equipment-${option.value}`}
                  className="cursor-pointer text-sm"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
          <ErrorMessage name="equipmentRequired" />
        </div>
      </div>

      <div className="border-t pt-4 mt-4">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="hasFee" 
            checked={classData.classFees !== null} 
            onCheckedChange={(checked) => {
              if (checked === false) {
                handleSelectChange('feeType', null as any);
                handleNumberChange({
                  target: { name: 'classFees', value: '' }
                } as React.ChangeEvent<HTMLInputElement>);
              } else if (classData.classFees === null) {
                handleNumberChange({
                  target: { name: 'classFees', value: '0' }
                } as React.ChangeEvent<HTMLInputElement>);
                handleSelectChange('feeType', 'per_session');
              }
            }}
          />
          <Label htmlFor="hasFee" className="cursor-pointer">Class Has Additional Fees</Label>
        </div>
        
        {classData.classFees !== null && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="classFees" className={cn(errors.classFees && "text-red-500")}>
                Fee Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                <Input 
                  id="classFees" 
                  name="classFees" 
                  type="number"
                  min="0"
                  step="0.01"
                  className={cn("pl-7", errors.classFees && "border-red-500 focus-visible:ring-red-500")}
                  value={classData.classFees || ''} 
                  onChange={handleNumberChange}
                  placeholder="0.00"
                />
              </div>
              <ErrorMessage name="classFees" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feeType" className={cn(errors.feeType && "text-red-500")}>
                Fee Type
              </Label>
              <Select 
                value={classData.feeType || ''}
                onValueChange={(value) => handleSelectChange('feeType', value)}
              >
                <SelectTrigger className={cn(errors.feeType && "border-red-500")}>
                  <SelectValue placeholder="Select fee type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per_session">Per Session</SelectItem>
                  <SelectItem value="package">Package</SelectItem>
                </SelectContent>
              </Select>
              <ErrorMessage name="feeType" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassFormFields;
