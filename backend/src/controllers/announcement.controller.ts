import type { NextFunction, Request, Response } from 'express';
import type {
  Announcement,
  ApiSuccessResponse,
  CreateAnnouncementInput,
} from '@ihub/shared';
import { announcementService } from '../services/announcement.service.js';

export async function listAnnouncements(
  _req: Request,
  res: Response<ApiSuccessResponse<Announcement[]>>,
  next: NextFunction
): Promise<void> {
  try {
    const announcements = await announcementService.listAnnouncements();

    res.json({
      success: true,
      data: announcements,
      meta: { total: announcements.length },
    });
  } catch (err) {
    next(err);
  }
}

export async function createAnnouncement(
  req: Request<unknown, unknown, CreateAnnouncementInput>,
  res: Response<ApiSuccessResponse<Announcement>>,
  next: NextFunction
): Promise<void> {
  try {
    const created = await announcementService.createAnnouncement(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

export async function deleteAnnouncement(
  req: Request<{ id: string }>,
  res: Response<ApiSuccessResponse<{ deleted: boolean }>>,
  next: NextFunction
): Promise<void> {
  try {
    await announcementService.deleteAnnouncement(req.params.id);
    res.json({ success: true, data: { deleted: true } });
  } catch (err) {
    next(err);
  }
}
