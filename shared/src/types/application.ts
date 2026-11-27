export type ApplicationTrack =
  | 'Software & Web'
  | 'Visual & Brand Design'
  | 'Media & Production'
  | 'Community & Events';

export interface CreateApplicationDto {
  fullName: string;
  schoolEmail: string;
  yearAndProgram: string;
  primaryTrack: ApplicationTrack;
  portfolioUrl?: string;
  statement: string;
}

export interface MembershipApplication extends CreateApplicationDto {
  id: string;
  referenceId: string;
  status: 'submitted';
  submittedAt: string;
}
