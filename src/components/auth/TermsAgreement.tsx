
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TermsAgreementProps {
  accepted: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

const TermsAgreement = ({ accepted, onChange, disabled = false }: TermsAgreementProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="terms" 
        checked={accepted} 
        onCheckedChange={(checked) => onChange(checked === true)} 
        disabled={disabled} 
        className="data-[state=checked]:bg-gym-orange"
      />
      <Label 
        htmlFor="terms" 
        className="text-sm text-muted-foreground cursor-pointer"
      >
        I agree to the{' '}
        <a 
          href="/terms" 
          className="text-gym-orange hover:underline" 
          onClick={(e) => e.stopPropagation()}
        >
          terms of service
        </a>
        {' '}and{' '}
        <a 
          href="/privacy" 
          className="text-gym-orange hover:underline" 
          onClick={(e) => e.stopPropagation()}
        >
          privacy policy
        </a>
      </Label>
    </div>
  );
};

export default TermsAgreement;
