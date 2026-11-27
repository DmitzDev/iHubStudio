export interface NavItem {
  label: string;
  to: string;
}

export const SITE_CONFIG = {
  name: 'iHub Studio',
  brandIcon: '/brand/ihub-icon-64.webp',
  brandIconFull: '/brand/ihub-icon.webp',
  tagline: 'Student-led creative technology, digital media, and campus innovation.',
  semester: 'AY 2026–2027 · 1ST SEMESTER',
  sessionSchedule: 'Fridays, 15:00 – 18:00 · Innovation Hall 304',
  email: 'hello@ihubstudio.org',
  navItems: [
    { label: 'Home', to: '/' },
    { label: 'Projects', to: '/projects' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Events', to: '/events' },
    { label: 'About', to: '/about' },
  ] satisfies NavItem[],
  tracks: [
    {
      code: '01',
      name: 'Software & Web',
      description:
        'Campus utilities, open-source web tools, and full-stack TypeScript projects built in small student squads.',
    },
    {
      code: '02',
      name: 'Visual & Brand Design',
      description:
        'Editorial typography, Swiss-grid print zines, design systems, and event identity for student initiatives.',
    },
    {
      code: '03',
      name: 'Media & Production',
      description:
        'Workshop lecture capture, short campus documentaries, photography archives, and field audio production.',
    },
    {
      code: '04',
      name: 'Community & Events',
      description:
        'Weekly open studio sessions, peer critiques, technical brown-bag talks, and semesterly showcases.',
    },
  ],
};
