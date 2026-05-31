import { useState, useMemo } from 'react';
import data from '../data/reid-data.json';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'academic', label: 'Academic' },
  { id: 'competition', label: 'Competition' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience' },
];

const signalConfig = {
  elite: { label: 'ELITE', className: 'bg-elite/15 text-elite border-elite/30' },
  strong: { label: 'STRONG', className: 'bg-strong/15 text-strong border-strong/30' },
  foundation: { label: 'FOUNDATION', className: 'bg-foundation/15 text-foundation border-foundation/30' },
};

const categoryColors = {
  academic: 'bg-blue-500',
  competition: 'bg-amber-500',
  projects: 'bg-emerald-500',
  research: 'bg-purple-500',
  experience: 'bg-cyan-500',
};

function TimelineEntry({ item, isLast }) {
  const [expanded, setExpanded] = useState(false);
  const signal = signalConfig[item.signal] || signalConfig.foundation;
  const isElite = item.signal === 'elite';

  const dateLabel = item.endDate
    ? `${item.date} — ${item.endDate}`
    : item.date;

  return (
    <div className="flex gap-4">
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
          isElite ? 'bg-elite ring-2 ring-elite/30' : categoryColors[item.category] || 'bg-text-muted'
        }`} />
        {!isLast && <div className="w-px flex-1 bg-border mt-1" />}
      </div>

      {/* Content */}
      <div className={`pb-6 flex-1 ${isLast ? '' : ''}`}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-left w-full group"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-xs font-mono text-text-muted mb-1">{dateLabel}</div>
              <h3 className={`text-sm font-medium group-hover:text-accent transition-colors ${
                isElite ? 'text-text-primary' : 'text-text-secondary'
              }`}>
                {item.title}
              </h3>
            </div>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border flex-shrink-0 ${signal.className}`}>
              {signal.label}
            </span>
          </div>
        </button>

        {expanded && (
          <div className="mt-2 text-sm text-text-secondary leading-relaxed">
            {item.description}
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-1 text-xs text-accent hover:underline"
              >
                {item.url}
              </a>
            )}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bg-hover text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Timeline() {
  const [filter, setFilter] = useState('all');

  const filteredItems = useMemo(() => {
    const items = filter === 'all'
      ? data.accomplishments
      : data.accomplishments.filter((a) => a.category === filter);

    // Sort by date descending (most recent first)
    return [...items].sort((a, b) => b.date.localeCompare(a.date));
  }, [filter]);

  const categoryCount = useMemo(() => {
    const counts = { all: data.accomplishments.length };
    for (const item of data.accomplishments) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <section>
      <h2 className="text-xs uppercase tracking-wider text-text-muted mb-4 font-bold">
        Accomplishments Timeline
      </h2>

      {/* Category filters */}
      <div className="flex flex-wrap gap-1 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors font-medium
              ${filter === cat.id
                ? 'bg-accent text-white'
                : 'bg-bg-card text-text-secondary hover:text-text-primary border border-border hover:border-accent/30'
              }`}
          >
            {cat.label}
            <span className="ml-1 opacity-60">{categoryCount[cat.id] || 0}</span>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="pl-1">
        {filteredItems.map((item, i) => (
          <TimelineEntry
            key={item.id}
            item={item}
            isLast={i === filteredItems.length - 1}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-8 text-text-muted text-sm">
          No accomplishments in this category yet.
        </div>
      )}
    </section>
  );
}
