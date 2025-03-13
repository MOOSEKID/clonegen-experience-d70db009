
import { ClassType } from '@/types/classTypes';

interface ClassInfoHeaderProps {
  classData: ClassType;
}

const ClassInfoHeader = ({ classData }: ClassInfoHeaderProps) => {
  return (
    <div className="bg-gray-100 p-3 mb-4 rounded-md">
      <h3 className="font-bold">{classData.name}</h3>
      <div className="text-sm text-gray-500 flex flex-wrap gap-x-4 mt-1">
        <span>{classData.day}, {classData.time}</span>
        <span>Capacity: {classData.enrolled}/{classData.capacity}</span>
        <span>Waitlist: {classData.waitlist}</span>
      </div>
    </div>
  );
};

export default ClassInfoHeader;
