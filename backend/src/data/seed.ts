import type {
  Announcement,
  Member,
  Project,
  StudioEvent,
} from '@ihub/shared';

export const SEED_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    slug: 'campus-transit-live',
    title: 'Campus Shuttle & Room Finder',
    summary:
      'Lightweight web directory mapping campus buildings, lab availability, and shuttle departure schedules.',
    track: 'Engineering',
    status: 'Active',
    semester: 'AY 2026–2027 · 1st Sem',
    featured: true,
    coverCaption: 'Fig 01. Interactive campus building index and live room schedule view.',
    aspectRatio: '16:9',
    problem:
      'First-year students and visiting speakers frequently struggle to locate annex classrooms and check whether open computer labs are occupied between periods.',
    solution:
      'Built a fast, mobile-first directory backed by a static timetable JSON index and crowdsourced room status check-ins maintained by student volunteers.',
    tools: ['TypeScript', 'React', 'Tailwind CSS', 'Leaflet', 'Node.js'],
    contributors: [
      { name: 'Marco Villanueva', role: 'Lead Developer' },
      { name: 'Clarisse Tan', role: 'UI & Map Design' },
      { name: 'Jeric Bautista', role: 'Data Curation' },
    ],
    links: [
      { label: 'GitHub Repository', url: 'https://github.com/ihub-studio/campus-finder', kind: 'repo' },
      { label: 'Live Staging', url: 'https://finder.ihubstudio.org', kind: 'live' },
    ],
    createdAt: '2026-09-14T09:00:00Z',
  },
  {
    id: 'proj-02',
    slug: 'monograph-issue-04',
    title: 'Monograph Issue 04: Campus Spaces',
    summary:
      'A 48-page risograph-inspired print and web publication documenting student workspaces, studios, and libraries.',
    track: 'Design',
    status: 'Completed',
    semester: 'AY 2025–2026 · 2nd Sem',
    featured: true,
    coverCaption: 'Fig 02. Spread layout from Monograph Issue 04 featuring Swiss grid typography.',
    aspectRatio: '16:9',
    problem:
      'Student creative work across engineering, architecture, and media often stays isolated inside individual departments without a shared archive.',
    solution:
      'Produced a bilingual print zine and companion web reader pairing architectural floor diagrams with interviews from twelve student makers.',
    tools: ['Figma', 'InDesign', 'Astro', 'Editorial Grid'],
    contributors: [
      { name: 'Bea Santos', role: 'Editorial Director' },
      { name: 'Rafael Cruz', role: 'Grid & Layout' },
      { name: 'Nina Pascual', role: 'Photography' },
    ],
    links: [
      { label: 'Digital Reader', url: 'https://monograph.ihubstudio.org', kind: 'live' },
      { label: 'Design Case Study', url: 'https://ihubstudio.org/archive/monograph-04', kind: 'case-study' },
    ],
    createdAt: '2026-04-20T10:30:00Z',
  },
  {
    id: 'proj-03',
    slug: 'open-lecture-archive',
    title: 'Open Lecture & Workshop Archive',
    summary:
      'Multi-camera recording pipeline and searchable transcript index for student-led technical talks.',
    track: 'Media',
    status: 'Active',
    semester: 'AY 2026–2027 · 1st Sem',
    featured: true,
    coverCaption: 'Fig 03. Studio capture rig and automated chapter-indexed video player.',
    aspectRatio: '16:9',
    problem:
      'Valuable brown-bag workshops on Git, Figma, and embedded systems were only accessible to students who could attend in person.',
    solution:
      'Standardized a portable two-camera + HDMI capture kit and built a clean archive page with timestamped slide chapters and downloadable handouts.',
    tools: ['OBS Studio', 'FFmpeg', 'DaVinci Resolve', 'TypeScript'],
    contributors: [
      { name: 'Kian Mendoza', role: 'Production Lead' },
      { name: 'Hannah Lim', role: 'Audio & Post' },
      { name: 'Marco Villanueva', role: 'Web Player' },
    ],
    links: [
      { label: 'Watch Archive', url: 'https://archive.ihubstudio.org', kind: 'live' },
      { label: 'Production Checklist', url: 'https://github.com/ihub-studio/capture-kit', kind: 'docs' },
    ],
    createdAt: '2026-10-02T14:00:00Z',
  },
  {
    id: 'proj-04',
    slug: 'org-design-system',
    title: 'iHub Editorial Design System',
    summary:
      'Shared typography tokens, poster templates, and React UI primitives used across all studio publications.',
    track: 'Design',
    status: 'Active',
    semester: 'AY 2026–2027 · 1st Sem',
    featured: false,
    coverCaption: 'Fig 04. Type scale, hairline grid rules, and component specimen sheet.',
    aspectRatio: '4:3',
    problem:
      'Every semester, new project teams spent weeks recreating event posters, slide decks, and web components from scratch.',
    solution:
      'Documented a unified Swiss-grid design language in Figma and Tailwind CSS with ready-to-use poster grids and accessible React primitives.',
    tools: ['Figma', 'Tailwind CSS', 'React', 'Storybook'],
    contributors: [
      { name: 'Clarisse Tan', role: 'Systems Designer' },
      { name: 'Bea Santos', role: 'Typography' },
    ],
    links: [
      { label: 'Token Repository', url: 'https://github.com/ihub-studio/design-tokens', kind: 'repo' },
    ],
    createdAt: '2026-08-25T08:00:00Z',
  },
  {
    id: 'proj-05',
    slug: 'thesis-formatting-cli',
    title: 'Capstone & Thesis Template Kit',
    summary:
      'LaTeX and Typst document templates pre-configured for department margin, citation, and figure standards.',
    track: 'Research',
    status: 'Completed',
    semester: 'AY 2025–2026 · 2nd Sem',
    featured: false,
    coverCaption: 'Fig 05. Compiled Typst specimen showing automated bibliography and table styles.',
    aspectRatio: '4:3',
    problem:
      'Senior students lose days fighting word-processor page breaks and inconsistent margin rules before thesis defense deadlines.',
    solution:
      'Created clean Typst and LaTeX starter templates with GitHub Actions PDF builds and a concise 10-minute quickstart guide.',
    tools: ['Typst', 'LaTeX', 'GitHub Actions', 'Markdown'],
    contributors: [
      { name: 'Jeric Bautista', role: 'Maintainer' },
      { name: 'Rafael Cruz', role: 'Layout QA' },
    ],
    links: [
      { label: 'Template Repo', url: 'https://github.com/ihub-studio/thesis-kit', kind: 'repo' },
    ],
    createdAt: '2026-03-11T11:15:00Z',
  },
  {
    id: 'proj-06',
    slug: 'campus-radio-stream',
    title: 'Late Night Study Stream',
    summary:
      'Curated student-produced ambient mixes and campus announcements broadcast during exam weeks.',
    track: 'Media',
    status: 'Archived',
    semester: 'AY 2025–2026 · 1st Sem',
    featured: false,
    coverCaption: 'Fig 06. Minimalist web audio player and weekly tracklist log.',
    aspectRatio: '1:1',
    problem:
      'Students studying late in campus halls wanted an ad-free, student-curated audio stream with gentle hourly break reminders.',
    solution:
      'Paired an Icecast audio stream with a lightweight web player displaying track credits from student musicians and sound designers.',
    tools: ['Icecast', 'Web Audio API', 'Ableton Live', 'React'],
    contributors: [
      { name: 'Hannah Lim', role: 'Audio Curation' },
      { name: 'Kian Mendoza', role: 'Stream Ops' },
    ],
    links: [
      { label: 'Archived Tracklists', url: 'https://github.com/ihub-studio/study-stream', kind: 'repo' },
    ],
    createdAt: '2025-11-18T19:00:00Z',
  },
];

