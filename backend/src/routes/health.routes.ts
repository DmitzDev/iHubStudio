import { Router } from 'express';
import type { ApiSuccessResponse, HealthStatus } from '@ihub/shared';

const router = Router();

router.get('/', (_req, res) => {
  const payload: ApiSuccessResponse<HealthStatus> = {
    success: true,
    data: {
      status: 'ok',
      uptime: Math.floor(process.uptime()),
      storageMode: 'in-memory',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    },
  };
  res.json(payload);
});

export default router;
