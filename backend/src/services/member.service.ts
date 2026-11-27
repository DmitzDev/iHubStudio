import type { CreateMemberInput, Member, MemberFilter } from '@ihub/shared';
import { AppError } from '../middleware/errorHandler.js';
import { repositories } from '../repositories/index.js';

export class MemberService {
  async listMembers(filter?: MemberFilter): Promise<Member[]> {
    return repositories.members.findAll(filter);
  }

  async createMember(input: CreateMemberInput): Promise<Member> {
    return repositories.members.create(input);
  }

  async deleteMember(id: string): Promise<void> {
    const deleted = await repositories.members.delete(id);
    if (!deleted) {
      throw new AppError(404, 'MEMBER_NOT_FOUND', `Member "${id}" was not found.`);
    }
  }
}

export const memberService = new MemberService();
