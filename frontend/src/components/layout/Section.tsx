import type { ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}

export function Section({
  children,
  className = '',
  bordered = true,
}: SectionProps) {
  return (
    <section
      className={`py-14 sm:py-20 ${bordered ? 'border-b border-hairline' : ''} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
