import { Router } from 'express';
import announcementRoutes from './announcement.routes.js';
import applicationRoutes from './application.routes.js';
import authRoutes from './auth.routes.js';
import eventRoutes from './event.routes.js';
import healthRoutes from './health.routes.js';
import memberRoutes from './member.routes.js';
import projectRoutes from './project.routes.js';
import userRoutes from './user.routes.js';

const apiRouter = Router();

apiRouter.use('/health', healthRoutes);
apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', userRoutes);
apiRouter.use('/projects', projectRoutes);
apiRouter.use('/events', eventRoutes);
apiRouter.use('/members', memberRoutes);
apiRouter.use('/announcements', announcementRoutes);
apiRouter.use('/applications', applicationRoutes);

export default apiRouter;
