import type { CreateMemberInput, Member, MemberFilter } from '@ihub/shared';

export interface IMemberRepository {
  findAll(filter?: MemberFilter): Promise<Member[]>;
  create(input: CreateMemberInput): Promise<Member>;
  delete(id: string): Promise<boolean>;
}
