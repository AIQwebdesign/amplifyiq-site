import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

type Item = { label: string; href: string; icon: ReactNode };
const pointOnCircle = (i: number, n: number, r: number) => {
  const theta = 2 * Math.PI * i / n - Math.PI / 2;
  return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
};

export function CircleMenu({ items }: { items: Item[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const reduced = useReducedMotion();

  const finish = (href?: string) => {
    dialog.current?.close();
    document.body.classList.remove('circle-navigation-open');
    setOpen(false);
    setClosing(false);
    trigger.current?.focus({ preventScroll: true });
    if (href) {
      const target = document.querySelector<HTMLElement>(href);
      history.pushState(null, '', href);
      target?.setAttribute('tabindex', '-1');
      target?.focus({ preventScroll: true });
      target?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' });
    }
  };
  const close = (href?: string) => {
    if (closing) return;
    setClosing(true);
    setOpen(false);
    timer.current = setTimeout(() => finish(href), reduced ? 0 : 360);
  };
  useEffect(() => {
    document.documentElement.classList.add('circle-navigation-ready');
    const media = matchMedia('(max-width: 650px)');
    const resize = () => { if (!media.matches) { if (timer.current) clearTimeout(timer.current); finish(); } };
    media.addEventListener('change', resize);
    return () => {
      if (timer.current) clearTimeout(timer.current);
      media.removeEventListener('change', resize);
      document.documentElement.classList.remove('circle-navigation-ready');
      document.body.classList.remove('circle-navigation-open');
    };
  }, []);

  return <>
    <button ref={trigger} className="circle-menu-toggle" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={open} aria-controls="circle-navigation" onClick={() => {
      dialog.current?.showModal();
      document.body.classList.add('circle-navigation-open');
      setClosing(false);
      setOpen(true);
    }}><span>Menu</span><Menu size={19}/></button>
    {createPortal(<dialog ref={dialog} id="circle-navigation" className="circle-navigation" aria-labelledby="circle-navigation-title" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="circle-navigation-heading"><span className="mono">AMPLIFYIQ / EXPLORE</span><h2 id="circle-navigation-title">Where to next?</h2></div>
      <div className="circle-navigation-stage">
        <div className="circle-orbit" aria-hidden="true"/>
        <motion.nav aria-label="Mobile navigation" className="circle-navigation-items" animate={{ rotate: closing && !reduced ? -180 : 0 }} transition={{ duration: reduced ? 0 : .36 }}>
          {items.map((item, index) => {
            const { x, y } = pointOnCircle(index, items.length, 108);
            return <motion.a key={item.href} href={item.href} className="circle-navigation-item" tabIndex={open ? 0 : -1} aria-hidden={!open} initial={false} animate={{ x: open ? x : 0, y: open ? y : 0, opacity: open ? 1 : 0, scale: open ? 1 : .5 }} transition={reduced ? { duration: 0 } : { delay: open ? index * .035 : index * .025, type: 'spring', stiffness: 300, damping: 26 }} onClick={event => { event.preventDefault(); close(item.href); }}>
              {item.icon}<span>{item.label}</span>
            </motion.a>;
          })}
        </motion.nav>
        <motion.button autoFocus className="circle-navigation-close" aria-label="Close navigation" onClick={() => close()} animate={{ scale: closing && !reduced ? [1, 1.18, 1] : 1, rotate: open ? 0 : 90 }} transition={{ duration: reduced ? 0 : .35 }}><X size={23}/></motion.button>
      </div>
      <p className="circle-navigation-note mono">BUILD. SCALE. AMPLIFY.</p>
    </dialog>, document.body)}
  </>;
}
