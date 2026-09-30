'use client';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Review = { quote: string; author: string; role: string };
export function Testimonial({ items }: { items: Review[] }) {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0), mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const y = useSpring(mouseY, { damping: 25, stiffness: 200 });
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    if (root.current) observer.observe(root.current);
    const change = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', change);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', change); };
  }, []);
  useEffect(() => {
    if (manual || reduced || !visible || !pageVisible || items.length < 2) return;
    const timer = setInterval(() => setActive(i => (i + 1) % items.length), 3000);
    return () => clearInterval(timer);
  }, [manual, reduced, visible, pageVisible, items.length]);
  const current = items[active];
  const change = (step: number) => { setManual(true); setActive(i => (i + step + items.length) % items.length); };
  return <div ref={root} className="design-testimonial" data-playback={manual || reduced ? 'manual' : 'auto'}
    onPointerDown={() => setManual(true)} onFocusCapture={() => setManual(true)}
    onPointerMove={event => { if (reduced || event.pointerType !== 'mouse') return; const rect = event.currentTarget.getBoundingClientRect(); mouseX.set((event.clientX - rect.left - rect.width / 2) * .025); mouseY.set((event.clientY - rect.top - rect.height / 2) * .025); }}
    onPointerLeave={() => { mouseX.set(0); mouseY.set(0); }}>
    <motion.div className="design-review-number" style={{ x, y }} aria-hidden="true">
      <AnimatePresence mode="wait"><motion.span key={active} initial={{ opacity: 0, scale: reduced ? 1 : .9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .3 }}>{String(active + 1).padStart(2, '0')}</motion.span></AnimatePresence>
    </motion.div>
    <aside className="design-review-rail" aria-hidden="true"><span className="mono">CLIENT PERSPECTIVES</span><div><motion.i animate={{ scaleY: (active + 1) / items.length }} transition={{ duration: reduced ? 0 : .4 }} /></div></aside>
    <div className="design-review-content" aria-live={manual ? 'polite' : 'off'} aria-atomic="true">
      <AnimatePresence mode="wait"><motion.figure key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .16 }}>
        <div className="design-review-badge mono">{current.role.split(',').slice(1).join(',').trim()}</div>
        <blockquote aria-label={current.quote}>{current.quote.split(' ').map((word, i) => <motion.span aria-hidden="true" key={i} initial={{ opacity: 0, y: reduced ? 0 : 12, rotateX: reduced ? 0 : 35 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: reduced ? 0 : .35, delay: reduced ? 0 : Math.min(i * .012, .42) }}>{word}{' '}</motion.span>)}</blockquote>
        <figcaption><span className="design-author-line" aria-hidden="true"/><div><strong>{current.author}</strong><span>{current.role}</span></div></figcaption>
      </motion.figure></AnimatePresence>
      <div className="design-review-navigation"><span className="mono">{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span><div><button type="button" aria-label="Previous testimonial" onClick={() => change(-1)}><ArrowLeft size={19}/></button><button type="button" aria-label="Next testimonial" onClick={() => change(1)}><ArrowRight size={19}/></button></div></div>
    </div>
  </div>;
}