export const SEED_EVENTS: StudioEvent[] = [
  {
    id: 'evt-01',
    title: 'Studio Open House & Project Pitch Night',
    description:
      'Meet the current leads, tour our weekly work sessions, and pitch a campus problem or media idea for the semester.',
    date: '2026-12-04',
    time: '16:00 – 18:00',
    venue: 'Innovation Hall, Room 304',
    track: 'Community & Events',
    capacity: 45,
    attendeeCount: 28,
    isUpcoming: true,
  },
  {
    id: 'evt-02',
    title: 'TypeScript & Clean APIs Workshop',
    description:
      'Hands-on session covering Zod request validation, layered Express architecture, and building type-safe React clients.',
    date: '2026-12-11',
    time: '14:00 – 16:30',
    venue: 'CS Lab B, 2nd Floor',
    track: 'Software & Web',
    capacity: 30,
    attendeeCount: 19,
    isUpcoming: true,
  },
  {
    id: 'evt-03',
    title: 'Editorial Grids & Poster Critique',
    description:
      'Bring a work-in-progress event poster or UI layout for a structured 90-minute peer critique on hierarchy and spacing.',
    date: '2026-12-18',
    time: '15:00 – 16:30',
    venue: 'Design Studio 102',
    track: 'Visual & Brand Design',
    capacity: 25,
    attendeeCount: 14,
    isUpcoming: true,
  },
  {
    id: 'evt-04',
    title: 'Field Audio & Documentary Framing',
    description:
      'Practical outdoor recording walk and interview framing lab using the studio’s compact mirrorless and lavalier kits.',
    date: '2026-10-16',
    time: '13:30 – 16:00',
    venue: 'Media Lab & Quadrangle',
    track: 'Media & Production',
    capacity: 20,
    attendeeCount: 20,
    isUpcoming: false,
  },
  {
    id: 'evt-05',
    title: 'Git Workflows for Student Teams',
    description:
      'Branching, pull request reviews, and resolving merge conflicts cleanly before hackathon and capstone deadlines.',
    date: '2026-09-25',
    time: '15:00 – 17:00',
    venue: 'CS Lab A, 2nd Floor',
    track: 'Software & Web',
    capacity: 35,
    attendeeCount: 33,
    isUpcoming: false,
  },
];

