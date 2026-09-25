import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import type { Application } from '@splinetool/runtime';
import { SplineScene } from './components/ui/splite';

class SceneBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <span className="robot-loading">Imagination, without limits.</span> : this.props.children; }
}
function Robot() {
  const host = useRef<HTMLDivElement>(null);
  const app = useRef<Application | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    const resize = () => app.current?.setZoom(innerWidth < 650 ? .68 : 1);
    resize();
    let visible = true;
    const sync = () => { if (app.current) { if (document.hidden || !visible || reduce.matches) app.current.stop(); else app.current.play(); } };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    if (host.current) observer.observe(host.current);
    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener('change', sync);
    window.addEventListener('resize', resize);
    sync();
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); reduce.removeEventListener('change', sync); window.removeEventListener('resize', resize); };
  }, [ready]);
  return <div ref={host} className={`robot-scene ${ready ? 'is-ready' : ''}`} aria-label="Interactive 3D robot" role="img">
    {!ready && <span className="robot-loading">A little imagination is loading…</span>}
    <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" onLoad={instance => { app.current = instance; instance.setBackgroundColor('transparent'); setReady(true); }} />
    <span className="robot-hint mono">A LITTLE CURIOUS. JUST LIKE US.</span>
  </div>;
}
const container = document.getElementById('hero-robot');
if (container) createRoot(container).render(<SceneBoundary><Robot /></SceneBoundary>);
