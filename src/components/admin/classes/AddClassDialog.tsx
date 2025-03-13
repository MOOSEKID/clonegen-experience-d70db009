
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClassType } from '@/hooks/useClassesData';

interface AddClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddClass: (newClass: Omit<ClassType, 'id'>) => void;
}

const AddClassDialog = ({ open, onOpenChange, onAddClass }: AddClassDialogProps) => {
  const [classData, setClassData] = useState<Omit<ClassType, 'id'>>({
    name: '',
    description: '',
    type: 'yoga',
    trainer: '',
    capacity: 20,
    enrolled: 0,
    waitlist: 0,
    day: 'Monday',
    time: '08:00',
    duration: 60,
    room: '',
    status: 'scheduled'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClassData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      setClassData(prev => ({
        ...prev,
        [name]: numValue
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setClassData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddClass(classData);
    onOpenChange(false);
    // Reset form
    setClassData({
      name: '',
      description: '',
      type: 'yoga',
      trainer: '',
      capacity: 20,
      enrolled: 0,
      waitlist: 0,
      day: 'Monday',
      time: '08:00',
      duration: 60,
      room: '',
      status: 'scheduled'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Class</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassDialog;
