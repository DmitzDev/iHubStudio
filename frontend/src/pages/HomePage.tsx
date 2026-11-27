import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { StudioEvent } from '@ihub/shared';
import { Container } from '../components/layout/Container';
import { Section } from '../components/layout/Section';
import { AnnouncementItem } from '../components/shared/AnnouncementItem';
import { EventRow } from '../components/shared/EventRow';
import { ProjectCard } from '../components/shared/ProjectCard';
import { RsvpModal } from '../components/shared/RsvpModal';
import { SkeletonCard, SkeletonRow } from '../components/ui/Skeleton';
import { SITE_CONFIG } from '../config/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFetch } from '../hooks/useFetch';
import { announcementsService } from '../services/announcements.service';
import { eventsService } from '../services/events.service';
import { projectsService } from '../services/projects.service';

export function HomePage() {
  useDocumentTitle('Home');

  const [selectedEvent, setSelectedEvent] = useState<StudioEvent | null>(null);

  const projects = useFetch(() => projectsService.list({ featured: true }), []);
  const events = useFetch(() => eventsService.list({ upcoming: true }), []);
  const announcements = useFetch(() => announcementsService.list(), []);

  return (
    <>
      <section className="border-b border-hairline py-16 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                {SITE_CONFIG.semester}
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                A student-run studio building digital products, campus media, and open-source tools.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                iHub Studio brings together student engineers, designers, and media producers for weekly work sessions, peer critiques, and practical campus software.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 border border-[#252525] bg-[#252525] px-6 py-3 text-sm font-medium text-white transition-colors hover:border-[#545454] hover:bg-[#545454]"
                >
                  Explore Projects
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 border border-hairline bg-surface px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  Studio Portal
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="border border-hairline bg-surface p-6">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Weekly Open Studio
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#252525]" aria-hidden="true" />
                    Open
                  </span>
                </div>
                <p className="mt-2 font-display text-lg font-semibold text-ink tabular-nums">
                  Fridays, 15:00 – 18:00
                </p>
                <p className="mt-1 text-sm text-muted">
                  Innovation Hall, Room 304
                </p>
                <div className="mt-5 border-t border-hairline pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Current Cohort Focus
                  </p>
                  <p className="mt-1.5 text-sm text-ink">
                    Campus transit tooling, Monograph Issue 04 archive, and open workshop recordings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              01 · Studio Tracks
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
              How work is organized
            </h2>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink hover:text-accent"
          >
            About the organization
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 border-l border-t border-hairline sm:grid-cols-2 lg:grid-cols-4">
          {SITE_CONFIG.tracks.map((track) => (
            <div
              key={track.code}
              className="border-b border-r border-hairline bg-surface p-6"
            >
              <span className="font-mono text-xs text-accent">{track.code}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink">
                {track.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {track.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              02 · Featured Work
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Recent studio releases
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink hover:text-accent"
          >
            View all projects
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="mt-8">
          {projects.loading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}
          {projects.error && (
            <p className="text-sm text-signal">{projects.error}</p>
          )}
          {projects.data && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.data.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              03 · Schedule
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Upcoming workshops &amp; sessions
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink hover:text-accent"
          >
            All events
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="mt-6 border-t border-hairline">
          {events.loading && (
            <>
              <SkeletonRow />
              <SkeletonRow />
            </>
          )}
          {events.error && (
            <p className="py-6 text-sm text-signal">{events.error}</p>
          )}
          {events.data &&
            events.data.map((evt) => (
              <EventRow
                key={evt.id}
                event={evt}
                onRsvp={(target) => setSelectedEvent(target)}
              />
            ))}
        </div>
      </Section>

      <Section bordered={false}>
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            04 · Bulletin
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Latest announcements
          </h2>
        </div>

        <div className="mt-6 border-t border-hairline">
          {announcements.loading && (
            <p className="py-6 font-mono text-xs text-muted">
              Loading announcements...
            </p>
          )}
          {announcements.error && (
            <p className="py-6 text-sm text-red-700">{announcements.error}</p>
          )}
          {announcements.data &&
            announcements.data.map((item) => (
              <AnnouncementItem key={item.id} announcement={item} />
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
