
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface TermsAgreementProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({ 
  checked, 
  onCheckedChange,
  disabled = false
}) => {
  return (
    <div className="flex items-start space-x-2 my-4">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the terms and conditions
        </label>
        <p className="text-xs text-muted-foreground">
          By checking this box, you agree to our{" "}
          <a href="/terms" className="text-gym-orange hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-gym-orange hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default TermsAgreement;
