
import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';

interface TermsAgreementProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

const TermsAgreement = ({ checked, onCheckedChange, disabled }: TermsAgreementProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(checked) => onCheckedChange(checked as boolean)}
        disabled={disabled}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I accept the{' '}
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
