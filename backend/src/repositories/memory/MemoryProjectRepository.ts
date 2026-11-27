import crypto from 'node:crypto';
import type {
  CreateProjectInput,
  Project,
  ProjectFilter,
  UpdateProjectInput,
} from '@ihub/shared';
import { SEED_PROJECTS } from '../../data/seed.js';
import type { IProjectRepository } from '../interfaces/IProjectRepository.js';

export class MemoryProjectRepository implements IProjectRepository {
  private readonly projects: Project[] = [...SEED_PROJECTS];

  async findAll(filter?: ProjectFilter): Promise<Project[]> {
    let result = [...this.projects];

    if (filter?.track) {
      result = result.filter((p) => p.track === filter.track);
    }

    if (filter?.status) {
      result = result.filter((p) => p.status === filter.status);
    }

    if (filter?.featured !== undefined) {
      result = result.filter((p) => p.featured === filter.featured);
    }

    if (filter?.q) {
      const query = filter.q.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.summary.toLowerCase().includes(query) ||
          p.tools.some((t) => t.toLowerCase().includes(query))
      );
    }

    return result;
  }

  async findBySlug(slug: string): Promise<Project | null> {
    return this.projects.find((p) => p.slug === slug) ?? null;
  }

  async create(input: CreateProjectInput): Promise<Project> {
    const project: Project = {
      ...input,
      id: `proj-${crypto.randomBytes(3).toString('hex')}`,
      contributors: [{ name: 'iHub Studio Team', role: 'Contributors' }],
      links: [],
      createdAt: new Date().toISOString(),
    };
    this.projects.unshift(project);
    return project;
  }

  async updateBySlug(
    slug: string,
    input: UpdateProjectInput
  ): Promise<Project | null> {
    const idx = this.projects.findIndex((p) => p.slug === slug);
    if (idx === -1) return null;
    this.projects[idx] = { ...this.projects[idx], ...input };
    return this.projects[idx];
  }

  async deleteBySlug(slug: string): Promise<boolean> {
    const idx = this.projects.findIndex((p) => p.slug === slug);
    if (idx === -1) return false;
    this.projects.splice(idx, 1);
    return true;
  }
}
