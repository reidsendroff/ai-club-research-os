import data from '../data/reid-data.json';

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-text-secondary hover:text-accent transition-colors"
  >
    {children}
  </a>
);

export default function Header() {
  const { profile } = data;
  const { currentRatings, links } = profile;

  return (
    <header className="border-b border-border px-6 py-5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              {profile.name}
            </h1>
            <p className="text-text-secondary text-sm mt-1">
              {profile.grade} &middot; {profile.school} &middot; Class of {profile.graduationYear}
            </p>
            <p className="text-accent font-medium text-sm mt-2">
              Target: {profile.targetGoal} by June {profile.graduationYear}
            </p>
            <div className="flex gap-2 mt-1 flex-wrap">
              {profile.targetOrgs.map((org) => (
                <span
                  key={org}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-accent/10 text-accent"
                >
                  {org}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:items-end">
            <div className="flex gap-3">
              <div className="text-right">
                <div className="text-xs text-text-muted uppercase tracking-wider">Codeforces</div>
                <div className="font-mono text-sm">
                  <span className="text-accent font-bold">{currentRatings.codeforces.rating}</span>
                  <span className="text-text-secondary ml-1">{currentRatings.codeforces.level}</span>
                </div>
                <div className="text-xs text-text-muted">{currentRatings.codeforces.percentile}</div>
              </div>
              <div className="w-px bg-border" />
              <div className="text-right">
                <div className="text-xs text-text-muted uppercase tracking-wider">LeetCode</div>
                <div className="font-mono text-sm">
                  <span className="text-accent font-bold">{currentRatings.leetcode.rating}</span>
                  <span className="text-text-secondary ml-1">{currentRatings.leetcode.level}</span>
                </div>
                <div className="text-xs text-text-muted">{currentRatings.leetcode.percentile}</div>
              </div>
            </div>

            <div className="flex gap-3 text-xs mt-1">
              {links.github && <ExternalLink href={links.github}>GitHub</ExternalLink>}
              {links.linkedin && <ExternalLink href={links.linkedin}>LinkedIn</ExternalLink>}
              {links.codeforces && <ExternalLink href={links.codeforces}>Codeforces</ExternalLink>}
              {links.leetcode && <ExternalLink href={links.leetcode}>LeetCode</ExternalLink>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
