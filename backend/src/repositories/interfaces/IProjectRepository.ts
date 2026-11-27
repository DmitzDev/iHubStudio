import type {
  CreateProjectInput,
  Project,
  ProjectFilter,
  UpdateProjectInput,
} from '@ihub/shared';

export interface IProjectRepository {
  findAll(filter?: ProjectFilter): Promise<Project[]>;
  findBySlug(slug: string): Promise<Project | null>;
  create(input: CreateProjectInput): Promise<Project>;
  updateBySlug(slug: string, input: UpdateProjectInput): Promise<Project | null>;
  deleteBySlug(slug: string): Promise<boolean>;
}
