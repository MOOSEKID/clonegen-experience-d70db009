
import { ClassType } from '@/types/classTypes';
import BasicInfoFields from './form/BasicInfoFields';
import TrainerCapacityFields from './form/TrainerCapacityFields';
import ClassLevelStatusFields from './form/ClassLevelStatusFields';
import SchedulingFields from './form/SchedulingFields';
import EquipmentFields from './form/EquipmentFields';
import FeesFields from './form/FeesFields';

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
  return (
    <div className="space-y-4 py-4">
      {/* Basic Class Information */}
      <BasicInfoFields 
        classData={classData}
        errors={errors}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
      />
      
      {/* Trainer and Capacity */}
      <TrainerCapacityFields 
        classData={classData}
        errors={errors}
        handleNumberChange={handleNumberChange}
        handleSelectChange={handleSelectChange}
      />
      
      {/* Class Level and Status */}
      <ClassLevelStatusFields 
        classData={classData}
        errors={errors}
        handleSelectChange={handleSelectChange}
      />
      
      {/* Scheduling Information */}
      <SchedulingFields 
        classData={classData}
        errors={errors}
        handleChange={handleChange}
        handleNumberChange={handleNumberChange}
        handleSelectChange={handleSelectChange}
        handleCheckboxChange={handleCheckboxChange}
        handleMultiSelectChange={handleMultiSelectChange}
      />
      
      {/* Equipment Required */}
      <EquipmentFields 
        classData={classData}
        errors={errors}
        handleMultiSelectChange={handleMultiSelectChange}
      />
      
      {/* Fees Information */}
      <FeesFields 
        classData={classData}
        errors={errors}
        handleNumberChange={handleNumberChange}
        handleSelectChange={handleSelectChange}
      />
    </div>
  );
};

export default ClassFormFields;
