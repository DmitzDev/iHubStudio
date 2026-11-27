import { useEffect } from 'react';

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title ? `${title} — iHub Studio` : 'iHub Studio';
  }, [title]);
}
