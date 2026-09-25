import { Suspense, lazy } from 'react';
import type { Application } from '@splinetool/runtime';
const Spline = lazy(() => import('@splinetool/react-spline'));

// Supplied SplineScene component, with lifecycle hooks for this hero.
export function SplineScene({ scene, onLoad }: { scene: string; onLoad: (app: Application) => void }) {
  return <Suspense fallback={<span className="robot-loading">A little imagination is loading…</span>}>
    <Spline scene={scene} className="spline-scene" onLoad={onLoad} />
  </Suspense>;
}
