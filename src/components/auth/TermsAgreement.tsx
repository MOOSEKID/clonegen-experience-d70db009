
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';

interface TermsAgreementProps {
  accepted: boolean;
  onChange: (checked: boolean) => void;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({ accepted, onChange }) => {
  return (
    <div className="flex items-start space-x-2 mt-4">
      <Checkbox 
        id="terms"
        checked={accepted}
        onCheckedChange={onChange}
        className="mt-1"
      />
      <label htmlFor="terms" className="text-sm text-gray-600">
        I agree to the{' '}
        <Link to="/terms" className="text-gym-orange hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className="text-gym-orange hover:underline">
          Privacy Policy
        </Link>
      </label>
    </div>
  );
};

export default TermsAgreement;
