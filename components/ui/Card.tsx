import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  goldTop?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'none';
}

const paddings = { sm: 'p-3', md: 'p-4', lg: 'p-6', none: '' };

export function Card({ children, className, hover = false, goldTop = false, padding = 'md' }: CardProps) {
  return (
    <div className={cn(
      'relative bg-[#131320] border border-white/[0.07] rounded-[3px] overflow-hidden',
      goldTop && 'border-t-amber-500/60 border-t',
      hover && 'transition-all duration-250 hover:border-amber-500/30 hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(0,0,0,0.45)]',
      paddings[padding],
      className
    )}>
      {goldTop && (
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />
      )}
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  action?: ReactNode;
  subtitle?: string;
}

export function CardHeader({ title, action, subtitle }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-[10px] font-bold tracking-[3px] uppercase text-amber-400/90">{title}</h3>
        {subtitle && <p className="text-[11px] text-white/35 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
