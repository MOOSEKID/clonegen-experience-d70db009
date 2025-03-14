
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
import { Info, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ClassFormFieldsProps {
  classData: Omit<ClassType, 'id'>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCheckboxChange?: (name: string, checked: boolean) => void;
  handleMultiSelectChange?: (name: string, values: string[]) => void;
}

const ClassFormFields = ({
  classData,
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

  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Class Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={classData.name} 
            onChange={handleChange} 
            placeholder="Enter class name"
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type">Class Type</Label>
          <Select 
            value={classData.type} 
            onValueChange={(value) => handleSelectChange('type', value)}
          >
            <SelectTrigger>
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
          <Label htmlFor="trainer">Trainer</Label>
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
              <SelectTrigger>
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
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="capacity">Maximum Capacity</Label>
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
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="classLevel">Class Level</Label>
          <Select 
            value={classData.classLevel} 
            onValueChange={(value) => handleSelectChange('classLevel', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select class level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Class Status</Label>
          <Select 
            value={classData.status} 
            onValueChange={(value) => handleSelectChange('status', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select class status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="full">Full</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="day">Day</Label>
          <Select 
            value={classData.day} 
            onValueChange={(value) => handleSelectChange('day', value)}
          >
            <SelectTrigger>
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
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time">Start Time</Label>
          <Input 
            id="time" 
            name="time" 
            type="time"
            value={classData.time} 
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (mins)</Label>
          <Input 
            id="duration" 
            name="duration" 
            type="number"
            min="15"
            step="5"
            value={classData.duration} 
            onChange={handleNumberChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="room">Room</Label>
          <Input 
            id="room" 
            name="room" 
            value={classData.room} 
            onChange={handleChange}
            placeholder="Enter room or location"
            required
          />
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
          <Label className="mb-2 block">Equipment Required</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
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
              <Label htmlFor="classFees">Fee Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
                <Input 
                  id="classFees" 
                  name="classFees" 
                  type="number"
                  min="0"
                  step="0.01"
                  className="pl-7"
                  value={classData.classFees || ''} 
                  onChange={handleNumberChange}
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="feeType">Fee Type</Label>
              <Select 
                value={classData.feeType || ''}
                onValueChange={(value) => handleSelectChange('feeType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fee type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="per_session">Per Session</SelectItem>
                  <SelectItem value="package">Package</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassFormFields;
