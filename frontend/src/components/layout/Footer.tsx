import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/site';
import { Container } from './Container';

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-paper py-6">
      <Container>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <img
              src={SITE_CONFIG.brandIcon}
              alt="iHub Studio icon"
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="font-display text-sm font-semibold text-ink">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden font-mono text-xs text-muted md:inline">
              · {SITE_CONFIG.semester}
            </span>
          </div>

          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted"
            aria-label="Footer navigation"
          >
            <Link to="/projects" className="hover:text-ink">
              Projects
            </Link>
            <Link to="/gallery" className="hover:text-ink">
              Gallery
            </Link>
            <Link to="/events" className="hover:text-ink">
              Events
            </Link>
            <Link to="/about" className="hover:text-ink">
              About
            </Link>
            <Link to="/login" className="hover:text-ink">
              Portal
            </Link>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="hover:text-ink"
            >
              {SITE_CONFIG.email}
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
