
import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SaveState } from '@/hooks/admin/useSettings';
import { Loader2, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SettingsCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  saveState?: SaveState;
  className?: string;
  link?: string;
  status?: string;
}

const SettingsCard = ({
  title,
  description,
  children,
  footer,
  saveState = SaveState.Idle,
  className = "",
  link,
  status
}: SettingsCardProps) => {
  const renderSaveIndicator = () => {
    switch (saveState) {
      case SaveState.Saving:
        return <Loader2 className="h-4 w-4 animate-spin text-yellow-500" />;
      case SaveState.Saved:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case SaveState.Error:
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const CardWrapper = ({ children }: { children: ReactNode }) => {
    if (link) {
      return (
        <Link to={link} className="block transition-all hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-gym-orange rounded-lg">
          {children}
        </Link>
      );
    }
    return <>{children}</>;
  };

  return (
    <CardWrapper>
      <Card className={`shadow-sm ${link ? 'hover:border-gym-orange cursor-pointer' : ''} ${className}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{title}</CardTitle>
            <div className="flex items-center gap-2">
              {saveState !== SaveState.Idle && (
                <div className="flex items-center justify-center w-6 h-6">
                  {renderSaveIndicator()}
                </div>
              )}
              {link && <ChevronRight className="h-5 w-5 text-gray-400" />}
            </div>
          </div>
          {description && <CardDescription>{description}</CardDescription>}
          {status && (
            <div className="mt-1 text-sm font-medium text-gym-orange">{status}</div>
          )}
        </CardHeader>
        <CardContent className="pb-6">{children}</CardContent>
        {footer && <CardFooter className="pt-0 flex justify-end">{footer}</CardFooter>}
      </Card>
    </CardWrapper>
  );
};

export default SettingsCard;
