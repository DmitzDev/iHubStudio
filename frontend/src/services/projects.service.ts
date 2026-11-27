import type {
  CreateProjectInput,
  Project,
  ProjectFilter,
  UpdateProjectInput,
} from '@ihub/shared';
import { apiRequest } from './apiClient';

export const projectsService = {
  list(filter?: ProjectFilter): Promise<Project[]> {
    const params = new URLSearchParams();
    if (filter?.track) params.set('track', filter.track);
    if (filter?.status) params.set('status', filter.status);
    if (filter?.featured !== undefined) {
      params.set('featured', String(filter.featured));
    }
    if (filter?.q) params.set('q', filter.q);

    const qs = params.toString();
    return apiRequest<Project[]>(`/projects${qs ? `?${qs}` : ''}`);
  },

  getBySlug(slug: string): Promise<Project> {
    return apiRequest<Project>(`/projects/${encodeURIComponent(slug)}`);
  },

  create(payload: CreateProjectInput): Promise<Project> {
    return apiRequest<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  update(slug: string, payload: UpdateProjectInput): Promise<Project> {
    return apiRequest<Project>(`/projects/${encodeURIComponent(slug)}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  remove(slug: string): Promise<{ deleted: boolean }> {
    return apiRequest<{ deleted: boolean }>(`/projects/${encodeURIComponent(slug)}`, {
      method: 'DELETE',
    });
  },
};
