import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { MemberCommittee } from '@ihub/shared';
import { PageHeader } from '../components/layout/PageHeader';
import { Section } from '../components/layout/Section';
import { MemberCard } from '../components/shared/MemberCard';
import { EmptyState } from '../components/ui/EmptyState';
import { SkeletonMemberCard } from '../components/ui/Skeleton';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFetch } from '../hooks/useFetch';
import { membersService } from '../services/members.service';

const COMMITTEES: Array<'All' | MemberCommittee> = [
  'All',
  'Executive',
  'Engineering',
  'Design',
  'Media',
];

const FAQS = [
  {
    question: 'Who can apply to join iHub Studio?',
    answer:
      'Any enrolled student from any department or year level. You do not need prior organization experience—we care most about curiosity and willingness to ship work with a small team.',
  },
  {
    question: 'What is the weekly time commitment?',
    answer:
      'Expect 3 to 5 hours per week: our Friday 3:00 PM open studio session in Innovation Hall 304, plus asynchronous project work with your squad.',
  },
  {
    question: 'How do students pitch a new project?',
    answer:
      'Any member can submit a one-page project brief at the start of the semester or during Pitch Night. Proposals are scoped for 6–10 weeks so teams can finish and document what they build.',
  },
];

export function AboutPage() {
  useDocumentTitle('About');

  const [committee, setCommittee] = useState<'All' | MemberCommittee>('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const members = useFetch(
    () =>
      membersService.list(
        committee === 'All' ? undefined : { committee }
      ),
    [committee]
  );

  return (
    <>
      <PageHeader
        eyebrow="About the Organization"
        title="A practical studio for student builders and storytellers."
        description="Founded to bridge engineering, design, and campus media, iHub Studio operates like a small independent workshop rather than a lecture club."
      />

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Operating Rhythm
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
              How weekly sessions work
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-8">
            <div className="border border-hairline bg-surface p-5">
              <span className="font-mono text-xs text-accent">15:00</span>
              <h3 className="mt-2 font-display text-base font-semibold text-ink">
                Standup &amp; Critiques
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Teams share 5-minute progress demos, blockers, and design drafts with the whole room.
              </p>
            </div>
            <div className="border border-hairline bg-surface p-5">
              <span className="font-mono text-xs text-accent">15:45</span>
              <h3 className="mt-2 font-display text-base font-semibold text-ink">
                Focused Build Block
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Squads pair on code, layouts, or video edits while track leads circulate to unblock work.
              </p>
            </div>
            <div className="border border-hairline bg-surface p-5">
              <span className="font-mono text-xs text-accent">17:30</span>
              <h3 className="mt-2 font-display text-base font-semibold text-ink">
                Documentation &amp; Notes
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Every session ends with updated changelogs and next-week milestones in our shared repo.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Directory
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
              Officers &amp; Members
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by committee">
            {COMMITTEES.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={committee === item}
                onClick={() => setCommittee(item)}
                className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                  committee === item
                    ? 'border-ink bg-ink text-paper'
                    : 'border-hairline bg-surface text-muted hover:border-ink hover:text-ink'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {members.loading && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <SkeletonMemberCard />
              <SkeletonMemberCard />
              <SkeletonMemberCard />
              <SkeletonMemberCard />
            </div>
          )}
          {members.error && (
            <p className="text-sm text-signal">{members.error}</p>
          )}
          {members.data && members.data.length === 0 && (
            <EmptyState
              title="No members in this committee"
              description="Try selecting another committee filter above."
            />
          )}
          {members.data && members.data.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {members.data.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section bordered={false}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              FAQ
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
              Common questions
            </h2>
          </div>

          <div className="border-t border-hairline lg:col-span-8">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.question} className="border-b border-hairline">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-semibold text-ink">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-sm leading-relaxed text-muted">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
