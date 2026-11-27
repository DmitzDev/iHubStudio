import type { Announcement, CreateAnnouncementInput } from '@ihub/shared';

export interface IAnnouncementRepository {
  findAll(): Promise<Announcement[]>;
  create(input: CreateAnnouncementInput): Promise<Announcement>;
  delete(id: string): Promise<boolean>;
}
