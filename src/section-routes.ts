import { ScrollTrigger } from 'gsap/ScrollTrigger';

const sections = [
  ['home', '#top'], ['about', '#about'], ['services', '#services'],
  ['work', '#work'], ['process', '#process'], ['testimonials', '.testimonials'],
  ['location', '.location'], ['contact', '#contact'],
] as const;
const isLanding = !document.body.classList.contains('legal-page');
let navigating = false;
let release: ReturnType<typeof setTimeout>;
function routeFor(href: string) {
  const url = new URL(href, location.href);
  if (url.origin !== location.origin) return;
  return sections.find(([name, selector]) => url.hash ? url.hash === selector : url.pathname.replace(/\/$/, '') === '/' + name);
}
export function navigateSection(href: string, push = true, instant = false) {
  const route = routeFor(href);
  if (!isLanding || !route) return false;
  const target = document.querySelector<HTMLElement>(route[1]);
  if (!target) return false;
  navigating = true;
  clearTimeout(release);
  const url = '/' + route[0];
  if (push && location.pathname + location.hash !== url) history.pushState(null, '', url);
  else if (!push) history.replaceState(null, '', url);
  const top = route[0] === 'home' ? 0 : Math.max(0, scrollY + target.getBoundingClientRect().top - 72);
  window.scrollTo({ top, behavior: instant || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  release = setTimeout(() => { navigating = false; }, instant ? 100 : 1400);
  return true;
}

if (isLanding) {
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
    if (link && !link.target && navigateSection(link.href)) event.preventDefault();
  });
  let pending = false;
  const update = () => {
    pending = false;
    if (navigating) return;
    let active = 'home';
    for (const [name, selector] of sections) {
      const element = document.querySelector(selector);
      if (element && element.getBoundingClientRect().top <= innerHeight * .35) active = name;
    }
    if (location.pathname !== '/' + active || location.hash) history.replaceState(null, '', '/' + active);
  };
  addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('popstate', () => navigateSection(location.pathname === '/' ? '/home' : location.href, false, true));
  const initial = location.hash || (location.pathname === '/' ? '/home' : location.href);
  navigating = true;
  const initialize = async () => {
    await document.fonts.ready;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (!navigateSection(initial, false, true)) navigating = false;
    }));
  };
  if (document.readyState === 'complete') void initialize();
  else addEventListener('load', initialize, { once: true });
}
