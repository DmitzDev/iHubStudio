import crypto from 'node:crypto';
import type { CreateMemberInput, Member, MemberFilter } from '@ihub/shared';
import { SEED_MEMBERS } from '../../data/seed.js';
import type { IMemberRepository } from '../interfaces/IMemberRepository.js';

export class MemoryMemberRepository implements IMemberRepository {
  private readonly members: Member[] = [...SEED_MEMBERS];

  async findAll(filter?: MemberFilter): Promise<Member[]> {
    if (!filter?.committee) {
      return [...this.members];
    }
    return this.members.filter((m) => m.committee === filter.committee);
  }

  async create(input: CreateMemberInput): Promise<Member> {
    const member: Member = {
      ...input,
      id: `mem-${crypto.randomBytes(3).toString('hex')}`,
    };
    this.members.push(member);
    return member;
  }

  async delete(id: string): Promise<boolean> {
    const idx = this.members.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    this.members.splice(idx, 1);
    return true;
  }
}
