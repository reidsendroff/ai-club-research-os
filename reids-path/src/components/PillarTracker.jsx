import { useState } from 'react';
import data from '../data/reid-data.json';

function MilestoneChecklist({ milestones }) {
  const today = new Date().toISOString().slice(0, 7);

  return (
    <ul className="mt-3 space-y-2">
      {milestones.map((m) => {
        const isUpcoming = m.upcoming || (!m.completed && m.date <= today);
        const isPast = m.date < today && !m.completed && !m.upcoming;

        return (
          <li key={m.id} className="flex items-start gap-2 text-sm">
            <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center text-xs
              ${m.completed
                ? 'bg-success/20 border-success text-success'
                : isUpcoming
                ? 'border-warning text-warning'
                : 'border-border text-text-muted'
              }`}
            >
              {m.completed ? '✓' : isUpcoming ? '▸' : ''}
            </span>
            <div className="flex-1">
              <span className={`${m.completed ? 'text-text-secondary line-through' : isUpcoming ? 'text-warning font-medium' : 'text-text-secondary'}`}>
                {m.label}
              </span>
              <span className="text-text-muted text-xs ml-2 font-mono">
                {m.date}
              </span>
              {isUpcoming && !m.completed && (
                <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-warning/10 text-warning font-medium">
                  NEXT
                </span>
              )}
              {isPast && (
                <span className="ml-2 text-xs px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 font-medium">
                  OVERDUE
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function PillarCard({ pillar }) {
  const [expanded, setExpanded] = useState(false);
  const completedCount = pillar.milestones.filter((m) => m.completed).length;
  const totalCount = pillar.milestones.length;

  const statusColors = {
    not_started: 'text-text-muted bg-text-muted/10',
    in_progress: 'text-accent bg-accent/10',
    complete: 'text-success bg-success/10',
  };

  const statusLabels = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    complete: 'Complete',
  };

  return (
    <div className="bg-bg-card border border-border rounded-lg p-5 hover:border-accent/30 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-text-primary">{pillar.name}</h3>
          <p className="text-xs text-text-secondary mt-1 leading-relaxed">
            {pillar.description}
          </p>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded flex-shrink-0 ${statusColors[pillar.status]}`}>
          {statusLabels[pillar.status]}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-text-muted">
            {completedCount}/{totalCount} milestones
          </span>
          <span className="font-mono text-accent">{pillar.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${pillar.progress}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 text-xs text-text-muted hover:text-accent transition-colors flex items-center gap-1"
      >
        <span className={`transform transition-transform ${expanded ? 'rotate-90' : ''}`}>
          &#9654;
        </span>
        {expanded ? 'Hide' : 'Show'} milestones
      </button>

      {expanded && <MilestoneChecklist milestones={pillar.milestones} />}
    </div>
  );
}

export default function PillarTracker() {
  return (
    <section>
      <h2 className="text-xs uppercase tracking-wider text-text-muted mb-4 font-bold">
        The Four Pillars
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.pillars.map((pillar) => (
          <PillarCard key={pillar.id} pillar={pillar} />
        ))}
      </div>
    </section>
  );
}
