import type { ReactNode } from 'react';
import { Container } from './Container';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  aside,
}: PageHeaderProps) {
  return (
    <header className="border-b border-hairline py-12 sm:py-16">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              {eyebrow}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {description}
            </p>
          </div>
          {aside && <div className="shrink-0">{aside}</div>}
        </div>
      </Container>
    </header>
  );
}
