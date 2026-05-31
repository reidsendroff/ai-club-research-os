import { useState, useMemo } from 'react';
import plan from '../data/daily-plan.json';

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function getDayNumber(date) {
  const start = new Date(plan.competition.startDate);
  const current = new Date(date);
  return Math.floor((current - start) / (1000 * 60 * 60 * 24)) + 1;
}

function DayCard({ day, isToday, isPast }) {
  const [expanded, setExpanded] = useState(isToday);
  const [showResources, setShowResources] = useState(false);

  const typeColors = {
    weekend: 'text-accent bg-accent/10',
    school: 'text-text-secondary bg-text-muted/10',
    break: 'text-elite bg-elite/10',
  };

  const typeLabels = {
    weekend: 'Weekend',
    school: 'School Day',
    break: 'Spring Break',
  };

  return (
    <div
      className={`border rounded-lg p-4 transition-colors ${
        isToday
          ? 'border-accent bg-accent/5'
          : isPast
          ? 'border-border/50 opacity-60'
          : 'border-border hover:border-accent/30'
      }`}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {isToday && (
            <span className="flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded bg-accent text-white">
              TODAY
            </span>
          )}
          {isPast && !isToday && (
            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-success/20 border border-success flex items-center justify-center text-success text-xs">
              &#10003;
            </span>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold text-text-primary">
                {day.title}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-text-muted font-mono">
                {day.dayLabel}
              </span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${typeColors[day.type]}`}>
                {typeLabels[day.type]}
              </span>
              <span className="text-xs text-text-muted font-mono">
                {day.hours}
              </span>
            </div>
          </div>
        </div>
        <span
          className={`text-text-muted text-xs transition-transform flex-shrink-0 ml-2 ${
            expanded ? 'rotate-90' : ''
          }`}
        >
          &#9654;
        </span>
      </div>

      {expanded && (
        <div className="mt-3 border-t border-border pt-3">
          <ul className="space-y-2">
            {day.tasks.map((task, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-accent mt-1 text-xs flex-shrink-0">&#9654;</span>
                <span className="text-text-secondary">{task}</span>
              </li>
            ))}
          </ul>

          {day.resources && day.resources.length > 0 && (
            <div className="mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowResources(!showResources);
                }}
                className="text-xs text-strong hover:text-accent transition-colors flex items-center gap-1"
              >
                <span className={`transform transition-transform ${showResources ? 'rotate-90' : ''}`}>
                  &#9654;
                </span>
                Resources ({day.resources.length})
              </button>
              {showResources && (
                <ul className="mt-2 space-y-1.5 pl-3 border-l-2 border-strong/20">
                  {day.resources.map((r, i) => (
                    <li key={i} className="text-xs">
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-strong hover:text-accent transition-colors underline underline-offset-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {r.name}
                      </a>
                      {r.note && (
                        <span className="text-text-muted ml-1.5">
                          — {r.note}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PhaseSection({ phase, today }) {
  const phaseStart = phase.days[0].date;
  const phaseEnd = phase.days[phase.days.length - 1].date;
  const isCurrentPhase = today >= phaseStart && today <= phaseEnd;
  const isPastPhase = today > phaseEnd;
  const [expanded, setExpanded] = useState(isCurrentPhase);

  const completedDays = phase.days.filter((d) => d.date < today).length;
  const totalDays = phase.days.length;

  const pillarColors = {
    A: 'text-accent',
    B: 'text-elite',
    C: 'text-warning',
    D: 'text-success',
  };

  return (
    <div className="bg-bg-card border border-border rounded-lg overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-bg-hover transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`transform transition-transform text-text-muted text-xs ${
                expanded ? 'rotate-90' : ''
              }`}
            >
              &#9654;
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-text-primary">
                  Phase {phase.id}: {phase.name}
                </span>
                {isCurrentPhase && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-accent/10 text-accent">
                    ACTIVE
                  </span>
                )}
                {isPastPhase && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-success/10 text-success">
                    DONE
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-text-muted">{phase.dateRange}</span>
                <span className={`text-xs font-mono ${pillarColors[phase.pillar]}`}>
                  Pillar {phase.pillar}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-muted font-mono">
              {completedDays}/{totalDays} days
            </span>
            <div className="w-20 h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${(completedDays / totalDays) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-2">
          {phase.days.map((day) => (
            <DayCard
              key={day.date}
              day={day}
              isToday={day.date === today}
              isPast={day.date < today}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ChecklistSection({ title, items, accentColor }) {
  const [expanded, setExpanded] = useState(false);
  const completedCount = items.filter((i) => i.completed).length;

  return (
    <div className="bg-bg-card border border-border rounded-lg p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <span
            className={`transform transition-transform text-text-muted text-xs ${
              expanded ? 'rotate-90' : ''
            }`}
          >
            &#9654;
          </span>
          <span className="text-sm font-bold text-text-primary">{title}</span>
          <span className={`text-xs font-mono ${accentColor}`}>
            {completedCount}/{items.length}
          </span>
        </div>
        <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              accentColor === 'text-success' ? 'bg-success' : 'bg-warning'
            }`}
            style={{ width: `${items.length > 0 ? (completedCount / items.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      {expanded && (
        <ul className="mt-3 space-y-2 border-t border-border pt-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-2 text-sm">
              <span
                className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center text-xs ${
                  item.completed
                    ? 'bg-success/20 border-success text-success'
                    : 'border-border text-text-muted'
                }`}
              >
                {item.completed ? '✓' : ''}
              </span>
              <span
                className={
                  item.completed
                    ? 'text-text-secondary line-through'
                    : 'text-text-secondary'
                }
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function BlindSpotCard({ spot }) {
  const [expanded, setExpanded] = useState(false);
  const pillarColors = {
    B: { text: 'text-elite', border: 'border-elite/30', bg: 'bg-elite/10' },
    C: { text: 'text-warning', border: 'border-warning/30', bg: 'bg-warning/10' },
    D: { text: 'text-success', border: 'border-success/30', bg: 'bg-success/10' },
  };
  const colors = pillarColors[spot.pillar] || { text: 'text-accent', border: 'border-accent/30', bg: 'bg-accent/10' };

  return (
    <div className={`bg-bg-card border ${colors.border} rounded-lg p-4`}>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className={`text-xs font-mono font-bold ${colors.text} flex-shrink-0`}>
            Gap {spot.id}
          </span>
          <span className="text-sm font-bold text-text-primary truncate">
            {spot.title}
          </span>
          <span className={`text-xs px-1.5 py-0.5 rounded ${colors.bg} ${colors.text} flex-shrink-0`}>
            Pillar {spot.pillar}
          </span>
        </div>
        <span
          className={`text-text-muted text-xs transition-transform flex-shrink-0 ml-2 ${
            expanded ? 'rotate-90' : ''
          }`}
        >
          &#9654;
        </span>
      </div>

      {expanded && (
        <div className="mt-3 border-t border-border pt-3 space-y-3">
          <div className="bg-bg/50 rounded p-2.5 border border-border">
            <code className="text-xs font-mono text-accent leading-relaxed">
              {spot.formula}
            </code>
          </div>
          <ul className="space-y-1.5">
            {spot.keyPoints.map((point, i) => (
              <li key={i} className="text-xs text-text-secondary flex items-start gap-1.5">
                <span className={`mt-0.5 ${colors.text}`}>&#8226;</span>
                {point}
              </li>
            ))}
          </ul>
          <div className="text-xs text-text-muted">
            Added to: <span className="font-mono text-text-secondary">{spot.addedTo}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DailyPlan() {
  const today = getToday();

  const dayNumber = useMemo(() => {
    const n = getDayNumber(today);
    return Math.max(1, Math.min(n, plan.competition.totalDays));
  }, [today]);

  const todayPlan = useMemo(() => {
    for (const phase of plan.phases) {
      const day = phase.days.find((d) => d.date === today);
      if (day) return { phase, day };
    }
    return null;
  }, [today]);

  const daysUntilCompetition = useMemo(() => {
    const comp = new Date(plan.competition.date);
    const now = new Date(today);
    return Math.max(0, Math.ceil((comp - now) / (1000 * 60 * 60 * 24)));
  }, [today]);

  const percentComplete = Math.min(100, ((dayNumber - 1) / plan.competition.totalDays) * 100);

  return (
    <section className="space-y-6">
      <h2 className="text-xs uppercase tracking-wider text-text-muted mb-4 font-bold">
        USAAIO Round 2 Daily Plan
      </h2>

      {/* Countdown + Progress Header */}
      <div className="bg-bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-text-muted">
                Competition Countdown
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-warning/10 text-warning">
                {plan.competition.goal}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-mono font-bold text-text-primary tabular-nums">
                {daysUntilCompetition}
              </span>
              <span className="text-text-secondary text-sm">days until MIT</span>
            </div>
            <div className="text-xs text-text-muted mt-1">
              April 4-5, 2026 &middot; Day {dayNumber} of {plan.competition.totalDays}
            </div>
            <div className="text-xs text-text-muted mt-0.5">
              Round 1: {plan.competition.round1Score} ({plan.competition.round1Result})
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-xs text-text-muted">
              {percentComplete.toFixed(0)}% of prep complete
            </div>
            <div className="w-48 h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${percentComplete}%`,
                  background:
                    percentComplete > 75
                      ? '#22c55e'
                      : percentComplete > 50
                      ? '#f59e0b'
                      : '#6366f1',
                }}
              />
            </div>
            <div className="text-xs text-text-muted">
              ~{plan.competition.totalHours} total hours planned
            </div>
          </div>
        </div>
      </div>

      {/* Today's Focus - prominent */}
      {todayPlan && (
        <div className="bg-accent/5 border border-accent/30 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-accent text-white">
              TODAY
            </span>
            <span className="text-xs text-text-muted font-mono">
              {todayPlan.day.dayLabel} &middot; {todayPlan.day.hours}
            </span>
            <span className="text-xs text-accent font-mono">
              Phase {todayPlan.phase.id}: {todayPlan.phase.name}
            </span>
          </div>
          <h3 className="text-base font-bold text-text-primary mb-3">
            {todayPlan.day.title}
          </h3>
          <ul className="space-y-2">
            {todayPlan.day.tasks.map((task, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-accent mt-0.5 text-xs flex-shrink-0">&#9654;</span>
                <span className="text-text-secondary">{task}</span>
              </li>
            ))}
          </ul>

          {/* Today's Resources */}
          {todayPlan.day.resources && todayPlan.day.resources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-accent/20">
              <div className="text-xs uppercase tracking-wider text-text-muted mb-2">
                Resources for Today
              </div>
              <ul className="space-y-1.5">
                {todayPlan.day.resources.map((r, i) => (
                  <li key={i} className="text-xs">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-strong hover:text-accent transition-colors underline underline-offset-2"
                    >
                      {r.name}
                    </a>
                    {r.note && (
                      <span className="text-text-muted ml-1.5">
                        — {r.note}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-accent/20">
            <div className="text-xs uppercase tracking-wider text-text-muted mb-2">
              Daily Non-Negotiables
            </div>
            <div className="flex flex-wrap gap-2">
              {plan.dailyNonNegotiables.map((item, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded bg-bg-card border border-border text-text-secondary"
                >
                  <span className="font-mono text-accent">{item.duration}</span>
                  {' '}{item.task}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Syllabus Blind Spots */}
      {plan.syllabusBlindSpots && plan.syllabusBlindSpots.length > 0 && (
        <div>
          <h3 className="text-xs uppercase tracking-wider text-text-muted mb-3 font-bold">
            2026 Syllabus Blind Spots — Fix These First
          </h3>
          <div className="space-y-2">
            {plan.syllabusBlindSpots.map((spot) => (
              <BlindSpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        </div>
      )}

      {/* Score Pillars Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {plan.scorePillars.map((pillar) => {
          const pillarColors = {
            A: { text: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/30' },
            B: { text: 'text-elite', bg: 'bg-elite/10', border: 'border-elite/30' },
            C: { text: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
            D: { text: 'text-success', bg: 'bg-success/10', border: 'border-success/30' },
          };
          const colors = pillarColors[pillar.id];
          return (
            <div
              key={pillar.id}
              className={`bg-bg-card border ${colors.border} rounded-lg p-4`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-mono font-bold ${colors.text}`}>
                  {pillar.id}
                </span>
                <span className="text-sm font-bold text-text-primary">
                  {pillar.name}
                </span>
              </div>
              <ul className="space-y-1">
                {pillar.items.map((item, i) => (
                  <li key={i} className="text-xs text-text-secondary flex items-start gap-1.5">
                    <span className={`mt-0.5 ${colors.text}`}>&#8226;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Score Conversion Map */}
      {plan.scoreConversionMap && plan.scoreConversionMap.length > 0 && (
        <div className="bg-bg-card border border-border rounded-lg p-4">
          <h3 className="text-xs uppercase tracking-wider text-text-muted mb-3 font-bold">
            Score Conversion Map — Where the Points Are
          </h3>
          <div className="space-y-1.5">
            {plan.scoreConversionMap.map((item, i) => {
              const probColors = {
                'HIGH': { text: 'text-success', bg: 'bg-success/10', border: 'border-success/30' },
                'MEDIUM-HIGH': { text: 'text-strong', bg: 'bg-strong/10', border: 'border-strong/30' },
                'MEDIUM': { text: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
                'LOW': { text: 'text-text-muted', bg: 'bg-text-muted/10', border: 'border-border' },
                'DO NOT TOUCH': { text: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' },
              };
              const colors = probColors[item.probability] || probColors['MEDIUM'];
              return (
                <div key={i} className={`flex items-center gap-3 text-xs border ${colors.border} rounded p-2`}>
                  <span className={`font-mono font-bold px-2 py-0.5 rounded ${colors.bg} ${colors.text} flex-shrink-0 w-28 text-center`}>
                    {item.probability}
                  </span>
                  <span className="text-text-secondary">{item.topic}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Resource Time Cap + Red Flags */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Resource Time Cap */}
        {plan.resourceTimeCap && plan.resourceTimeCap.length > 0 && (
          <div className="bg-bg-card border border-accent/30 rounded-lg p-4">
            <h3 className="text-xs uppercase tracking-wider text-accent mb-3 font-bold">
              Resource Time Cap
            </h3>
            <ul className="space-y-2">
              {plan.resourceTimeCap.map((rule, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <span className="font-mono font-bold text-accent flex-shrink-0 w-16 text-right">
                    {rule.duration}
                  </span>
                  <span className="text-text-secondary">{rule.rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Red Flag List */}
        {plan.redFlagList && plan.redFlagList.length > 0 && (
          <div className="bg-bg-card border border-red-400/30 rounded-lg p-4">
            <h3 className="text-xs uppercase tracking-wider text-red-400 mb-3 font-bold">
              Red Flag List — Sunday Check
            </h3>
            <ul className="space-y-2">
              {plan.redFlagList.map((flag, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">&#9888;</span>
                  <span className="text-text-secondary">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Phase Schedule */}
      <div>
        <h3 className="text-xs uppercase tracking-wider text-text-muted mb-3 font-bold">
          Schedule by Phase
        </h3>
        <div className="space-y-3">
          {plan.phases.map((phase) => (
            <PhaseSection key={phase.id} phase={phase} today={today} />
          ))}
        </div>
      </div>

      {/* Competition Day — Expanded */}
      {plan.competitionDay && (
        <div className="bg-bg-card border border-warning/30 rounded-lg p-4 space-y-4">
          <h3 className="text-xs uppercase tracking-wider text-warning mb-1 font-bold">
            Competition Day — April 4
          </h3>

          {/* Night Before */}
          {plan.competitionDay.nightBefore && (
            <div>
              <h4 className="text-xs font-bold text-text-primary mb-2 flex items-center gap-2">
                <span className="text-elite">&#9789;</span> Night Before
              </h4>
              <ul className="space-y-1.5 pl-1">
                {plan.competitionDay.nightBefore.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-elite mt-0.5 flex-shrink-0">&#8226;</span>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Morning Warmup */}
          {plan.competitionDay.morningWarmup && (
            <div>
              <h4 className="text-xs font-bold text-text-primary mb-2 flex items-center gap-2">
                <span className="text-warning">&#9728;</span> Morning Warmup
              </h4>
              <p className="text-xs text-text-secondary pl-1">{plan.competitionDay.morningWarmup}</p>
            </div>
          )}

          {/* Tactical Time Split */}
          {plan.competitionDay.tacticalTimeSplit && (
            <div>
              <h4 className="text-xs font-bold text-text-primary mb-2 flex items-center gap-2">
                <span className="text-accent">&#9201;</span> Tactical Time Split
              </h4>
              <div className="space-y-1.5">
                {plan.competitionDay.tacticalTimeSplit.map((row, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs border border-border rounded p-2">
                    <span className="font-mono font-bold text-accent flex-shrink-0 w-16">
                      {row.phase}
                    </span>
                    <span className="text-text-secondary">{row.instruction}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Motto */}
          {plan.competitionDay.motto && (
            <div className="border-t border-warning/20 pt-3 mt-3">
              <p className="text-xs text-warning italic text-center font-mono">
                &ldquo;{plan.competitionDay.motto}&rdquo;
              </p>
            </div>
          )}
        </div>
      )}

      {/* Competition Checklist */}
      <div>
        <h3 className="text-xs uppercase tracking-wider text-text-muted mb-3 font-bold">
          Competition-Week Checklist
        </h3>
        <div className="space-y-3">
          <ChecklistSection
            title="Must-Have"
            items={plan.checklist.mustHave}
            accentColor="text-success"
          />
          <ChecklistSection
            title="Nice-to-Have"
            items={plan.checklist.niceToHave}
            accentColor="text-warning"
          />
        </div>
      </div>

      {/* Mistake Taxonomy */}
      <div className="bg-bg-card border border-border rounded-lg p-4">
        <h3 className="text-xs uppercase tracking-wider text-text-muted mb-3 font-bold">
          Mistake Taxonomy
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {plan.mistakeTaxonomy.map((m, i) => (
            <div key={i} className="flex items-start gap-2 text-xs border border-border rounded p-2.5">
              <span className="font-bold text-text-primary flex-shrink-0 w-20">
                {m.category}
              </span>
              <div className="flex-1">
                <div className="text-text-secondary">{m.meaning}</div>
                {m.fix && (
                  <div className="text-accent mt-0.5 font-mono text-[10px]">{m.fix}</div>
                )}
                {m.exampleFix && (
                  <div className="text-elite mt-0.5 text-[10px] italic">
                    e.g. {m.exampleFix}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-text-muted mt-3 italic">
          The goal is not &quot;study more.&quot; The goal is to make the mistake log shrink.
        </p>
      </div>

      {/* Low-ROI Extras */}
      {plan.lowROIExtras && plan.lowROIExtras.length > 0 && (
        <div className="bg-bg-card border border-border rounded-lg p-4">
          <h3 className="text-xs uppercase tracking-wider text-text-muted mb-3 font-bold">
            Low-ROI Extras — Gated Resources
          </h3>
          <div className="space-y-1.5">
            {plan.lowROIExtras.map((item, i) => {
              const statusColors = {
                'Low probability bonus': 'text-text-muted',
                'Near-zero point probability': 'text-red-400',
                'Only if diffusion goes beyond DDPM': 'text-warning',
                'Bonus knowledge': 'text-text-muted',
                'Nice-to-have only': 'text-text-muted',
                'Do not touch': 'text-red-400',
                'Only if UNet skeleton is solid': 'text-warning',
                '10-min max': 'text-warning',
              };
              const statusColor = statusColors[item.status] || 'text-text-muted';
              return (
                <div key={i} className="flex items-start gap-3 text-xs border border-border rounded p-2">
                  <div className="flex-shrink-0 w-36">
                    <div className="font-mono font-bold text-text-primary text-[11px]">{item.resource}</div>
                    <div className={`text-[10px] ${statusColor}`}>{item.status}</div>
                  </div>
                  <span className="text-text-secondary">{item.guidance}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Priority Order */}
      <div className="bg-bg-card border border-border rounded-lg p-4">
        <h3 className="text-xs uppercase tracking-wider text-text-muted mb-3 font-bold">
          If Time Gets Squeezed — Protect in This Order
        </h3>
        <ol className="space-y-1.5">
          {plan.priorityOrder.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-accent font-mono text-xs mt-0.5 flex-shrink-0 w-4 text-right">
                {i + 1}.
              </span>
              <span className="text-text-secondary">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
