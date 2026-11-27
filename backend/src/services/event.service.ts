import type {
  CreateEventInput,
  CreateEventRsvpDto,
  EventFilter,
  EventRsvpConfirmation,
  StudioEvent,
  UpdateEventInput,
} from '@ihub/shared';
import { AppError } from '../middleware/errorHandler.js';
import { repositories } from '../repositories/index.js';
import type { EventRsvpRecord } from '../repositories/interfaces/IEventRepository.js';

export class EventService {
  async listEvents(filter?: EventFilter): Promise<StudioEvent[]> {
    return repositories.events.findAll(filter);
  }

  async createEvent(input: CreateEventInput): Promise<StudioEvent> {
    return repositories.events.create(input);
  }

  async updateEvent(id: string, input: UpdateEventInput): Promise<StudioEvent> {
    const updated = await repositories.events.update(id, input);
    if (!updated) {
      throw new AppError(404, 'EVENT_NOT_FOUND', `Event "${id}" was not found.`);
    }
    return updated;
  }

  async deleteEvent(id: string): Promise<void> {
    const deleted = await repositories.events.delete(id);
    if (!deleted) {
      throw new AppError(404, 'EVENT_NOT_FOUND', `Event "${id}" was not found.`);
    }
  }

  async listEventRsvps(eventId: string): Promise<EventRsvpRecord[]> {
    const event = await repositories.events.findById(eventId);
    if (!event) {
      throw new AppError(404, 'EVENT_NOT_FOUND', `Event "${eventId}" was not found.`);
    }
    return repositories.events.getRsvps(eventId);
  }

  async rsvpToEvent(
    eventId: string,
    payload: CreateEventRsvpDto
  ): Promise<EventRsvpConfirmation> {
    const event = await repositories.events.findById(eventId);
    if (!event) {
      throw new AppError(404, 'EVENT_NOT_FOUND', `Event "${eventId}" was not found.`);
    }

    if (!event.isUpcoming) {
      throw new AppError(
        400,
        'EVENT_CLOSED',
        'Registrations are closed for past events.'
      );
    }

    if (event.attendeeCount >= event.capacity) {
      throw new AppError(
        409,
        'EVENT_FULL',
        'This session has reached its room capacity.'
      );
    }

    const alreadyRegistered = await repositories.events.hasRsvp(eventId, payload.email);
    if (alreadyRegistered) {
      throw new AppError(
        409,
        'DUPLICATE_RSVP',
        'This email address is already registered for this event.'
      );
    }

    const confirmation = await repositories.events.addRsvp(eventId, payload);
    if (!confirmation) {
      throw new AppError(404, 'EVENT_NOT_FOUND', `Event "${eventId}" was not found.`);
    }

    return confirmation;
  }
}

export const eventService = new EventService();
