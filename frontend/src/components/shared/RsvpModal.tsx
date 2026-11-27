import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  rsvpSchema,
  type EventRsvpConfirmation,
  type StudioEvent,
} from '@ihub/shared';
import { ApiClientError } from '../../services/apiClient';
import { eventsService } from '../../services/events.service';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';

interface RsvpModalProps {
  event: StudioEvent | null;
  onClose: () => void;
  onSuccess: (confirmation: EventRsvpConfirmation) => void;
}

export function RsvpModal({ event, onClose, onSuccess }: RsvpModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [yearAndProgram, setYearAndProgram] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] =
    useState<EventRsvpConfirmation | null>(null);

  const handleClose = () => {
    setName('');
    setEmail('');
    setYearAndProgram('');
    setFieldErrors({});
    setFormError(null);
    setConfirmation(null);
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!event) return;

    setFieldErrors({});
    setFormError(null);

    const parsed = rsvpSchema.safeParse({
      name,
      email,
      yearAndProgram,
    });

    if (!parsed.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === 'string' && !nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    try {
      const result = await eventsService.rsvp(event.id, parsed.data);
      setConfirmation(result);
      onSuccess(result);
    } catch (err) {
      if (err instanceof ApiClientError) {
        if (err.details) {
          const nextErrors: Record<string, string> = {};
          for (const detail of err.details) {
            if (detail.field && !nextErrors[detail.field]) {
              nextErrors[detail.field] = detail.message;
            }
          }
          setFieldErrors(nextErrors);
        }
        setFormError(err.message);
      } else {
        setFormError('Unable to submit RSVP. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={Boolean(event)}
      onClose={handleClose}
      title={event?.title ?? ''}
      subtitle={event ? `${event.date} · ${event.venue}` : undefined}
    >
      {confirmation ? (
        <div className="space-y-4">
          <div className="flex items-start gap-3 border border-hairline bg-surface p-4">
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-accent"
              strokeWidth={1.5}
            />
            <div>
              <p className="text-sm font-medium text-ink">
                Seat reserved for {confirmation.attendeeName}.
              </p>
              <p className="mt-1 font-mono text-xs text-muted">
                Reference ID: {confirmation.referenceId}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleClose}>Done</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {formError && (
            <div className="border border-signal/30 bg-signal-subtle px-3.5 py-2.5 text-xs text-signal">
              {formError}
            </div>
          )}

          <Input
            label="Full Name"
            name="name"
            placeholder="e.g. Marco Villanueva"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={fieldErrors.name}
            required
          />

          <Input
            label="School Email"
            name="email"
            type="email"
            placeholder="e.g. m.villanueva@campus.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
            required
          />

          <Input
            label="Year & Program (Optional)"
            name="yearAndProgram"
            placeholder="e.g. 2nd Year · BS Computer Science"
            value={yearAndProgram}
            onChange={(e) => setYearAndProgram(e.target.value)}
            error={fieldErrors.yearAndProgram}
          />

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Confirming...' : 'Confirm Seat'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
