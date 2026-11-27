import { useState, type FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LogOut, Plus, Trash2, Users } from 'lucide-react';
import {
  USER_ROLES,
  type AnnouncementCategory,
  type EventTrack,
  type MemberCommittee,
  type ProjectTrack,
  type UserRole,
} from '@ihub/shared';
import { PageHeader } from '../components/layout/PageHeader';
import { Section } from '../components/layout/Section';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFetch } from '../hooks/useFetch';
import { announcementsService } from '../services/announcements.service';
import { ApiClientError } from '../services/apiClient';
import { authService } from '../services/auth.service';
import { eventsService, type EventRsvpItem } from '../services/events.service';
import { membersService } from '../services/members.service';
import { projectsService } from '../services/projects.service';

type DashboardTab =
  | 'overview'
  | 'users'
  | 'projects'
  | 'events'
  | 'announcements'
  | 'members';

export function DashboardPage() {
  useDocumentTitle('Studio Console');

  const { user, loading, logout } = useAuth();
  const [tab, setTab] = useState<DashboardTab>('overview');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isSuperadmin = user?.role === 'superadmin';
  const isAdmin = user?.role === 'admin' || isSuperadmin;
  const isOfficer = user?.role === 'officer' || isAdmin;

  const projects = useFetch(() => projectsService.list(), []);
  const events = useFetch(() => eventsService.list(), []);
  const announcements = useFetch(() => announcementsService.list(), []);
  const members = useFetch(() => membersService.list(), []);
  const users = useFetch(
    () => (isSuperadmin ? authService.listUsers() : Promise.resolve([])),
    [isSuperadmin]
  );
  const health = useFetch(
    () => (isSuperadmin ? authService.getHealth() : Promise.resolve(null)),
    [isSuperadmin]
  );

  // Project create form state
  const [projTitle, setProjTitle] = useState('');
  const [projSlug, setProjSlug] = useState('');
  const [projSummary, setProjSummary] = useState('');
  const [projTrack, setProjTrack] = useState<ProjectTrack>('Engineering');
  const [projSemester, setProjSemester] = useState('AY 2026–2027 · 1st Sem');

  // Event create form state
  const [evtTitle, setEvtTitle] = useState('');
  const [evtDate, setEvtDate] = useState('2026-12-20');
  const [evtTime, setEvtTime] = useState('15:00 – 17:00');
  const [evtVenue, setEvtVenue] = useState('Innovation Hall 304');
  const [evtTrack, setEvtTrack] = useState<EventTrack>('Software & Web');
  const [evtCapacity, setEvtCapacity] = useState('30');
  const [evtDescription, setEvtDescription] = useState('');
  const [rsvpEventId, setRsvpEventId] = useState<string | null>(null);
  const [rsvpList, setRsvpList] = useState<EventRsvpItem[]>([]);

  // Announcement create form state
  const [annTitle, setAnnTitle] = useState('');
  const [annCategory, setAnnCategory] = useState<AnnouncementCategory>('General');
  const [annBody, setAnnBody] = useState('');

  // Member create form state
  const [memName, setMemName] = useState('');
  const [memRole, setMemRole] = useState('');
  const [memCommittee, setMemCommittee] = useState<MemberCommittee>('Engineering');
  const [memProgram, setMemProgram] = useState('BS Computer Science');
  const [memYear, setMemYear] = useState('2nd Year');
  const [memBio, setMemBio] = useState('');

  if (loading) {
    return (
      <Section bordered={false}>
        <p className="font-mono text-xs text-muted">Loading studio console...</p>
      </Section>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const clearStatus = () => {
    setFeedback(null);
    setErrorMsg(null);
  };

  const handleRoleChange = async (userId: string, role: UserRole) => {
    clearStatus();
    try {
      const updated = await authService.updateUserRole(userId, role);
      setFeedback(`Updated ${updated.name} to role "${updated.role}".`);
      users.refetch();
    } catch (err) {
      setErrorMsg(err instanceof ApiClientError ? err.message : 'Role update failed.');
    }
  };

  const handleCreateProject = async (e: FormEvent) => {
    e.preventDefault();
    clearStatus();
    try {
      await projectsService.create({
        title: projTitle,
        slug: projSlug,
        summary: projSummary,
        track: projTrack,
        status: 'Active',
        semester: projSemester,
        featured: true,
        coverCaption: `Studio release: ${projTitle}`,
        aspectRatio: '16:9',
        problem: projSummary,
        solution: projSummary,
        tools: ['TypeScript', 'React'],
      });
      setProjTitle('');
      setProjSlug('');
      setProjSummary('');
      setFeedback('Project created.');
      projects.refetch();
    } catch (err) {
      setErrorMsg(err instanceof ApiClientError ? err.message : 'Unable to create project.');
    }
  };

  const handleDeleteProject = async (slug: string) => {
    clearStatus();
    try {
      await projectsService.remove(slug);
      setFeedback(`Removed project "${slug}".`);
      projects.refetch();
    } catch (err) {
      setErrorMsg(err instanceof ApiClientError ? err.message : 'Unable to delete project.');
    }
  };

  const handleCreateEvent = async (e: FormEvent) => {
    e.preventDefault();
    clearStatus();
    try {
      await eventsService.create({
        title: evtTitle,
        date: evtDate,
        time: evtTime,
        venue: evtVenue,
        track: evtTrack,
        capacity: Number(evtCapacity) || 30,
        description: evtDescription,
        isUpcoming: true,
      });
      setEvtTitle('');
      setEvtDescription('');
      setFeedback('Event created.');
      events.refetch();
    } catch (err) {
      setErrorMsg(err instanceof ApiClientError ? err.message : 'Unable to create event.');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    clearStatus();
    try {
      await eventsService.remove(id);
      setFeedback('Event removed.');
      events.refetch();
    } catch (err) {
      setErrorMsg(err instanceof ApiClientError ? err.message : 'Unable to delete event.');
    }
  };

  const handleViewRsvps = async (eventId: string) => {
    clearStatus();
    try {
      const list = await eventsService.listRsvps(eventId);
      setRsvpEventId(eventId);
      setRsvpList(list);
    } catch (err) {
      setErrorMsg(err instanceof ApiClientError ? err.message : 'Unable to load RSVPs.');
    }
  };

  const handleCreateAnnouncement = async (e: FormEvent) => {
    e.preventDefault();
    clearStatus();
    try {
      await announcementsService.create({
        title: annTitle,
        category: annCategory,
        body: annBody,
        pinned: false,
      });
      setAnnTitle('');
      setAnnBody('');
      setFeedback('Announcement published.');
      announcements.refetch();
    } catch (err) {
      setErrorMsg(err instanceof ApiClientError ? err.message : 'Unable to publish announcement.');
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    clearStatus();
    try {
      await announcementsService.remove(id);
      setFeedback('Announcement removed.');
      announcements.refetch();
    } catch (err) {
      setErrorMsg(err instanceof ApiClientError ? err.message : 'Unable to delete announcement.');
    }
  };

  const handleCreateMember = async (e: FormEvent) => {
    e.preventDefault();
    clearStatus();
    try {
      await membersService.create({
        name: memName,
        role: memRole,
        committee: memCommittee,
        program: memProgram,
        yearLevel: memYear,
        bio: memBio,
        isOfficer: memCommittee === 'Executive',
      });
      setMemName('');
      setMemRole('');
      setMemBio('');
      setFeedback('Member added to directory.');
      members.refetch();
    } catch (err) {
      setErrorMsg(err instanceof ApiClientError ? err.message : 'Unable to add member.');
    }
  };

  const handleDeleteMember = async (id: string) => {
    clearStatus();
    try {
      await membersService.remove(id);
      setFeedback('Member removed from directory.');
      members.refetch();
    } catch (err) {
      setErrorMsg(err instanceof ApiClientError ? err.message : 'Unable to remove member.');
    }
  };

  const availableTabs: Array<{ id: DashboardTab; label: string }> = [
    { id: 'overview', label: 'Overview' },
    ...(isSuperadmin ? [{ id: 'users' as const, label: 'Users & Roles' }] : []),
    ...(isOfficer ? [{ id: 'projects' as const, label: 'Projects' }] : []),
    ...(isOfficer ? [{ id: 'events' as const, label: 'Events & RSVPs' }] : []),
    ...(isOfficer ? [{ id: 'announcements' as const, label: 'Announcements' }] : []),
    ...(isAdmin ? [{ id: 'members' as const, label: 'Members' }] : []),
  ];

  return (
    <>
      <PageHeader
        eyebrow={`Signed in as ${user.role.toUpperCase()}`}
        title={`Welcome, ${user.name}`}
        description={`Account: ${user.email}`}
        aside={
          <Button variant="secondary" onClick={logout}>
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
            Sign Out
          </Button>
        }
      />

      <Section bordered={false}>
        <div
          className="flex flex-wrap gap-2 border-b border-hairline pb-5"
          role="tablist"
        >
          {availableTabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => {
                setTab(item.id);
                clearStatus();
              }}
              className={`border px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                tab === item.id
                  ? 'border-ink bg-ink text-paper'
                  : 'border-hairline bg-surface text-muted hover:border-ink hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {feedback && (
          <div className="mt-6 flex items-center justify-between border border-accent/30 bg-accent-subtle px-4 py-3 text-xs text-accent">
            <span>{feedback}</span>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="font-mono text-[11px] uppercase hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}
        {errorMsg && (
          <div className="mt-6 flex items-center justify-between border border-signal/30 bg-signal-subtle px-4 py-3 text-xs text-signal">
            <span>{errorMsg}</span>
            <button
              type="button"
              onClick={() => setErrorMsg(null)}
              className="font-mono text-[11px] uppercase hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {tab === 'overview' && (
          <div className="mt-8 space-y-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="border border-hairline bg-surface p-5">
                <p className="font-mono text-xs uppercase text-muted">Active Role</p>
                <p className="mt-2 font-display text-2xl font-semibold uppercase text-accent">
                  {user.role}
                </p>
              </div>
              <div className="border border-hairline bg-surface p-5">
                <p className="font-mono text-xs uppercase text-muted">Projects</p>
                <p className="mt-2 font-display text-2xl font-semibold text-ink">
                  {projects.data?.length ?? 0}
                </p>
              </div>
              <div className="border border-hairline bg-surface p-5">
                <p className="font-mono text-xs uppercase text-muted">Events</p>
                <p className="mt-2 font-display text-2xl font-semibold text-ink">
                  {events.data?.length ?? 0}
                </p>
              </div>
              <div className="border border-hairline bg-surface p-5">
                <p className="font-mono text-xs uppercase text-muted">Members</p>
                <p className="mt-2 font-display text-2xl font-semibold text-ink">
                  {members.data?.length ?? 0}
                </p>
              </div>
            </div>

            {user.role === 'visitor' && (
              <div className="border border-hairline bg-surface p-6">
                <h2 className="font-display text-lg font-semibold text-ink">
                  Visitor Access
                </h2>
                <p className="mt-2 text-sm text-muted">
                  You have read-only access to browse studio releases, view the gallery, and RSVP to upcoming campus workshops.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to="/projects"
                    className="border border-[#252525] bg-[#252525] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-[#545454] hover:bg-[#545454]"
                  >
                    Browse Projects
                  </Link>
                  <Link
                    to="/events"
                    className="border border-hairline px-4 py-2 text-xs font-medium text-ink hover:border-ink"
                  >
                    View Events
                  </Link>
                </div>
              </div>
            )}

            {isSuperadmin && health.data && (
              <div className="border border-hairline bg-surface p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-accent">
                  Superadmin System Health
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-3">
                  <div>
                    <span className="text-muted">Status:</span>{' '}
                    <span className="text-ink">{health.data.status}</span>
                  </div>
                  <div>
                    <span className="text-muted">Storage Mode:</span>{' '}
                    <span className="text-ink">{health.data.storageMode}</span>
                  </div>
                  <div>
                    <span className="text-muted">Uptime:</span>{' '}
                    <span className="text-ink">{health.data.uptime}s</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'users' && isSuperadmin && (
          <div className="mt-8 border border-hairline bg-surface">
            <div className="flex items-center gap-2 border-b border-hairline px-5 py-4">
              <Users className="h-4 w-4 text-accent" strokeWidth={1.5} />
              <h2 className="font-display text-base font-semibold text-ink">
                System Users &amp; Role Assignment
              </h2>
            </div>
            <div className="divide-y divide-hairline">
              {users.data?.map((acct) => (
                <div
                  key={acct.id}
                  className="flex flex-col justify-between gap-4 px-5 py-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{acct.name}</p>
                    <p className="font-mono text-xs text-muted">{acct.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={acct.role === 'superadmin' ? 'accent' : 'outline'}>
                      {acct.role}
                    </Badge>
                    <select
                      aria-label={`Change role for ${acct.name}`}
                      value={acct.role}
                      onChange={(e) =>
                        handleRoleChange(acct.id, e.target.value as UserRole)
                      }
                      className="border border-hairline bg-paper px-3 py-1.5 font-mono text-xs text-ink focus:border-accent focus:outline-none"
                    >
                      {USER_ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'projects' && isOfficer && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {isAdmin && (
              <form
                onSubmit={handleCreateProject}
                className="space-y-4 border border-hairline bg-surface p-6 lg:col-span-5"
              >
                <h2 className="font-display text-base font-semibold text-ink">
                  Add Project
                </h2>
                <Input
                  label="Title"
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  required
                />
                <Input
                  label="Slug"
                  placeholder="e.g. campus-map-v2"
                  value={projSlug}
                  onChange={(e) => setProjSlug(e.target.value)}
                  required
                />
                <Select
                  label="Track"
                  value={projTrack}
                  onChange={(e) => setProjTrack(e.target.value as ProjectTrack)}
                  options={[
                    { label: 'Engineering', value: 'Engineering' },
                    { label: 'Design', value: 'Design' },
                    { label: 'Media', value: 'Media' },
                    { label: 'Research', value: 'Research' },
                  ]}
                />
                <Input
                  label="Semester"
                  value={projSemester}
                  onChange={(e) => setProjSemester(e.target.value)}
                  required
                />
                <Textarea
                  label="Summary"
                  rows={3}
                  value={projSummary}
                  onChange={(e) => setProjSummary(e.target.value)}
                  required
                />
                <Button type="submit" size="sm">
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                  Publish Project
                </Button>
              </form>
            )}

            <div className={`divide-y divide-hairline border border-hairline bg-surface ${isAdmin ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
              {projects.data?.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{p.track}</Badge>
                      <span className="font-mono text-xs text-muted">{p.status}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-ink">{p.title}</p>
                  </div>
                  {isAdmin && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteProject(p.slug)}
                      aria-label={`Delete ${p.title}`}
                    >
                      <Trash2 className="h-4 w-4 text-signal" strokeWidth={1.5} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'events' && isOfficer && (
          <div className="mt-8 space-y-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <form
                onSubmit={handleCreateEvent}
                className="space-y-4 border border-hairline bg-surface p-6 lg:col-span-5"
              >
                <h2 className="font-display text-base font-semibold text-ink">
                  Create Event
                </h2>
                <Input
                  label="Title"
                  value={evtTitle}
                  onChange={(e) => setEvtTitle(e.target.value)}
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="Date"
                    type="date"
                    value={evtDate}
                    onChange={(e) => setEvtDate(e.target.value)}
                    required
                  />
                  <Input
                    label="Capacity"
                    type="number"
                    value={evtCapacity}
                    onChange={(e) => setEvtCapacity(e.target.value)}
                    required
                  />
                </div>
                <Input
                  label="Time"
                  value={evtTime}
                  onChange={(e) => setEvtTime(e.target.value)}
                  required
                />
                <Input
                  label="Venue"
                  value={evtVenue}
                  onChange={(e) => setEvtVenue(e.target.value)}
                  required
                />
                <Select
                  label="Track"
                  value={evtTrack}
                  onChange={(e) => setEvtTrack(e.target.value as EventTrack)}
                  options={[
                    { label: 'Software & Web', value: 'Software & Web' },
                    { label: 'Visual & Brand Design', value: 'Visual & Brand Design' },
                    { label: 'Media & Production', value: 'Media & Production' },
                    { label: 'Community & Events', value: 'Community & Events' },
                  ]}
                />
                <Textarea
                  label="Description"
                  rows={3}
                  value={evtDescription}
                  onChange={(e) => setEvtDescription(e.target.value)}
                  required
                />
                <Button type="submit" size="sm">
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                  Add Event
                </Button>
              </form>

              <div className="space-y-4 lg:col-span-7">
                <div className="divide-y divide-hairline border border-hairline bg-surface">
                  {events.data?.map((evt) => (
                    <div
                      key={evt.id}
                      className="flex flex-col justify-between gap-3 px-5 py-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <p className="font-mono text-xs text-muted">
                          {evt.date} · {evt.attendeeCount}/{evt.capacity} seats
                        </p>
                        <p className="mt-1 text-sm font-medium text-ink">{evt.title}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => handleViewRsvps(evt.id)}
                        >
                          RSVPs
                        </Button>
                        {isAdmin && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteEvent(evt.id)}
                          >
                            <Trash2 className="h-4 w-4 text-signal" strokeWidth={1.5} />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {rsvpEventId && (
                  <div className="border border-hairline bg-surface p-5">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-ink">
                      Recorded RSVPs ({rsvpList.length})
                    </h3>
                    {rsvpList.length === 0 ? (
                      <p className="mt-2 text-xs text-muted">
                        No new RSVPs recorded yet for this session.
                      </p>
                    ) : (
                      <ul className="mt-3 divide-y divide-hairline text-xs">
                        {rsvpList.map((r) => (
                          <li key={r.referenceId} className="flex justify-between py-2">
                            <span className="font-medium text-ink">{r.name}</span>
                            <span className="font-mono text-muted">
                              {r.email} · {r.referenceId}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === 'announcements' && isOfficer && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <form
              onSubmit={handleCreateAnnouncement}
              className="space-y-4 border border-hairline bg-surface p-6 lg:col-span-5"
            >
              <h2 className="font-display text-base font-semibold text-ink">
                Post Announcement
              </h2>
              <Input
                label="Title"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                required
              />
              <Select
                label="Category"
                value={annCategory}
                onChange={(e) =>
                  setAnnCategory(e.target.value as AnnouncementCategory)
                }
                options={[
                  { label: 'General', value: 'General' },
                  { label: 'Recruitment', value: 'Recruitment' },
                  { label: 'Workshop', value: 'Workshop' },
                  { label: 'Release', value: 'Release' },
                ]}
              />
              <Textarea
                label="Message"
                rows={4}
                value={annBody}
                onChange={(e) => setAnnBody(e.target.value)}
                required
              />
              <Button type="submit" size="sm">
                <Plus className="h-4 w-4" strokeWidth={1.5} />
                Publish Notice
              </Button>
            </form>

            <div className="divide-y divide-hairline border border-hairline bg-surface lg:col-span-7">
              {announcements.data?.map((a) => (
                <div
                  key={a.id}
                  className="flex items-start justify-between gap-4 px-5 py-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{a.category}</Badge>
                      <span className="font-mono text-xs text-muted">
                        {a.publishedAt}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-ink">{a.title}</p>
                    <p className="mt-1 text-xs text-muted">{a.body}</p>
                  </div>
                  {isAdmin && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAnnouncement(a.id)}
                    >
                      <Trash2 className="h-4 w-4 text-signal" strokeWidth={1.5} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'members' && isAdmin && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <form
              onSubmit={handleCreateMember}
              className="space-y-4 border border-hairline bg-surface p-6 lg:col-span-5"
            >
              <h2 className="font-display text-base font-semibold text-ink">
                Add Directory Member
              </h2>
              <Input
                label="Full Name"
                value={memName}
                onChange={(e) => setMemName(e.target.value)}
                required
              />
              <Input
                label="Role Title"
                placeholder="e.g. Frontend Developer"
                value={memRole}
                onChange={(e) => setMemRole(e.target.value)}
                required
              />
              <Select
                label="Committee"
                value={memCommittee}
                onChange={(e) =>
                  setMemCommittee(e.target.value as MemberCommittee)
                }
                options={[
                  { label: 'Executive', value: 'Executive' },
                  { label: 'Engineering', value: 'Engineering' },
                  { label: 'Design', value: 'Design' },
                  { label: 'Media', value: 'Media' },
                ]}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Program"
                  value={memProgram}
                  onChange={(e) => setMemProgram(e.target.value)}
                  required
                />
                <Input
                  label="Year Level"
                  value={memYear}
                  onChange={(e) => setMemYear(e.target.value)}
                  required
                />
              </div>
              <Textarea
                label="Short Bio"
                rows={3}
                value={memBio}
                onChange={(e) => setMemBio(e.target.value)}
                required
              />
              <Button type="submit" size="sm">
                <Plus className="h-4 w-4" strokeWidth={1.5} />
                Add Member
              </Button>
            </form>

            <div className="divide-y divide-hairline border border-hairline bg-surface lg:col-span-7">
              {members.data?.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between gap-4 px-5 py-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{m.committee}</Badge>
                      <span className="font-mono text-xs text-muted">{m.role}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-ink">{m.name}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteMember(m.id)}
                  >
                    <Trash2 className="h-4 w-4 text-signal" strokeWidth={1.5} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
