import { cn } from '@/lib/utils';

type Variant = 'critical' | 'high' | 'medium' | 'low' | 'active' | 'standby' | 'processing' | 'gold' | 'blue' | 'grey' | 'review' | 'investigating' | 'contained' | 'resolved';

const variants: Record<Variant, string> = {
  critical:     'bg-red-500/15 text-red-400 border border-red-500/40',
  high:         'bg-orange-500/15 text-orange-400 border border-orange-500/40',
  medium:       'bg-yellow-400/12 text-yellow-300 border border-yellow-400/40',
  low:          'bg-green-500/12 text-green-400 border border-green-500/35',
  active:       'bg-green-500/12 text-green-400 border border-green-500/35',
  standby:      'bg-orange-500/12 text-orange-400 border border-orange-500/35',
  processing:   'bg-blue-500/12 text-blue-400 border border-blue-500/35',
  gold:         'bg-amber-500/12 text-amber-400 border border-amber-500/35',
  blue:         'bg-blue-500/12 text-blue-400 border border-blue-500/35',
  grey:         'bg-white/8 text-white/60 border border-white/15',
  review:       'bg-amber-500/12 text-amber-400 border border-amber-500/35',
  investigating:'bg-orange-500/12 text-orange-400 border border-orange-500/35',
  contained:    'bg-blue-500/12 text-blue-400 border border-blue-500/35',
  resolved:     'bg-green-500/12 text-green-400 border border-green-500/35',
};

interface BadgeProps {
  variant: Variant;
  label: string;
  dot?: boolean;
  className?: string;
}

export function Badge({ variant, label, dot = false, className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold tracking-[1.5px] uppercase rounded-[2px]',
      variants[variant],
      className
    )}>
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full bg-current flex-shrink-0',
          (variant === 'active' || variant === 'processing') && 'animate-pulse'
        )} />
      )}
      {label}
    </span>
  );
}
