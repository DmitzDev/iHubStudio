import type { NextFunction, Request, Response } from 'express';
import type {
  ApiSuccessResponse,
  CreateApplicationDto,
  MembershipApplication,
} from '@ihub/shared';
import { applicationService } from '../services/application.service.js';

export async function createApplication(
  req: Request<unknown, unknown, CreateApplicationDto>,
  res: Response<ApiSuccessResponse<MembershipApplication>>,
  next: NextFunction
): Promise<void> {
  try {
    const application = await applicationService.submitApplication(req.body);

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (err) {
    next(err);
  }
}
