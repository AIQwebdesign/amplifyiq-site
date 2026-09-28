import { createRoot } from 'react-dom/client';
import GlyphPortal from './components/ui/glyph-portal';

const host = document.getElementById('process');
if (host) {
  const stages = [...host.querySelectorAll('.stages li')].map(item => ({
    label: item.querySelector('.mono')!.textContent!,
    title: item.querySelector('h3')!.textContent!,
    description: item.querySelector('p')!.textContent!,
  }));
  host.className = 'process-portal-host';
  createRoot(host).render(
    <GlyphPortal word="PROCESS" focusChar="R" interactive={false} scrollLength={1.7}
      fontFamily="Arial, sans-serif" fontWeight={900} className="process-portal"
      enterLabel="Explore the six stages"
      style={{ '--gp-paper': '#edf4f7', '--gp-ink': '#123348', '--gp-field': '#092638', '--gp-foreground': '#edf7fb' }}
      background={<div className="process-portal-scene"><img src="assets/hero-first-frame.webp" alt="" loading="lazy"/><div className="process-portal-grid"/></div>}
      front={<>
        <div className="process-portal-label mono"><span>04 / THE PROCESS</span><span>ONE CONNECTED JOURNEY</span></div>
        <h2 className="process-portal-eyebrow">From the first spark. To what’s next.</h2>
        <p className="process-portal-support">Clear thinking. Close collaboration.<br/>Every stage builds on the last.</p>
      </>}
    >
      <div className="process-journey">
        <div className="process-journey-heading"><span className="mono">SIX STAGES. ONE SHARED AMBITION.</span><h2>From possibility<br/>to something <em>real.</em></h2></div>
        <ol className="process-steps">{stages.map(stage => <li key={stage.title}>
          <span className="mono">{stage.label}</span><h3>{stage.title}</h3><p>{stage.description}</p>
        </li>)}</ol>
      </div>
    </GlyphPortal>
  );
}
