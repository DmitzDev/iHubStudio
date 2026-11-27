import { Calendar, MapPin } from 'lucide-react';
import type { StudioEvent } from '@ihub/shared';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface EventRowProps {
  event: StudioEvent;
  onRsvp?: (event: StudioEvent) => void;
}

export function EventRow({ event, onRsvp }: EventRowProps) {
  const isFull = event.attendeeCount >= event.capacity;
  const fillPercent = Math.min(
    100,
    Math.round((event.attendeeCount / Math.max(1, event.capacity)) * 100)
  );
  const isHighDemand = fillPercent >= 80;

  return (
    <div className="grid grid-cols-1 gap-4 border-b border-hairline py-6 transition-colors hover:bg-surface/60 md:grid-cols-12 md:items-center md:px-2">
      <div className="md:col-span-3">
        <div className="flex items-center gap-2 font-mono text-xs text-ink tabular-nums">
          <Calendar className="h-3.5 w-3.5 text-muted" strokeWidth={1.5} />
          <span>{event.date}</span>
        </div>
        <p className="mt-1 pl-5 font-mono text-xs text-muted tabular-nums">
          {event.time}
        </p>
      </div>

      <div className="md:col-span-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{event.track}</Badge>
          <span className="inline-flex items-center gap-1 font-mono text-xs text-muted">
            <MapPin className="h-3 w-3" strokeWidth={1.5} />
            {event.venue}
          </span>
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold text-ink">
          {event.title}
        </h3>
        <p className="mt-1 max-w-[65ch] text-sm leading-relaxed text-muted">
          {event.description}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 md:col-span-3 md:justify-end">
        <div className="w-24">
          <div className="flex justify-between font-mono text-[11px] text-muted tabular-nums">
            <span>{event.attendeeCount}/{event.capacity}</span>
            <span>{fillPercent}%</span>
          </div>
          <div className="mt-1 h-1 w-full bg-hairline">
            <div
              className={`h-full transition-all ${
                isHighDemand ? 'bg-[#252525]' : 'bg-[#545454]'
              }`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        {event.isUpcoming && onRsvp ? (
          <Button
            variant={isFull ? 'secondary' : 'primary'}
            size="sm"
            disabled={isFull}
            onClick={() => onRsvp(event)}
          >
            {isFull ? 'Session Full' : 'RSVP'}
          </Button>
        ) : (
          <Badge variant="neutral">Completed</Badge>
        )}
      </div>
    </div>
  );
}
