import type { CreateApplicationDto, MembershipApplication } from '@ihub/shared';
import { repositories } from '../repositories/index.js';

export class ApplicationService {
  async submitApplication(
    payload: CreateApplicationDto
  ): Promise<MembershipApplication> {
    return repositories.applications.create(payload);
  }
}

export const applicationService = new ApplicationService();
