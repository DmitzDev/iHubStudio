import { Router } from 'express';
import { createEventSchema, rsvpSchema, updateEventSchema } from '@ihub/shared';
import {
  createEvent,
  deleteEvent,
  listEventRsvps,
  listEvents,
  rsvpEvent,
  updateEvent,
} from '../controllers/event.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.get('/', listEvents);
router.post(
  '/',
  requireAuth,
  requireRole('superadmin', 'admin', 'officer'),
  validateBody(createEventSchema),
  createEvent
);
router.patch(
  '/:id',
  requireAuth,
  requireRole('superadmin', 'admin', 'officer'),
  validateBody(updateEventSchema),
  updateEvent
);
router.delete(
  '/:id',
  requireAuth,
  requireRole('superadmin', 'admin'),
  deleteEvent
);
router.get(
  '/:id/rsvps',
  requireAuth,
  requireRole('superadmin', 'admin', 'officer'),
  listEventRsvps
);
router.post('/:id/rsvp', validateBody(rsvpSchema), rsvpEvent);

export default router;
