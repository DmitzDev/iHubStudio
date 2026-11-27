import type { Announcement, CreateAnnouncementInput } from '@ihub/shared';
import { apiRequest } from './apiClient';

export const announcementsService = {
  list(): Promise<Announcement[]> {
    return apiRequest<Announcement[]>('/announcements');
  },

  create(payload: CreateAnnouncementInput): Promise<Announcement> {
    return apiRequest<Announcement>('/announcements', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  remove(id: string): Promise<{ deleted: boolean }> {
    return apiRequest<{ deleted: boolean }>(`/announcements/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  },
};
