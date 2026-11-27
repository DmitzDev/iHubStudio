import type {
  CreateEventInput,
  CreateEventRsvpDto,
  EventFilter,
  EventRsvpConfirmation,
  StudioEvent,
  UpdateEventInput,
} from '@ihub/shared';

export interface EventRsvpRecord {
  referenceId: string;
  eventId: string;
  name: string;
  email: string;
  yearAndProgram?: string;
  registeredAt: string;
}

export interface IEventRepository {
  findAll(filter?: EventFilter): Promise<StudioEvent[]>;
  findById(id: string): Promise<StudioEvent | null>;
  create(input: CreateEventInput): Promise<StudioEvent>;
  update(id: string, input: UpdateEventInput): Promise<StudioEvent | null>;
  delete(id: string): Promise<boolean>;
  hasRsvp(eventId: string, email: string): Promise<boolean>;
  getRsvps(eventId: string): Promise<EventRsvpRecord[]>;
  addRsvp(eventId: string, payload: CreateEventRsvpDto): Promise<EventRsvpConfirmation | null>;
}
