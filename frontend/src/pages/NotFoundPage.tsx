import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle('Page Not Found');

  return (
    <Container className="py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        404 · Not Found
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
        This page does not exist.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        The link you followed may be outdated or the route was moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 border border-ink px-4 py-2.5 text-sm font-medium text-ink hover:bg-ink hover:text-paper"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        Return Home
      </Link>
    </Container>
  );
}
