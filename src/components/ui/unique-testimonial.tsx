import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export type Testimonial = { quote: string; author: string; role: string };

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [manual, setManual] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const root = useRef<HTMLDivElement>(null);
  const manualRef = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (root.current) observer.observe(root.current);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  useEffect(() => {
    if (manual || reduced || !visible || !pageVisible || items.length < 2) return;
    const interval = setInterval(() => {
      if (manualRef.current) return;
      setLeaving(true);
      autoTimer.current = setTimeout(() => {
        if (!manualRef.current) setActive(index => (index + 1) % items.length);
        setLeaving(false);
      }, 180);
    }, 3000);
    return () => { clearInterval(interval); if (autoTimer.current) clearTimeout(autoTimer.current); setLeaving(false); };
  }, [manual, reduced, visible, pageVisible, items.length]);
  const stopAutoplay = () => {
    manualRef.current = true;
    if (autoTimer.current) clearTimeout(autoTimer.current);
    setManual(true);
    if (timer.current) clearTimeout(timer.current);
    setLeaving(false);
  };
  const select = (index: number) => {
    if (timer.current) clearTimeout(timer.current);
    if (index === active) { setLeaving(false); return; }
    if (reduced) { setActive(index); setLeaving(false); return; }
    setLeaving(true);
    timer.current = setTimeout(() => { setActive(index); setLeaving(false); }, 180);
  };
  return <div ref={root} className="unique-testimonial" data-playback={manual || reduced ? 'manual' : 'auto'} onPointerDown={stopAutoplay} onFocusCapture={stopAutoplay}>
    <div className={`unique-testimonial-copy${leaving ? ' is-leaving' : ''}`} aria-live={manual ? 'polite' : 'off'} aria-atomic="true">
      <span className="unique-quote-mark" aria-hidden="true">“</span>
      <figure>
        <blockquote>{items[active].quote}</blockquote>
        <figcaption><span className="unique-author">{items[active].author}</span><span className="unique-role">{items[active].role}</span></figcaption>
      </figure>
    </div>
    <div className="unique-author-selector" role="group" aria-label="Choose a customer testimonial">
      {items.map((item, index) => {
        const selected = index === active;
        return <button key={item.author} type="button" className={`unique-author-button${selected ? ' is-active' : ''}${selected || hovered === index ? ' is-expanded' : ''}`} aria-label={`Read ${item.author}'s testimonial`} aria-pressed={selected} onClick={() => { stopAutoplay(); select(index); }} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(index)} onBlur={() => setHovered(null)}>
          <span className="unique-avatar" aria-hidden="true">{item.author[0]}</span>
          <span className="unique-author-name" aria-hidden="true"><span>{item.author}</span></span>
        </button>;
      })}
    </div>
    <p className="unique-testimonial-count mono" aria-hidden="true">{String(active + 1).padStart(2, '0')} <span>/</span> {String(items.length).padStart(2, '0')}</p>
  </div>;
}
