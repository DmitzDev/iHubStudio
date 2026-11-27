import type { Announcement } from '@ihub/shared';
import { Badge } from '../ui/Badge';

interface AnnouncementItemProps {
  announcement: Announcement;
}

export function AnnouncementItem({ announcement }: AnnouncementItemProps) {
  return (
    <article
      className={`grid grid-cols-1 gap-2 border-b border-hairline py-4 sm:grid-cols-12 sm:items-baseline ${
        announcement.pinned ? 'border-l-2 border-l-[#252525] pl-4' : ''
      }`}
    >
      <div className="flex items-center gap-3 sm:col-span-3">
        <time className="font-mono text-xs text-muted tabular-nums">
          {announcement.publishedAt}
        </time>
        <Badge variant={announcement.pinned ? 'accent' : 'outline'}>
          {announcement.category}
        </Badge>
      </div>
      <div className="sm:col-span-9">
        <h3 className="font-display text-base font-semibold text-ink">
          {announcement.title}
        </h3>
        <p className="mt-1 max-w-[65ch] text-sm leading-relaxed text-muted">
          {announcement.body}
        </p>
      </div>
    </article>
  );
}
