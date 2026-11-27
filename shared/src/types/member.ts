export type MemberCommittee = 'Executive' | 'Engineering' | 'Design' | 'Media';

export interface MemberLinks {
  github?: string;
  portfolio?: string;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  committee: MemberCommittee;
  program: string;
  yearLevel: string;
  bio: string;
  isOfficer: boolean;
  links?: MemberLinks;
}

export interface MemberFilter {
  committee?: MemberCommittee;
}
