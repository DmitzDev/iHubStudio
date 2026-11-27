import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import { AppError } from './errorHandler.js';

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join('.') || undefined,
        message: issue.message,
        code: issue.code,
      }));

      next(
        new AppError(
          400,
          'VALIDATION_ERROR',
          'Request validation failed. Check the submitted fields.',
          details
        )
      );
      return;
    }

    req.body = result.data;
    next();
  };
}
