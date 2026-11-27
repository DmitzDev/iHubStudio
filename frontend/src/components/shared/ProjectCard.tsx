import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@ihub/shared';
import { Badge } from '../ui/Badge';

interface ProjectCardProps {
  project: Project;
}

const aspectClasses: Record<Project['aspectRatio'], string> = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col border border-hairline bg-surface transition-colors duration-150 hover:border-ink">
      <Link to={`/projects/${project.slug}`} className="block p-4 pb-0">
        <div
          className={`specimen-grid relative w-full overflow-hidden border border-hairline ${aspectClasses[project.aspectRatio]}`}
        >
          <div className="flex h-full w-full flex-col justify-between p-4">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted tabular-nums">
              <span className="flex items-center gap-1.5">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${
                    project.status === 'Active' ? 'bg-accent' : 'bg-muted'
                  }`}
                  aria-hidden="true"
                />
                {project.id.toUpperCase()}
              </span>
              <span>{project.track}</span>
            </div>

            <div className="grid grid-cols-12 gap-1.5" aria-hidden="true">
              <div className="col-span-6 h-1 bg-[#252525]" />
              <div className="col-span-2 h-1 bg-[#545454]" />
              <div className="col-span-4 h-1 bg-[#7D7D7D]" />
              <div className="col-span-3 h-1 bg-[#CFCFCF]" />
              <div className="col-span-9 h-1 bg-[#545454]/60" />
            </div>

            <p className="font-mono text-[11px] text-muted line-clamp-1">
              {project.coverCaption}
            </p>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between gap-2">
            <Badge variant={project.status === 'Active' ? 'accent' : 'outline'}>
              {project.status}
            </Badge>
            <span className="font-mono text-[11px] text-muted tabular-nums">
              {project.semester}
            </span>
          </div>

          <h3 className="mt-3 font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent">
            <Link
              to={`/projects/${project.slug}`}
              className="inline-flex items-start gap-1"
            >
              <span>{project.title}</span>
              <ArrowUpRight
                className="mt-1 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                strokeWidth={1.5}
              />
            </Link>
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted">
            {project.summary}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 border-t border-hairline pt-4">
          {project.tools.slice(0, 3).map((tool) => (
            <span key={tool} className="font-mono text-[11px] text-muted">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
