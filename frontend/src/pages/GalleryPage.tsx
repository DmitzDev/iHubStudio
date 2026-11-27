import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project, ProjectTrack } from '@ihub/shared';
import { PageHeader } from '../components/layout/PageHeader';
import { Section } from '../components/layout/Section';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { SkeletonCard } from '../components/ui/Skeleton';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFetch } from '../hooks/useFetch';
import { projectsService } from '../services/projects.service';

const TRACKS: Array<'All' | ProjectTrack> = [
  'All',
  'Engineering',
  'Design',
  'Media',
  'Research',
];

const aspectClasses: Record<Project['aspectRatio'], string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

export function GalleryPage() {
  useDocumentTitle('Gallery');

  const [track, setTrack] = useState<'All' | ProjectTrack>('All');

  const projects = useFetch(
    () =>
      projectsService.list(
        track === 'All' ? undefined : { track }
      ),
    [track]
  );

  return (
    <>
      <PageHeader
        eyebrow="Visual Index"
        title="Studio Gallery"
        description="Selected visual specimens, layout studies, and media frames documented by iHub Studio."
      />

      <Section bordered={false}>
        <div
          className="flex flex-wrap gap-2 border-b border-hairline pb-6"
          role="tablist"
          aria-label="Filter gallery by track"
        >
          {TRACKS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={track === item}
              onClick={() => setTrack(item)}
              className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                track === item
                  ? 'border-ink bg-ink text-paper'
                  : 'border-hairline bg-surface text-muted hover:border-ink hover:text-ink'
              }`}
            >
              {item}
            </button>
          ))}
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
          {projects.data && projects.data.length === 0 && (
            <EmptyState
              title="No specimens in this track"
              description="Try selecting another track filter above."
            />
          )}
          {projects.data && projects.data.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.data.map((project, index) => (
                <figure
                  key={project.id}
                  className="group flex flex-col justify-between border border-hairline bg-surface p-4 transition-colors hover:border-ink"
                >
                  <div>
                    <Link to={`/projects/${project.slug}`} className="block">
                      <div
                        className={`specimen-grid flex w-full flex-col justify-between border border-hairline p-5 ${aspectClasses[project.aspectRatio]}`}
                      >
                        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted tabular-nums">
                          <span>FIG. {String(index + 1).padStart(2, '0')}</span>
                          <span>{project.aspectRatio}</span>
                        </div>
                        <div className="grid grid-cols-12 gap-1.5" aria-hidden="true">
                          <div className="col-span-6 h-1 bg-[#252525]" />
                          <div className="col-span-2 h-1 bg-[#545454]" />
                          <div className="col-span-4 h-1 bg-[#7D7D7D]" />
                          <div className="col-span-3 h-1 bg-[#CFCFCF]" />
                          <div className="col-span-9 h-1 bg-[#545454]/60" />
                        </div>
                        <div className="flex items-center justify-between font-mono text-[11px] text-muted">
                          <span>{project.semester}</span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                    </Link>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <Badge variant="outline">{project.track}</Badge>
                      <span className="font-mono text-[11px] text-muted">
                        {project.status}
                      </span>
                    </div>

                    <h2 className="mt-2 font-display text-base font-semibold text-ink group-hover:text-accent">
                      <Link to={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>
                  </div>

                  <figcaption className="mt-2 text-xs leading-relaxed text-muted">
                    {project.coverCaption}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
