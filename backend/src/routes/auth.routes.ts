import { Router } from 'express';
import { loginSchema, registerVisitorSchema } from '@ihub/shared';
import { login, me, registerVisitor } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validate.js';

const router = Router();

router.post('/login', validateBody(loginSchema), login);
router.post('/register', validateBody(registerVisitorSchema), registerVisitor);
router.get('/me', requireAuth, me);

export default router;
