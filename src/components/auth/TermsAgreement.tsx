
interface TermsAgreementProps {
  accepted: boolean;
  onChange: (accepted: boolean) => void;
  disabled?: boolean;
}

const TermsAgreement = ({ accepted, onChange, disabled }: TermsAgreementProps) => {
  return (
    <div className="flex items-center">
      <input
        id="terms"
        type="checkbox"
        className="h-4 w-4 rounded border-white/20 bg-gym-dark text-gym-orange focus:ring-gym-orange"
        checked={accepted}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <label htmlFor="terms" className="ml-2 block text-sm text-white/70">
        I agree to the{" "}
        <a href="/terms" className="text-gym-orange hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-gym-orange hover:underline">
          Privacy Policy
        </a>
      </label>
    </div>
  );
};

export default TermsAgreement;
