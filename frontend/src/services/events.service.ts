import type {
  CreateEventInput,
  CreateEventRsvpDto,
  EventFilter,
  EventRsvpConfirmation,
  StudioEvent,
} from '@ihub/shared';
import { apiRequest } from './apiClient';

export interface EventRsvpItem {
  referenceId: string;
  eventId: string;
  name: string;
  email: string;
  yearAndProgram?: string;
  registeredAt: string;
}

export const eventsService = {
  list(filter?: EventFilter): Promise<StudioEvent[]> {
    const params = new URLSearchParams();
    if (filter?.upcoming) params.set('upcoming', 'true');
    if (filter?.past) params.set('past', 'true');

    const qs = params.toString();
    return apiRequest<StudioEvent[]>(`/events${qs ? `?${qs}` : ''}`);
  },

  create(payload: CreateEventInput): Promise<StudioEvent> {
    return apiRequest<StudioEvent>('/events', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  remove(eventId: string): Promise<{ deleted: boolean }> {
    return apiRequest<{ deleted: boolean }>(`/events/${encodeURIComponent(eventId)}`, {
      method: 'DELETE',
    });
  },

  listRsvps(eventId: string): Promise<EventRsvpItem[]> {
    return apiRequest<EventRsvpItem[]>(`/events/${encodeURIComponent(eventId)}/rsvps`);
  },

  rsvp(
    eventId: string,
    payload: CreateEventRsvpDto
  ): Promise<EventRsvpConfirmation> {
    return apiRequest<EventRsvpConfirmation>(
      `/events/${encodeURIComponent(eventId)}/rsvp`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );
  },
};
