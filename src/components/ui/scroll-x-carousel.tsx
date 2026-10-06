'use client';

// Adapted from the supplied ScrollXCarousel: measured horizontal travel replaces
// the demo's fixed percentage, and the existing Framer Motion package is reused.
import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { CarouselItem } from './3-d-coverflow-carousel';

export function ScrollXCarousel({ items }: { items: CarouselItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [current, setCurrent] = useState(0);
  const [native, setNative] = useState(false);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] });
  const transform = useTransform(scrollYProgress, value => `translate3d(${-value * travel}px,0,0)`);
  const progressTransform = useTransform(scrollYProgress, value => `scaleX(${value})`);

  useLayoutEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce), (max-height: 700px)');
    const update = () => setNative(media.matches);
    update(); media.addEventListener('change', update);
    const measure = () => setTravel(Math.max(0, track.current!.scrollWidth - viewport.current!.clientWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(viewport.current!); observer.observe(track.current!); measure();
    return () => { observer.disconnect(); media.removeEventListener('change', update); };
  }, []);
  useMotionValueEvent(scrollYProgress, 'change', value => {
    if (!native) setCurrent(Math.round(value * (items.length - 1)));
  });
  useLayoutEffect(() => {
    const count = document.getElementById('work-count');
    if (count) count.textContent = String(current + 1).padStart(2, '0');
  }, [current]);
  const select = (index: number, instant = false) => {
    const next = Math.max(0, Math.min(items.length - 1, index));
    const fraction = items.length > 1 ? next / (items.length - 1) : 0;
    if (native) viewport.current!.scrollTo({ left: travel * fraction, behavior: 'instant' });
    else window.scrollTo({ top: window.scrollY + root.current!.getBoundingClientRect().top + travel * fraction, behavior: instant ? 'instant' : 'smooth' });
    setCurrent(next);
  };

  return <div ref={root} className="scroll-x-carousel" data-native={native || undefined}
    style={{ '--work-travel': `${travel}px` } as CSSProperties} role="region" aria-label="Selected websites" aria-roledescription="carousel">
    <div className="scroll-x-container">
      <div className="scroll-x-top"><span className="mono">SELECTED WEBSITES</span><span className="scroll-x-hint">Scroll to explore <ArrowRight size={16}/></span></div>
      <div ref={viewport} className="scroll-x-viewport" onScroll={event => {
        if (native && travel) setCurrent(Math.round(event.currentTarget.scrollLeft / travel * (items.length - 1)));
      }}>
        <motion.div ref={track} className="scroll-x-track" style={{ transform: native ? 'none' : transform }}>
          {items.map((item, index) => <article className="scroll-x-card" key={item.url} aria-label={`${index + 1} of ${items.length}: ${item.title}`}
            onFocusCapture={() => { if (index !== current) select(index, true); }}>
            <a className="scroll-x-image" href={item.url} target="_blank" rel="noopener" aria-label={`Visit ${item.title} website`}>
              <img src={item.img} alt={item.alt} width="1265" height="712" draggable={false}/>
            </a>
            <div className="scroll-x-caption">
              <div><div className="scroll-x-meta mono">{item.tag} · {item.location}</div><h3>{item.title}</h3><p>{item.desc}</p></div>
              <a className="scroll-x-visit" href={item.url} target="_blank" rel="noopener" aria-label={`View ${item.title} website`}>View website <ArrowUpRight size={18}/></a>
            </div>
          </article>)}
        </motion.div>
      </div>
      <div className="scroll-x-bottom">
        <span className="mono">{String(current + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        <div className="scroll-x-progress" aria-hidden="true"><motion.div style={{ transform: native ? `scaleX(${items.length > 1 ? current / (items.length - 1) : 1})` : progressTransform }}/></div>
        <div className="scroll-x-controls"><button onClick={() => select(current - 1)} disabled={current === 0} aria-label="Previous website"><ArrowLeft size={20}/></button>
          {items.map((item, index) => <button className="scroll-x-dot" key={item.url} onClick={() => select(index)} aria-label={`Show project ${index + 1}: ${item.title}`} aria-current={current === index ? 'true' : undefined}><span/></button>)}
          <button onClick={() => select(current + 1)} disabled={current === items.length - 1} aria-label="Next website"><ArrowRight size={20}/></button></div>
      </div>
    </div>
  </div>;
}
