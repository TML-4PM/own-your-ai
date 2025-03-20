
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: 'light' | 'medium' | 'heavy';
  hover?: boolean;
  children: React.ReactNode;
}

const GlassCard = ({
  intensity = 'medium',
  hover = true,
  className,
  children,
  ...props
}: GlassCardProps) => {
  const intensityClasses = {
    light: 'bg-white/30 dark:bg-white/5 border-white/20 dark:border-white/10',
    medium: 'bg-white/50 dark:bg-white/10 border-white/30 dark:border-white/20',
    heavy: 'bg-white/70 dark:bg-white/20 border-white/40 dark:border-white/30',
  };

  return (
    <div
      className={cn(
        'rounded-2xl backdrop-blur-lg border shadow-sm',
        intensityClasses[intensity],
        hover && 'transition-all duration-300 hover:shadow-md hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
