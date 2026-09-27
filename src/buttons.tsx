import { createRoot } from 'react-dom/client';
import { MotionButtonContent } from './components/ui/motion-button';

document.querySelectorAll<HTMLAnchorElement>('.header-cta,.hero-work-link,.hero-bottom>.button,.design-copy>.text-link,.location-bottom>.text-link,.footer-links>a,.footer-socials>a').forEach(link => {
  const label = link.textContent!.replace(/[↗↑→]/g, '').trim();
  link.classList.remove('liquid-glass', 'magnetic');
  link.classList.add('motion-button');
  createRoot(link).render(<MotionButtonContent label={label}/>);
});
