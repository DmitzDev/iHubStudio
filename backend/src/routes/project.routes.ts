import { Router } from 'express';
import { createProjectSchema, updateProjectSchema } from '@ihub/shared';
import {
  createProject,
  deleteProject,
  getProjectBySlug,
  listProjects,
  updateProject,
} from '../controllers/project.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.get('/', listProjects);
router.get('/:slug', getProjectBySlug);
router.post(
  '/',
  requireAuth,
  requireRole('superadmin', 'admin'),
  validateBody(createProjectSchema),
  createProject
);
router.patch(
  '/:slug',
  requireAuth,
  requireRole('superadmin', 'admin', 'officer'),
  validateBody(updateProjectSchema),
  updateProject
);
router.delete(
  '/:slug',
  requireAuth,
  requireRole('superadmin', 'admin'),
  deleteProject
);

export default router;
