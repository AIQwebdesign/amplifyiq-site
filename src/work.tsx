import { createRoot } from 'react-dom/client';
import type { CarouselItem } from './components/ui/3-d-coverflow-carousel';
import CustomerPaperCarousel from './components/ui/customer-paper-carousel';

const track=document.querySelector<HTMLElement>('.work-track');
if(track){
  const items:CarouselItem[]=[...track.querySelectorAll('.project')].map(card=>({
    title:card.querySelector('h3')!.textContent!,
    tag:card.querySelector('.project-meta span')!.textContent!,
    location:card.querySelector('.project-meta span:last-child')!.textContent!,
    desc:[...card.querySelector('.project-bottom p')!.childNodes].map(node=>node.nodeName==='BR'?' ':node.textContent).join('').replace(/\s+/g,' ').trim(),
    img:card.querySelector('img')!.getAttribute('src')!,
    alt:card.querySelector('img')!.alt,
    url:card.querySelector<HTMLAnchorElement>('.project-image')!.href
  }));
  track.className='paper-curl-root';
  createRoot(track).render(<CustomerPaperCarousel items={items}/>);
}
