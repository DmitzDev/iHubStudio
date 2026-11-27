import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  APPLICATION_TRACKS,
  applicationSchema,
  type ApplicationTrack,
  type MembershipApplication,
} from '@ihub/shared';
import { PageHeader } from '../components/layout/PageHeader';
import { Section } from '../components/layout/Section';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ApiClientError } from '../services/apiClient';
import { applicationsService } from '../services/applications.service';

export function JoinPage() {
  useDocumentTitle('Join the Studio');

  const [fullName, setFullName] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [yearAndProgram, setYearAndProgram] = useState('');
  const [primaryTrack, setPrimaryTrack] =
    useState<ApplicationTrack>('Software & Web');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [statement, setStatement] = useState('');

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<MembershipApplication | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setFormError(null);

    const parsed = applicationSchema.safeParse({
      fullName,
      schoolEmail,
      yearAndProgram,
      primaryTrack,
      portfolioUrl,
      statement,
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
      const result = await applicationsService.submit(parsed.data);
      setSubmitted(result);
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
        setFormError('Unable to submit application. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Recruitment"
        title="Join iHub Studio"
        description="Applications are open for the current semester. Tell us what track you want to work in and what you hope to build."
      />

      <Section bordered={false}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-lg font-semibold text-ink">
              Before you apply
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              <li>
                Open to students across all colleges and senior high strands.
              </li>
              <li>
                No polished portfolio required—classwork, sketches, or GitHub repos are welcome.
              </li>
              <li>
                We review applications weekly and send onboarding invites every Monday.
              </li>
            </ul>
          </div>

          <div className="lg:col-span-8">
            {submitted ? (
              <div className="border border-ink bg-surface p-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-6 w-6 shrink-0 text-accent"
                    strokeWidth={1.5}
                  />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-accent">
                      Application Received
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-ink">
                      Thank you, {submitted.fullName}.
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      Your application for the{' '}
                      <span className="font-medium text-ink">
                        {submitted.primaryTrack}
                      </span>{' '}
                      track has been recorded. Keep your reference ID below for follow-ups.
                    </p>
                    <div className="mt-5 inline-block border border-hairline bg-paper px-4 py-2 font-mono text-sm text-ink">
                      Reference ID: {submitted.referenceId}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 border border-hairline bg-surface p-6 sm:p-8"
                noValidate
              >
                {formError && (
                  <div className="border border-red-300 bg-red-50 px-4 py-3 text-xs text-red-800">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Input
                    label="Full Name"
                    name="fullName"
                    placeholder="e.g. Clarisse Tan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    error={fieldErrors.fullName}
                    required
                  />
                  <Input
                    label="School Email"
                    name="schoolEmail"
                    type="email"
                    placeholder="e.g. c.tan@campus.edu"
                    value={schoolEmail}
                    onChange={(e) => setSchoolEmail(e.target.value)}
                    error={fieldErrors.schoolEmail}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Input
                    label="Year Level & Program / Strand"
                    name="yearAndProgram"
                    placeholder="e.g. 2nd Year · BS Information Technology"
                    value={yearAndProgram}
                    onChange={(e) => setYearAndProgram(e.target.value)}
                    error={fieldErrors.yearAndProgram}
                    required
                  />
                  <Select
                    label="Primary Track Interest"
                    name="primaryTrack"
                    value={primaryTrack}
                    onChange={(e) =>
                      setPrimaryTrack(e.target.value as ApplicationTrack)
                    }
                    error={fieldErrors.primaryTrack}
                    options={APPLICATION_TRACKS.map((track) => ({
                      label: track,
                      value: track,
                    }))}
                  />
                </div>

                <Input
                  label="Portfolio / GitHub / Behance URL (Optional)"
                  name="portfolioUrl"
                  type="url"
                  placeholder="https://github.com/username"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  error={fieldErrors.portfolioUrl}
                />

                <Textarea
                  label="What do you want to build or learn with iHub Studio?"
                  name="statement"
                  rows={4}
                  placeholder="Share a campus problem you want to explore, a tool you want to learn, or a project idea."
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  error={fieldErrors.statement}
                  required
                />

                <div className="flex items-center justify-end border-t border-hairline pt-5">
                  <Button type="submit" size="lg" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
