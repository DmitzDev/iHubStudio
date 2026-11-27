import { ArrowUpRight } from 'lucide-react';
import type { Member } from '@ihub/shared';
import { Badge } from '../ui/Badge';

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="flex flex-col justify-between border border-hairline bg-surface p-5">
      <div>
        <div className="flex items-center justify-between gap-2">
          <Badge variant={member.isOfficer ? 'accent' : 'outline'}>
            {member.committee}
          </Badge>
          <span className="font-mono text-[11px] text-muted">
            {member.yearLevel}
          </span>
        </div>

        <h3 className="mt-3 font-display text-base font-semibold text-ink">
          {member.name}
        </h3>
        <p className="text-xs font-medium text-accent">{member.role}</p>
        <p className="mt-1 font-mono text-[11px] text-muted">{member.program}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{member.bio}</p>
      </div>

      {(member.links?.github || member.links?.portfolio) && (
        <div className="mt-4 flex gap-4 border-t border-hairline pt-3">
          {member.links.github && (
            <a
              href={member.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-ink hover:text-accent"
            >
              GitHub
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            </a>
          )}
          {member.links.portfolio && (
            <a
              href={member.links.portfolio}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-ink hover:text-accent"
            >
              Portfolio
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
