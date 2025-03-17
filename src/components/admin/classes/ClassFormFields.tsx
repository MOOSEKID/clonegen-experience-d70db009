
import { ClassType } from '@/hooks/useClassesData';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClassFormFieldsProps {
  classData: Omit<ClassType, 'id'>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const ClassFormFields = ({
  classData,
  handleChange,
  handleNumberChange,
  handleSelectChange
}: ClassFormFieldsProps) => {
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
          value={classData.description} 
          onChange={handleChange} 
          rows={3} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="trainer">Trainer</Label>
          <Input 
            id="trainer" 
            name="trainer" 
            value={classData.trainer} 
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="capacity">Maximum Capacity</Label>
          <Input 
            id="capacity" 
            name="capacity" 
            type="number"
            min="1"
            value={classData.capacity} 
            onChange={handleNumberChange}
            required
          />
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
      
      <div className="space-y-2">
        <Label htmlFor="room">Room</Label>
        <Input 
          id="room" 
          name="room" 
          value={classData.room} 
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default ClassFormFields;
