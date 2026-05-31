import { useState, useEffect } from 'react';
import data from '../data/reid-data.json';

export default function Countdown() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const target = new Date(data.profile.targetDate);
  const start = new Date('2024-01-01');

  const totalMs = target.getTime() - start.getTime();
  const elapsedMs = now.getTime() - start.getTime();
  const remainingMs = target.getTime() - now.getTime();

  const daysRemaining = Math.max(0, Math.ceil(remainingMs / (1000 * 60 * 60 * 24)));
  const percentElapsed = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100));

  const months = Math.floor(daysRemaining / 30);
  const days = daysRemaining % 30;

  return (
    <div className="bg-bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-text-muted mb-2">
            Time Remaining
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-mono font-bold text-text-primary tabular-nums">
              {daysRemaining}
            </span>
            <span className="text-text-secondary text-sm">
              days
            </span>
            <span className="text-text-muted text-xs ml-2">
              ({months}mo {days}d)
            </span>
          </div>
          <div className="text-xs text-text-muted mt-1">
            until {data.profile.targetGoal} &middot; June 2028
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="text-xs text-text-muted">
            {percentElapsed.toFixed(1)}% of build window elapsed
          </div>
          <div className="w-48 h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${percentElapsed}%`,
                background: percentElapsed > 75
                  ? '#ef4444'
                  : percentElapsed > 50
                  ? '#f59e0b'
                  : '#6366f1',
              }}
            />
          </div>
          <div className="text-xs text-text-muted">
            Jan 2024 &rarr; Jun 2028
          </div>
        </div>
      </div>

      {data.currentFocus && data.currentFocus.length > 0 && (
        <div className="mt-5 pt-4 border-t border-border">
          <div className="text-xs uppercase tracking-wider text-text-muted mb-2">
            Current Focus
          </div>
          <ul className="space-y-1">
            {data.currentFocus.map((item, i) => (
              <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                <span className="text-accent mt-1 text-xs">&#9654;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
