import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'accent' | 'success' | 'warning';
  className?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue, 
  variant = 'default',
  className 
}: StatsCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'accent':
        return 'border-accent/20 bg-accent/5 hover:bg-accent/10';
      case 'success':
        return 'border-success/20 bg-success/5 hover:bg-success/10';
      case 'warning':
        return 'border-warning/20 bg-warning/5 hover:bg-warning/10';
      default:
        return 'border-border bg-card hover:bg-secondary/30';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={cn(
      "card-enhanced border-2 p-6 transition-all duration-300",
      getVariantStyles(),
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {icon && <div className="text-muted-foreground">{icon}</div>}
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {trend && trendValue && (
          <div className={cn("text-sm font-medium", getTrendColor())}>
            {trendValue}
          </div>
        )}
      </div>
    </div>
  );
};