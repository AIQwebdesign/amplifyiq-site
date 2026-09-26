import { createRoot } from 'react-dom/client';
import { Testimonials } from './components/ui/unique-testimonial';

const section = document.querySelector<HTMLElement>('.testimonials');
const original = section?.querySelector<HTMLElement>('.quotes');
if (section && original) {
  const items = Array.from(original.querySelectorAll('figure')).map(figure => ({
    quote: figure.querySelector('blockquote')!.textContent!.trim(),
    author: figure.querySelector('figcaption b')!.textContent!.trim(),
    role: figure.querySelector('figcaption span')!.textContent!.trim(),
  }));
  const mount = document.createElement('div');
  mount.className = 'unique-testimonial-root';
  section.append(mount);
  createRoot(mount).render(<Testimonials items={items}/>);
  section.classList.add('has-unique-testimonials');
}
