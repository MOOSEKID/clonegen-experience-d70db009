
import { Checkbox } from "@/components/ui/checkbox";

interface TermsAgreementProps {
  accepted: boolean;
  onAcceptedChange: (accepted: boolean) => void;
  disabled?: boolean;
}

const TermsAgreement = ({ accepted, onAcceptedChange, disabled = false }: TermsAgreementProps) => {
  return (
    <div className="flex items-start space-x-2 mt-4">
      <Checkbox
        id="terms"
        checked={accepted}
        onCheckedChange={(checked) => onAcceptedChange(checked as boolean)}
        disabled={disabled}
        className="mt-1"
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms"
          className="text-sm text-white/70 cursor-pointer"
        >
          By creating an account, I agree to the{' '}
          <a href="/terms" className="text-gym-orange hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-gym-orange hover:underline">
            Privacy Policy
          </a>
        </label>
      </div>
    </div>
  );
};

export default TermsAgreement;
