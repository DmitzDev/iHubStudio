export type AnnouncementCategory =
  | 'General'
  | 'Recruitment'
  | 'Workshop'
  | 'Release';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  category: AnnouncementCategory;
  publishedAt: string;
  pinned?: boolean;
}
