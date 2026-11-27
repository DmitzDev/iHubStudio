import type { Request, Response } from 'express';
import type { ApiErrorResponse } from '@ihub/shared';

export function notFoundHandler(
  req: Request,
  res: Response<ApiErrorResponse>
): void {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.originalUrl} was not found.`,
    },
  });
}