export const SEED_MEMBERS: Member[] = [
  {
    id: 'mem-01',
    name: 'Bea Santos',
    role: 'Studio Director',
    committee: 'Executive',
    program: 'BS Information Technology',
    yearLevel: '4th Year',
    bio: 'Coordinates cross-track projects, faculty partnerships, and the semesterly Monograph publication.',
    isOfficer: true,
    links: { portfolio: 'https://beasantos.design' },
  },
  {
    id: 'mem-02',
    name: 'Marco Villanueva',
    role: 'Engineering Lead',
    committee: 'Engineering',
    program: 'BS Computer Science',
    yearLevel: '3rd Year',
    bio: 'Maintains the studio’s open-source repositories, web infrastructure, and weekly code review sessions.',
    isOfficer: true,
    links: { github: 'https://github.com/marcovillanueva' },
  },
  {
    id: 'mem-03',
    name: 'Clarisse Tan',
    role: 'Design Systems Lead',
    committee: 'Design',
    program: 'BFA Visual Communication',
    yearLevel: '3rd Year',
    bio: 'Focuses on editorial typography, accessible UI systems, and print-to-web art direction.',
    isOfficer: true,
    links: { portfolio: 'https://clarissetan.studio' },
  },
  {
    id: 'mem-04',
    name: 'Kian Mendoza',
    role: 'Media & Production Lead',
    committee: 'Media',
    program: 'BA Communication',
    yearLevel: '4th Year',
    bio: 'Leads documentary shoots, lecture capture operations, and post-production workflows.',
    isOfficer: true,
  },
  {
    id: 'mem-05',
    name: 'Jeric Bautista',
    role: 'Backend & Tooling Member',
    committee: 'Engineering',
    program: 'BS Computer Science',
    yearLevel: '2nd Year',
    bio: 'Works on campus data tooling, Typst templates, and developer documentation.',
    isOfficer: false,
    links: { github: 'https://github.com/jericb' },
  },
  {
    id: 'mem-06',
    name: 'Rafael Cruz',
    role: 'Editorial Designer',
    committee: 'Design',
    program: 'BS Architecture',
    yearLevel: '3rd Year',
    bio: 'Interested in Swiss-grid layouts, architectural diagramming, and wayfinding.',
    isOfficer: false,
  },
  {
    id: 'mem-07',
    name: 'Hannah Lim',
    role: 'Sound & Video Editor',
    committee: 'Media',
    program: 'BA Multimedia Arts',
    yearLevel: '2nd Year',
    bio: 'Handles field audio mixing, color grading, and studio stream programming.',
    isOfficer: false,
  },
  {
    id: 'mem-08',
    name: 'Nina Pascual',
    role: 'Community & Operations',
    committee: 'Executive',
    program: 'BS Information Systems',
    yearLevel: '2nd Year',
    bio: 'Organizes studio workshops, room bookings, and new-member onboarding.',
    isOfficer: false,
  },
];

export const SEED_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-01',
    title: 'Applications Open for AY 2026–2027 Cohort',
    body: 'We are welcoming new student builders, designers, and media producers across all year levels. Submit your application before December 15.',
    category: 'Recruitment',
    publishedAt: '2026-11-24',
    pinned: true,
  },
  {
    id: 'ann-02',
    title: 'Weekly Studio Hours Moved to Fridays, 3:00 PM',
    body: 'Open work sessions and project critiques now take place every Friday afternoon at Innovation Hall, Room 304.',
    category: 'General',
    publishedAt: '2026-11-18',
  },
  {
    id: 'ann-03',
    title: 'Open Lecture Archive v1.2 Released',
    body: 'Added chapter markers and downloadable slide PDFs for all three October technical workshops.',
    category: 'Release',
    publishedAt: '2026-11-10',
  },
  {
    id: 'ann-04',
    title: 'TypeScript & Clean APIs Workshop Registration Live',
    body: 'Seats are capped at 30 in CS Lab B. RSVP through the Events page to reserve a workstation.',
    category: 'Workshop',
    publishedAt: '2026-11-05',
  },
];
