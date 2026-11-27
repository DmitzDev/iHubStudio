import type { Announcement, CreateAnnouncementInput } from '@ihub/shared';
import { AppError } from '../middleware/errorHandler.js';
import { repositories } from '../repositories/index.js';

export class AnnouncementService {
  async listAnnouncements(): Promise<Announcement[]> {
    return repositories.announcements.findAll();
  }

  async createAnnouncement(input: CreateAnnouncementInput): Promise<Announcement> {
    return repositories.announcements.create(input);
  }

  async deleteAnnouncement(id: string): Promise<void> {
    const deleted = await repositories.announcements.delete(id);
    if (!deleted) {
      throw new AppError(404, 'ANNOUNCEMENT_NOT_FOUND', `Announcement "${id}" was not found.`);
    }
  }
}

export const announcementService = new AnnouncementService();
