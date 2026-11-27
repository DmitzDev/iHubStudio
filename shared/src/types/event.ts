export type EventTrack =
  | 'Software & Web'
  | 'Visual & Brand Design'
  | 'Media & Production'
  | 'Community & Events';

export interface StudioEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  track: EventTrack;
  capacity: number;
  attendeeCount: number;
  isUpcoming: boolean;
}

export interface EventFilter {
  upcoming?: boolean;
  past?: boolean;
}

export interface CreateEventRsvpDto {
  name: string;
  email: string;
  yearAndProgram?: string;
}

export interface EventRsvpConfirmation {
  referenceId: string;
  eventId: string;
  eventTitle: string;
  attendeeName: string;
  attendeeCount: number;
  registeredAt: string;
}
