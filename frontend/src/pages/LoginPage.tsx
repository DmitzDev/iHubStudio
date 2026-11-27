import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { KeyRound, ShieldCheck } from 'lucide-react';
import { loginSchema, registerVisitorSchema } from '@ihub/shared';
import { PageHeader } from '../components/layout/PageHeader';
import { Section } from '../components/layout/Section';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { ApiClientError } from '../services/apiClient';

const ROLE_CAPABILITIES = [
  {
    role: 'Superadmin',
    scope: 'Full system control, user role assignment, and system health.',
  },
  {
    role: 'Admin',
    scope: 'Manage projects, events, announcements, and members directory.',
  },
  {
    role: 'Officer',
    scope: 'Create events, view RSVPs, post announcements, and update projects.',
  },
  {
    role: 'Visitor',
    scope: 'Browse projects, gallery, and events; RSVP to campus sessions.',
  },
];

export function LoginPage() {
  useDocumentTitle('Studio Portal');

  const { user, login, registerVisitor } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setFormError(null);

    if (mode === 'login') {
      const parsed = loginSchema.safeParse({ email, password });
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
        await login(parsed.data);
        navigate('/dashboard');
      } catch (err) {
        setFormError(
          err instanceof ApiClientError ? err.message : 'Unable to sign in.'
        );
      } finally {
        setSubmitting(false);
      }
      return;
    }

    const parsed = registerVisitorSchema.safeParse({ name, email, password });
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
      await registerVisitor(parsed.data);
      navigate('/dashboard');
    } catch (err) {
      setFormError(
        err instanceof ApiClientError ? err.message : 'Unable to create visitor account.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Access Control"
        title="iHub Studio Portal"
        description="Sign in with your assigned studio role (Superadmin, Admin, Officer, or Visitor) or create a Visitor account."
      />

      <Section bordered={false}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="mb-6 flex border-b border-hairline">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setFormError(null);
                  setFieldErrors({});
                }}
                className={`border-b-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  mode === 'login'
                    ? 'border-ink font-medium text-ink'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setFormError(null);
                  setFieldErrors({});
                }}
                className={`border-b-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  mode === 'register'
                    ? 'border-ink font-medium text-ink'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                Visitor Sign Up
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 border border-hairline bg-surface p-6 sm:p-8"
              noValidate
            >
              {formError && (
                <div className="border border-signal/30 bg-signal-subtle px-4 py-3 text-xs text-signal">
                  {formError}
                </div>
              )}

              {mode === 'register' && (
                <Input
                  label="Full Name"
                  name="name"
                  placeholder="e.g. Ana Reyes"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={fieldErrors.name}
                  required
                />
              )}

              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="name@ihubstudio.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldErrors.email}
                required
              />

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={fieldErrors.password}
                required
              />

              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                <KeyRound className="h-4 w-4" strokeWidth={1.5} />
                {submitting
                  ? 'Authenticating...'
                  : mode === 'login'
                    ? 'Sign In to Console'
                    : 'Create Visitor Account'}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-6">
            <div className="border border-hairline bg-surface p-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-ink" strokeWidth={1.5} />
                <h2 className="font-display text-base font-semibold text-ink">
                  Role-Based Access Levels
                </h2>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">
                Accounts are managed by the Studio Superadmin. New visitors may register directly using the Visitor Sign Up tab.
              </p>

              <div className="mt-4 divide-y divide-hairline border-t border-hairline">
                {ROLE_CAPABILITIES.map((item) => (
                  <div key={item.role} className="py-3.5">
                    <Badge variant={item.role === 'Superadmin' ? 'accent' : 'outline'}>
                      {item.role}
                    </Badge>
                    <p className="mt-1.5 text-xs text-muted">{item.scope}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
