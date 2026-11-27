import type {
  CreateProjectInput,
  Project,
  ProjectFilter,
  UpdateProjectInput,
} from '@ihub/shared';
import { AppError } from '../middleware/errorHandler.js';
import { repositories } from '../repositories/index.js';

export class ProjectService {
  async listProjects(filter?: ProjectFilter): Promise<Project[]> {
    return repositories.projects.findAll(filter);
  }

  async getProjectBySlug(slug: string): Promise<Project> {
    const project = await repositories.projects.findBySlug(slug);
    if (!project) {
      throw new AppError(404, 'PROJECT_NOT_FOUND', `No project found for slug "${slug}".`);
    }
    return project;
  }

  async createProject(input: CreateProjectInput): Promise<Project> {
    const existing = await repositories.projects.findBySlug(input.slug);
    if (existing) {
      throw new AppError(409, 'SLUG_EXISTS', `Project slug "${input.slug}" already exists.`);
    }
    return repositories.projects.create(input);
  }

  async updateProject(slug: string, input: UpdateProjectInput): Promise<Project> {
    const updated = await repositories.projects.updateBySlug(slug, input);
    if (!updated) {
      throw new AppError(404, 'PROJECT_NOT_FOUND', `No project found for slug "${slug}".`);
    }
    return updated;
  }

  async deleteProject(slug: string): Promise<void> {
    const deleted = await repositories.projects.deleteBySlug(slug);
    if (!deleted) {
      throw new AppError(404, 'PROJECT_NOT_FOUND', `No project found for slug "${slug}".`);
    }
  }
}

export const projectService = new ProjectService();
