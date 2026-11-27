import type { ReactNode } from 'react';

type BadgeVariant = 'neutral' | 'accent' | 'signal' | 'outline';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-hairline/60 text-ink border border-transparent',
  accent: 'bg-[#252525] text-white border border-[#252525]',
  signal: 'bg-signal-subtle text-signal border border-signal/30',
  outline: 'bg-transparent text-muted border border-hairline',
};

export function Badge({
  variant = 'outline',
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
