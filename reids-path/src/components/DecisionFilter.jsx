import { useState } from 'react';

const SYSTEM_PROMPT = `You are Reid's Path strategic advisor. Reid Sendroff is a 16-year-old competitive programmer and ML researcher targeting a direct offer from a Tier-1 frontier AI lab (Anthropic, OpenAI, DeepMind, or xAI) by June 2028, upon high school graduation at age 18.

His strategy centers on four pillars:
1. USAAIO Camp / Gold Medal — the highest-leverage competition credential for this goal
2. Codeforces International Master — top 1-2% globally, unprecedented at 18 combined with USAAIO Camp
3. Published research with Professor Peter Henstock — clinical AI, GNNs, spatio-temporal clustering
4. Public visibility — GitHub, personal site, research artifacts, lab network

The window argument: entering the workforce in 2028 vs. 2032 is the decisive variable. Entry-level and mid-level technical roles are compressing rapidly. The people who will have irreplaceable context are those who got inside frontier labs during 2025-2029, not those who arrived with a degree in 2032.

When evaluating any activity, apply these filters:
- Does this compound toward one of the four pillars?
- Does this build rare, measurable skill?
- Does this increase Reid's visibility to people inside frontier labs?
- Is it better than the next-best use of the same time?
- Would a frontier lab technical evaluator — not a college admissions reader — find this impressive?

Respond with:
- A clear YES, NO, or CONDITIONAL
- 2-3 sentences of direct reasoning
- Which pillar(s) this does or doesn't compound toward
- If CONDITIONAL, state exactly what would make it worth doing

Be direct. Do not hedge. Do not optimize for college admissions optics. Optimize for the 2028 lab offer.`;

const QUICK_ASKS = [
  "Should I participate in a school hackathon this weekend?",
  "Should I take AP Computer Science A next year?",
  "Should I start a YouTube channel about competitive programming?",
  "Should I apply for a summer research internship at a local university?",
  "Should I learn Rust this semester?",
];

const verdictConfig = {
  YES: { color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' },
  NO: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' },
  CONDITIONAL: { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
};

function parseVerdict(text) {
  const upper = text.trim().toUpperCase();
  if (upper.startsWith('YES')) return 'YES';
  if (upper.startsWith('NO')) return 'NO';
  if (upper.startsWith('CONDITIONAL')) return 'CONDITIONAL';
  return null;
}

export default function DecisionFilter() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (questionText) => {
    const q = questionText || query;
    if (!q.trim()) return;

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey || apiKey === 'your_key_here') {
      setError('Set VITE_ANTHROPIC_API_KEY in your .env file to use the Decision Filter.');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 512,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content: `Should I do this? "${q}"`,
            },
          ],
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${res.status}`);
      }

      const result = await res.json();
      const text = result.content[0]?.text || 'No response received.';
      const verdict = parseVerdict(text);

      setResponse({ text, verdict, question: q });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verdict = response?.verdict;
  const vc = verdict ? verdictConfig[verdict] : null;

  return (
    <section>
      <h2 className="text-xs uppercase tracking-wider text-text-muted mb-4 font-bold">
        Decision Filter
      </h2>
      <div className="bg-bg-card border border-border rounded-lg p-5">
        <p className="text-sm text-text-secondary mb-4">
          Evaluate any activity against the four pillars and the 2028 lab offer target.
        </p>

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Should I do X?"
            className="flex-1 bg-bg text-text-primary text-sm px-3 py-2 rounded border border-border focus:border-accent focus:outline-none placeholder:text-text-muted"
            disabled={loading}
          />
          <button
            onClick={() => handleSubmit()}
            disabled={loading || !query.trim()}
            className="px-4 py-2 bg-accent text-white text-sm font-medium rounded hover:bg-accent-dim transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Evaluating...' : 'Evaluate'}
          </button>
        </div>

        {/* Quick asks */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {QUICK_ASKS.map((q, i) => (
            <button
              key={i}
              onClick={() => {
                setQuery(q);
                handleSubmit(q);
              }}
              disabled={loading}
              className="text-xs px-2.5 py-1 rounded bg-bg-hover text-text-muted hover:text-accent hover:bg-accent/10 transition-colors border border-transparent hover:border-accent/20 disabled:opacity-40"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 rounded bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-4 flex items-center gap-2 text-sm text-text-muted">
            <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            Evaluating against the four pillars...
          </div>
        )}

        {/* Response */}
        {response && !loading && (
          <div className={`mt-4 rounded border ${vc ? vc.border : 'border-border'}`}>
            {/* Verdict badge */}
            {vc && (
              <div className={`px-4 py-2 ${vc.bg} border-b ${vc.border} flex items-center gap-2`}>
                <span className={`font-mono font-bold text-sm ${vc.color}`}>
                  {verdict}
                </span>
                <span className="text-xs text-text-muted">
                  &mdash; &ldquo;{response.question}&rdquo;
                </span>
              </div>
            )}
            <div className="p-4 text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
              {response.text}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
