import crypto from 'node:crypto';
import type { CreateApplicationDto, MembershipApplication } from '@ihub/shared';
import type { IApplicationRepository } from '../interfaces/IApplicationRepository.js';

export class MemoryApplicationRepository implements IApplicationRepository {
  private readonly applications: MembershipApplication[] = [];

  async create(payload: CreateApplicationDto): Promise<MembershipApplication> {
    const id = crypto.randomUUID();
    const referenceId = `IHUB-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const application: MembershipApplication = {
      ...payload,
      id,
      referenceId,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };

    this.applications.push(application);
    return application;
  }

  async findAll(): Promise<MembershipApplication[]> {
    return [...this.applications];
  }
}
