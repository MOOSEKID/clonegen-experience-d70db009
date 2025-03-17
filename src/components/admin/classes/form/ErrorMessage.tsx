
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  name: string;
  errors?: Record<string, string>;
}

const ErrorMessage = ({ name, errors = {} }: ErrorMessageProps) => (
  errors[name] ? (
    <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
      <AlertCircle className="h-4 w-4" />
      <span>{errors[name]}</span>
    </div>
  ) : null
);

export default ErrorMessage;
