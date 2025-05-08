
import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SaveState } from '@/hooks/admin/useSettings';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface SettingsCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  saveState?: SaveState;
  className?: string;
}

const SettingsCard = ({
  title,
  description,
  children,
  footer,
  saveState = SaveState.Idle,
  className = "",
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

  return (
    <Card className={`shadow-sm ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <div className="flex items-center justify-center w-6 h-6">
            {renderSaveIndicator()}
          </div>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pb-6">{children}</CardContent>
      {footer && <CardFooter className="pt-0 flex justify-end">{footer}</CardFooter>}
    </Card>
  );
};

export default SettingsCard;
