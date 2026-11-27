import type { CreateMemberInput, Member, MemberFilter } from '@ihub/shared';
import { apiRequest } from './apiClient';

export const membersService = {
  list(filter?: MemberFilter): Promise<Member[]> {
    const params = new URLSearchParams();
    if (filter?.committee) params.set('committee', filter.committee);

    const qs = params.toString();
    return apiRequest<Member[]>(`/members${qs ? `?${qs}` : ''}`);
  },

  create(payload: CreateMemberInput): Promise<Member> {
    return apiRequest<Member>('/members', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  remove(id: string): Promise<{ deleted: boolean }> {
    return apiRequest<{ deleted: boolean }>(`/members/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
  },
};
