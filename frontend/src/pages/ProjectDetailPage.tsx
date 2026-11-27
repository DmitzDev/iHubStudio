import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { Badge } from '../components/ui/Badge';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFetch } from '../hooks/useFetch';
import { projectsService } from '../services/projects.service';

export function ProjectDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();

  const projectState = useFetch(
    () => projectsService.getBySlug(slug),
    [slug]
  );

  useDocumentTitle(projectState.data?.title ?? 'Project');

  if (projectState.loading) {
    return (
      <Container className="py-16">
        <p className="font-mono text-xs text-muted">Loading project notes...</p>
      </Container>
    );
  }

  if (projectState.error || !projectState.data) {
    return (
      <Container className="py-16">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          Not Found
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold text-ink">
          Project could not be loaded
        </h1>
        <p className="mt-2 text-sm text-muted">
          {projectState.error ?? 'The requested project does not exist.'}
        </p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 border border-ink px-4 py-2 text-sm font-medium text-ink hover:bg-ink hover:text-paper"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Back to Projects
        </Link>
      </Container>
    );
  }

  const project = projectState.data;

  return (
    <article className="py-12 sm:py-16">
      <Container>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          All Projects
        </Link>

        <header className="mt-8 border-b border-hairline pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">{project.track}</Badge>
            <Badge variant="outline">{project.status}</Badge>
            <span className="font-mono text-xs text-muted">
              {project.semester}
            </span>
          </div>

          <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {project.summary}
          </p>
        </header>

        <figure className="mt-10 border border-hairline bg-surface p-4">
          <div className="specimen-grid flex aspect-video w-full flex-col justify-between border border-hairline p-6">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-muted tabular-nums">
              <span>{project.id.toUpperCase()}</span>
              <span>{project.slug}</span>
            </div>
            <div className="grid grid-cols-12 gap-2" aria-hidden="true">
              <div className="col-span-6 h-1.5 bg-[#252525]" />
              <div className="col-span-2 h-1.5 bg-[#545454]" />
              <div className="col-span-4 h-1.5 bg-[#7D7D7D]" />
              <div className="col-span-4 h-1.5 bg-[#CFCFCF]" />
              <div className="col-span-8 h-1.5 bg-[#545454]/60" />
            </div>
            <div className="font-mono text-xs text-muted">
              Studio Specimen · {project.aspectRatio}
            </div>
          </div>
          <figcaption className="mt-3 font-mono text-xs text-muted">
            {project.coverCaption}
          </figcaption>
        </figure>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <section>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
                Problem Context
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink">
                {project.problem}
              </p>
            </section>

            <section className="border-t border-hairline pt-8">
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
                Approach &amp; Implementation
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink">
                {project.solution}
              </p>
            </section>
          </div>

          <aside className="space-y-8 border-t border-hairline pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                Tools &amp; Stack
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <Badge key={tool} variant="neutral">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="border-t border-hairline pt-6">
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                Student Contributors
              </h3>
              <ul className="mt-3 space-y-2.5">
                {project.contributors.map((person) => (
                  <li key={person.name} className="text-sm">
                    <span className="font-medium text-ink">{person.name}</span>
                    <span className="block font-mono text-xs text-muted">
                      {person.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {project.links.length > 0 && (
              <div className="border-t border-hairline pt-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                  Resources
                </h3>
                <ul className="mt-3 space-y-2">
                  {project.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}
