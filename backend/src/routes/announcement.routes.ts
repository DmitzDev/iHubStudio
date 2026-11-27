import { Router } from 'express';
import { createAnnouncementSchema } from '@ihub/shared';
import {
  createAnnouncement,
  deleteAnnouncement,
  listAnnouncements,
} from '../controllers/announcement.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.get('/', listAnnouncements);
router.post(
  '/',
  requireAuth,
  requireRole('superadmin', 'admin', 'officer'),
  validateBody(createAnnouncementSchema),
  createAnnouncement
);
router.delete(
  '/:id',
  requireAuth,
  requireRole('superadmin', 'admin'),
  deleteAnnouncement
);

export default router;
