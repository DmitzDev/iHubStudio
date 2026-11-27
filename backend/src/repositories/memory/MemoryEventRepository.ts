import crypto from 'node:crypto';
import type {
  CreateEventInput,
  CreateEventRsvpDto,
  EventFilter,
  EventRsvpConfirmation,
  StudioEvent,
  UpdateEventInput,
} from '@ihub/shared';
import { SEED_EVENTS } from '../../data/seed.js';
import type {
  EventRsvpRecord,
  IEventRepository,
} from '../interfaces/IEventRepository.js';

export class MemoryEventRepository implements IEventRepository {
  private readonly events: StudioEvent[] = SEED_EVENTS.map((evt) => ({ ...evt }));
  private readonly rsvps: EventRsvpRecord[] = [];

  async findAll(filter?: EventFilter): Promise<StudioEvent[]> {
    let result = this.events.map((evt) => ({ ...evt }));

    if (filter?.upcoming !== undefined) {
      result = result.filter((e) => e.isUpcoming === filter.upcoming);
    } else if (filter?.past !== undefined) {
      result = result.filter((e) => e.isUpcoming !== filter.past);
    }

    return result;
  }

  async findById(id: string): Promise<StudioEvent | null> {
    const found = this.events.find((e) => e.id === id);
    return found ? { ...found } : null;
  }

  async create(input: CreateEventInput): Promise<StudioEvent> {
    const created: StudioEvent = {
      ...input,
      id: `evt-${crypto.randomBytes(3).toString('hex')}`,
      attendeeCount: 0,
    };
    this.events.unshift(created);
    return { ...created };
  }

  async update(id: string, input: UpdateEventInput): Promise<StudioEvent | null> {
    const idx = this.events.findIndex((e) => e.id === id);
    if (idx === -1) return null;
    this.events[idx] = { ...this.events[idx], ...input };
    return { ...this.events[idx] };
  }

  async delete(id: string): Promise<boolean> {
    const idx = this.events.findIndex((e) => e.id === id);
    if (idx === -1) return false;
    this.events.splice(idx, 1);
    return true;
  }

  async hasRsvp(eventId: string, email: string): Promise<boolean> {
    const normalized = email.trim().toLowerCase();
    return this.rsvps.some(
      (r) => r.eventId === eventId && r.email.toLowerCase() === normalized
    );
  }

  async getRsvps(eventId: string): Promise<EventRsvpRecord[]> {
    return this.rsvps
      .filter((r) => r.eventId === eventId)
      .map((r) => ({ ...r }));
  }

  async addRsvp(
    eventId: string,
    payload: CreateEventRsvpDto
  ): Promise<EventRsvpConfirmation | null> {
    const target = this.events.find((e) => e.id === eventId);
    if (!target) {
      return null;
    }

    const referenceId = `RSVP-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const registeredAt = new Date().toISOString();

    this.rsvps.push({
      ...payload,
      email: payload.email.trim().toLowerCase(),
      referenceId,
      eventId,
      registeredAt,
    });

    target.attendeeCount += 1;

    return {
      referenceId,
      eventId: target.id,
      eventTitle: target.title,
      attendeeName: payload.name,
      attendeeCount: target.attendeeCount,
      registeredAt,
    };
  }
}
