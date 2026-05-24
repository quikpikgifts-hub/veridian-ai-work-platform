import { cn } from '@/lib/utils';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-amber-500 hover:bg-amber-400 text-black font-bold',
  ghost:   'bg-transparent hover:bg-white/5 text-white/60 hover:text-white border border-white/10 hover:border-white/25',
  danger:  'bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/35',
  outline: 'bg-transparent hover:bg-amber-500/10 text-amber-400 border border-amber-500/35 hover:border-amber-500',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-[9px] tracking-[2px] px-3 py-1.5',
  md: 'text-[10px] tracking-[1.5px] px-4 py-2',
  lg: 'text-[11px] tracking-[1.5px] px-6 py-2.5',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({ variant = 'primary', size = 'md', children, fullWidth, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 uppercase transition-all duration-200 active:scale-95 rounded-[2px] cursor-pointer select-none',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
