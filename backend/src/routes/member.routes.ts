import { Router } from 'express';
import { createMemberSchema } from '@ihub/shared';
import {
  createMember,
  deleteMember,
  listMembers,
} from '../controllers/member.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.get('/', listMembers);
router.post(
  '/',
  requireAuth,
  requireRole('superadmin', 'admin'),
  validateBody(createMemberSchema),
  createMember
);
router.delete(
  '/:id',
  requireAuth,
  requireRole('superadmin', 'admin'),
  deleteMember
);

export default router;
