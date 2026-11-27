import { useState } from 'react';
import { Search } from 'lucide-react';
import type { ProjectTrack } from '@ihub/shared';
import { PageHeader } from '../components/layout/PageHeader';
import { Section } from '../components/layout/Section';
import { ProjectCard } from '../components/shared/ProjectCard';
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

export function ProjectsPage() {
  useDocumentTitle('Projects');

  const [track, setTrack] = useState<'All' | ProjectTrack>('All');
  const [query, setQuery] = useState('');

  const projects = useFetch(
    () =>
      projectsService.list({
        track: track === 'All' ? undefined : track,
        q: query.trim() || undefined,
      }),
    [track, query]
  );

  return (
    <>
      <PageHeader
        eyebrow="Archive"
        title="Studio Projects"
        description="Software utilities, editorial publications, and media infrastructure built by student squads."
      />

      <Section bordered={false}>
        <div className="flex flex-col justify-between gap-4 border-b border-hairline pb-6 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by track">
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

          <div className="relative w-full md:w-72">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              strokeWidth={1.5}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title or tool..."
              aria-label="Search projects"
              className="w-full border border-hairline bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
            />
          </div>
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
              title="No matching projects"
              description="Try clearing your search query or switching to another track."
            />
          )}
          {projects.data && projects.data.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.data.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
