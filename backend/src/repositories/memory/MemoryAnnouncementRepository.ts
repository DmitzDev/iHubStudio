import crypto from 'node:crypto';
import type { Announcement, CreateAnnouncementInput } from '@ihub/shared';
import { SEED_ANNOUNCEMENTS } from '../../data/seed.js';
import type { IAnnouncementRepository } from '../interfaces/IAnnouncementRepository.js';

export class MemoryAnnouncementRepository implements IAnnouncementRepository {
  private readonly announcements: Announcement[] = [...SEED_ANNOUNCEMENTS];

  async findAll(): Promise<Announcement[]> {
    return [...this.announcements].sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt)
    );
  }

  async create(input: CreateAnnouncementInput): Promise<Announcement> {
    const created: Announcement = {
      ...input,
      id: `ann-${crypto.randomBytes(3).toString('hex')}`,
      publishedAt: new Date().toISOString().slice(0, 10),
    };
    this.announcements.unshift(created);
    return created;
  }

  async delete(id: string): Promise<boolean> {
    const idx = this.announcements.findIndex((a) => a.id === id);
    if (idx === -1) return false;
    this.announcements.splice(idx, 1);
    return true;
  }
}
