import { Router } from 'express';
import { updateUserRoleSchema } from '@ihub/shared';
import { listUsers, updateUserRole } from '../controllers/auth.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.use(requireAuth, requireRole('superadmin'));
router.get('/', listUsers);
router.patch('/:id/role', validateBody(updateUserRoleSchema), updateUserRole);

export default router;
