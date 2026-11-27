import type { NextFunction, Request, Response } from 'express';
import type {
  ApiSuccessResponse,
  CreateEventInput,
  CreateEventRsvpDto,
  EventFilter,
  EventRsvpConfirmation,
  StudioEvent,
  UpdateEventInput,
} from '@ihub/shared';
import type { EventRsvpRecord } from '../repositories/interfaces/IEventRepository.js';
import { eventService } from '../services/event.service.js';

export async function listEvents(
  req: Request,
  res: Response<ApiSuccessResponse<StudioEvent[]>>,
  next: NextFunction
): Promise<void> {
  try {
    const filter: EventFilter = {};

    if (req.query.upcoming === 'true') {
      filter.upcoming = true;
    } else if (req.query.past === 'true') {
      filter.past = true;
    }

    const events = await eventService.listEvents(filter);

    res.json({
      success: true,
      data: events,
      meta: { total: events.length },
    });
  } catch (err) {
    next(err);
  }
}

export async function createEvent(
  req: Request<unknown, unknown, CreateEventInput>,
  res: Response<ApiSuccessResponse<StudioEvent>>,
  next: NextFunction
): Promise<void> {
  try {
    const created = await eventService.createEvent(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

export async function updateEvent(
  req: Request<{ id: string }, unknown, UpdateEventInput>,
  res: Response<ApiSuccessResponse<StudioEvent>>,
  next: NextFunction
): Promise<void> {
  try {
    const updated = await eventService.updateEvent(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function deleteEvent(
  req: Request<{ id: string }>,
  res: Response<ApiSuccessResponse<{ deleted: boolean }>>,
  next: NextFunction
): Promise<void> {
  try {
    await eventService.deleteEvent(req.params.id);
    res.json({ success: true, data: { deleted: true } });
  } catch (err) {
    next(err);
  }
}

export async function listEventRsvps(
  req: Request<{ id: string }>,
  res: Response<ApiSuccessResponse<EventRsvpRecord[]>>,
  next: NextFunction
): Promise<void> {
  try {
    const rsvps = await eventService.listEventRsvps(req.params.id);
    res.json({ success: true, data: rsvps, meta: { total: rsvps.length } });
  } catch (err) {
    next(err);
  }
}

export async function rsvpEvent(
  req: Request<{ id: string }, unknown, CreateEventRsvpDto>,
  res: Response<ApiSuccessResponse<EventRsvpConfirmation>>,
  next: NextFunction
): Promise<void> {
  try {
    const confirmation = await eventService.rsvpToEvent(req.params.id, req.body);

    res.status(201).json({
      success: true,
      data: confirmation,
    });
  } catch (err) {
    next(err);
  }
}
