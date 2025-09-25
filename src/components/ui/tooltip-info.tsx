import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface TooltipInfoProps {
  content: React.ReactNode;
  className?: string;
  iconSize?: number;
}

export const TooltipInfo = ({ content, className, iconSize = 16 }: TooltipInfoProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info 
            className={cn("cursor-help text-muted-foreground hover:text-primary transition-colors", className)} 
            size={iconSize}
          />
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-4">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};