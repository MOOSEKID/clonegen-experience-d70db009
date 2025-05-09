
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { isValidRwandanPhone } from './optionsData';

interface PhoneInputProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  placeholder?: string;
  required?: boolean;
}

export const PhoneInput = ({ 
  value, 
  onChange, 
  placeholder = "Phone number", 
  required = false 
}: PhoneInputProps) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  
  useEffect(() => {
    // Initial validation
    if (value) {
      setIsValid(isValidRwandanPhone(value));
    } else {
      setIsValid(!required);
    }
  }, [value, required]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Auto-format to Rwandan format
    let formattedValue = newValue;
    if (newValue.startsWith('0') && newValue.length > 1) {
      formattedValue = '+25' + newValue.substring(1);
    }
    
    const newIsValid = formattedValue ? isValidRwandanPhone(formattedValue) : !required;
    setIsValid(newIsValid);
    onChange(formattedValue, newIsValid);
  };

  return (
    <div className="space-y-1">
      <Input
        type="tel"
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        className={!isValid ? "border-red-500 focus:border-red-500" : ""}
      />
      {!isValid && (
        <p className="text-xs text-red-500">
          Please enter a valid Rwandan phone number (e.g., +250781234567)
        </p>
      )}
    </div>
  );
};
