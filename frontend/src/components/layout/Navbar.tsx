import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { useAuth } from '../../context/AuthContext';
import { Container } from './Container';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 font-display text-base font-semibold tracking-tight text-ink"
          >
            <img
              src={SITE_CONFIG.brandIcon}
              alt="iHub Studio icon"
              className="h-7 w-7 rounded-full object-cover"
            />
            <span>{SITE_CONFIG.name}</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {SITE_CONFIG.navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-sm transition-colors ${
                    isActive
                      ? 'font-semibold text-ink underline decoration-ink decoration-2 underline-offset-8'
                      : 'text-muted hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 border border-[#252525] bg-[#252525] px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:border-[#545454] hover:bg-[#545454]"
                >
                  <span>Console</span>
                  <span className="font-mono text-[10px] opacity-80">
                    ({user.role})
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="border border-hairline px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-ink hover:text-ink"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center border border-[#252525] bg-[#252525] px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:border-[#545454] hover:bg-[#545454]"
              >
                Studio Portal
              </Link>
            )}
          </div>

          <button
            type="button"
            className="border border-hairline p-2 text-ink md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-4 w-4" strokeWidth={1.5} />
            ) : (
              <Menu className="h-4 w-4" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {mobileOpen && (
          <nav
            className="border-t border-hairline py-4 md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-3">
              {SITE_CONFIG.navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `py-1 text-sm ${
                      isActive ? 'font-medium text-accent' : 'text-ink'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 inline-flex items-center justify-center border border-ink bg-ink px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-paper"
                  >
                    Console ({user.role})
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="border border-hairline px-4 py-2 text-xs font-medium text-ink"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 inline-flex items-center justify-center border border-ink bg-ink px-4 py-2.5 text-xs font-medium uppercase tracking-wider text-paper transition-colors hover:border-accent hover:bg-accent"
                >
                  Studio Portal
                </Link>
              )}
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
