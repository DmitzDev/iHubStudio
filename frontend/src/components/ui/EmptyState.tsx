import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="border border-hairline bg-surface px-6 py-12 text-center">
      <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-muted">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
