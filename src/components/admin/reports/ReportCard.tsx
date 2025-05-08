
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, ArrowUpRight, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ReportCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  allowDownload?: boolean;
  allowDateRange?: boolean;
  isLoading?: boolean;
  footer?: React.ReactNode;
  infoTooltip?: string;
}

const ReportCard = ({ 
  title, 
  description, 
  children, 
  className, 
  allowDownload = false,
  allowDateRange = false,
  isLoading = false,
  footer,
  infoTooltip,
}: ReportCardProps) => {
  return (
    <Card className={`shadow-sm overflow-hidden ${className}`}>
      <CardHeader className="bg-white pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {infoTooltip && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{infoTooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex gap-1">
            {allowDateRange && (
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Calendar className="mr-1 h-3 w-3" /> Filter
              </Button>
            )}
            {allowDownload && (
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <Download className="mr-1 h-3 w-3" /> Export
              </Button>
            )}
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={`pt-4 ${isLoading ? 'opacity-60' : ''}`}>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gym-orange"></div>
          </div>
        ) : children}
      </CardContent>
      {footer && <CardFooter className="border-t bg-gray-50 py-2">{footer}</CardFooter>}
    </Card>
  );
};

export default ReportCard;
