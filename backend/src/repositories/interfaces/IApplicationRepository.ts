import type { CreateApplicationDto, MembershipApplication } from '@ihub/shared';

export interface IApplicationRepository {
  create(payload: CreateApplicationDto): Promise<MembershipApplication>;
  findAll(): Promise<MembershipApplication[]>;
}
