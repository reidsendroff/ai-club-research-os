const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'dailyplan', label: 'USAAIO Prep' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'pillars', label: 'Pillars' },
  { id: 'decision', label: 'Decision Filter' },
];

export default function NavBar({ activeSection, onNavigate }) {
  return (
    <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex gap-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`
                px-4 py-3 text-sm font-medium transition-colors relative
                ${activeSection === section.id
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-text-primary'
                }
              `}
            >
              {section.label}
              {activeSection === section.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
