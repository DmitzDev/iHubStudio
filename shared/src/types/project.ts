export type ProjectTrack = 'Engineering' | 'Design' | 'Media' | 'Research';

export type ProjectStatus = 'Active' | 'Completed' | 'Archived';

export interface ProjectLink {
  label: string;
  url: string;
  kind: 'repo' | 'live' | 'case-study' | 'docs';
}

export interface ProjectContributor {
  name: string;
  role: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  track: ProjectTrack;
  status: ProjectStatus;
  semester: string;
  featured: boolean;
  coverCaption: string;
  aspectRatio: '16:9' | '4:3' | '1:1';
  problem: string;
  solution: string;
  tools: string[];
  contributors: ProjectContributor[];
  links: ProjectLink[];
  createdAt: string;
}

export interface ProjectFilter {
  track?: ProjectTrack;
  status?: ProjectStatus;
  featured?: boolean;
  q?: string;
}
