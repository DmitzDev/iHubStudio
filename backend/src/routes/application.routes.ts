import { Router } from 'express';
import { applicationSchema } from '@ihub/shared';
import { createApplication } from '../controllers/application.controller.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.post('/', validateBody(applicationSchema), createApplication);

export default router;
