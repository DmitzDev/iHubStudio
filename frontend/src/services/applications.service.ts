import type { CreateApplicationDto, MembershipApplication } from '@ihub/shared';
import { apiRequest } from './apiClient';

export const applicationsService = {
  submit(payload: CreateApplicationDto): Promise<MembershipApplication> {
    return apiRequest<MembershipApplication>('/applications', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
