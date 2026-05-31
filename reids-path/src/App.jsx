import { useState, useRef } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Countdown from './components/Countdown';
import DailyPlan from './components/DailyPlan';
import PillarTracker from './components/PillarTracker';
import Timeline from './components/Timeline';
import DecisionFilter from './components/DecisionFilter';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const overviewRef = useRef(null);
  const dailyplanRef = useRef(null);
  const timelineRef = useRef(null);
  const pillarsRef = useRef(null);
  const decisionRef = useRef(null);

  const sectionRefs = {
    overview: overviewRef,
    dailyplan: dailyplanRef,
    timeline: timelineRef,
    pillars: pillarsRef,
    decision: decisionRef,
  };

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    sectionRefs[sectionId]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <NavBar activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-12">
        {/* Overview */}
        <div ref={overviewRef} className="scroll-mt-16">
          <Countdown />
        </div>

        {/* USAAIO Daily Plan */}
        <div ref={dailyplanRef} className="scroll-mt-16">
          <DailyPlan />
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} className="scroll-mt-16">
          <PillarTracker />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="scroll-mt-16">
          <Timeline />
        </div>

        {/* Decision Filter */}
        <div ref={decisionRef} className="scroll-mt-16">
          <DecisionFilter />
        </div>
      </main>

      <footer className="border-t border-border py-6 mt-12">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-text-muted">
          <span>Reid's Path &middot; Strategic Execution Dashboard</span>
          <span>Data: reid-data.json &middot; Updated March 2026</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
