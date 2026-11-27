import { useState } from 'react';
import type { StudioEvent } from '@ihub/shared';
import { PageHeader } from '../components/layout/PageHeader';
import { Section } from '../components/layout/Section';
import { EventRow } from '../components/shared/EventRow';
import { RsvpModal } from '../components/shared/RsvpModal';
import { EmptyState } from '../components/ui/EmptyState';
import { SkeletonRow } from '../components/ui/Skeleton';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFetch } from '../hooks/useFetch';
import { eventsService } from '../services/events.service';

export function EventsPage() {
  useDocumentTitle('Events');

  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [selectedEvent, setSelectedEvent] = useState<StudioEvent | null>(null);

  const events = useFetch(
    () =>
      eventsService.list(
        tab === 'upcoming' ? { upcoming: true } : { past: true }
      ),
    [tab]
  );

  return (
    <>
      <PageHeader
        eyebrow="Calendar"
        title="Events & Workshops"
        description="Open critiques, technical workshops, and pitch nights hosted by iHub Studio across campus."
      />

      <Section bordered={false}>
        <div className="flex items-center gap-2 border-b border-hairline pb-6" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'upcoming'}
            onClick={() => setTab('upcoming')}
            className={`border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
              tab === 'upcoming'
                ? 'border-ink bg-ink text-paper'
                : 'border-hairline bg-surface text-muted hover:border-ink hover:text-ink'
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'past'}
            onClick={() => setTab('past')}
            className={`border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
              tab === 'past'
                ? 'border-ink bg-ink text-paper'
                : 'border-hairline bg-surface text-muted hover:border-ink hover:text-ink'
            }`}
          >
            Past
          </button>
        </div>

        <div>
          {events.loading && (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          )}
          {events.error && (
            <p className="py-8 text-sm text-signal">{events.error}</p>
          )}
          {events.data && events.data.length === 0 && (
            <div className="pt-8">
              <EmptyState
                title="No events listed"
                description="Check back soon for the next studio workshop or open house."
              />
            </div>
          )}
          {events.data &&
            events.data.map((evt) => (
              <EventRow
                key={evt.id}
                event={evt}
                onRsvp={tab === 'upcoming' ? (target) => setSelectedEvent(target) : undefined}
              />
            ))}
        </div>
      </Section>

      <RsvpModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onSuccess={() => events.refetch()}
      />
    </>
  );
}
